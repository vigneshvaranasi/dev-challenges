import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
import { configDotenv } from 'dotenv'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import AdmZip from 'adm-zip'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const fileName = `${file.originalname}`
    cb(null, fileName)
  }
})

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())
configDotenv()
let PORT = process.env.PORT || 5000

const connection = mysql.createConnection({
  host: process.env.HOST || 'localhost',
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: 'zipSync',
  multipleStatements: true
})

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL Server:', err)
    return
  }
  console.log('Connected to MySQL Server!')

  const dbinit = `
    CREATE DATABASE IF NOT EXISTS zipSync;

    USE zipSync;

    CREATE TABLE IF NOT EXISTS data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        mobile VARCHAR(10) NOT NULL UNIQUE,
        profilepic VARCHAR(100) default NULL
    );
  `
  connection.query(dbinit, err => {
    if (err) {
      console.error('Error Initializing Database & Table:', err)
      return
    }
    console.log('Database and Table are Ready')
    app.listen(PORT, () => {
      console.log(`Server Running on http://localhost:${PORT}`)
    })
  })
})

app.get('/', (req, res) => {
  res.send('Welcome to ZipSync Backend')
})

app.get('/data', (req, res) => {
  const sqlQuery = `SELECT * FROM data`
  connection.query(sqlQuery, (err, result) => {
    if (err) {
      res.send({
        error: true,
        message: err.message
      })
      return
    }
    res.send({ error: false, data: result })
  })
})

app.post('/newData', async (req, res) => {
  const { name, mobile } = req.body
  const sqlQuery = `INSERT INTO data (name, mobile) VALUES (?, ?)`
  connection.query(sqlQuery, [name, mobile], (err, result) => {
    if (err) {
      res.send({
        error: true,
        message: err.message
      })
      return
    }
    res.send({ error: false, message: 'Data Inserted Successfully' })
  })
})

app.delete('/deleteData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getPicQuery = `SELECT profilepic FROM data WHERE id = ?`;
    const [rows] = await connection.promise().query(getPicQuery, [id]);
    
    if (rows.length === 0) {
      return res.status(404).send({
        error: true,
        message: 'Record not found'
      });
    }

    const profilePic = rows[0].profilepic;
    const deleteQuery = `DELETE FROM data WHERE id = ?`;
    await connection.promise().query(deleteQuery, [id]);
    
    if (profilePic) {
      const profilePicPath = path.join(__dirname, 'uploads', profilePic);
      
      try {
        if (fs.existsSync(profilePicPath)) {
          fs.unlinkSync(profilePicPath);
          console.log(`Deleted profile picture: ${profilePicPath}`);
        }
      } catch (fileError) {
        console.error(`Error deleting profile picture: ${fileError.message}`);
      }
    }

    res.send({ 
      error: false, 
      message: 'Data and associated profile picture (if any) deleted successfully'
    });
    
  } catch (error) {
    console.error('Error in delete operation:', error);
    res.status(500).send({
      error: true,
      message: 'Failed to delete data',
      details: error.message
    });
  }
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
const upload = multer({ storage })

app.post('/upload', upload.single('zipfile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ error: true, message: 'No file uploaded' })
    }

    console.log('Received zip file:', req.file.originalname)
    const zipPath = req.file.path
    const extractPath = path.join(__dirname, 'uploads', 'extracted')
    
    if (!fs.existsSync(extractPath)) {
      fs.mkdirSync(extractPath, { recursive: true })
    }

    console.log('Extracting zip to:', extractPath)
    const zip = new AdmZip(zipPath)
    zip.extractAllTo(extractPath, true)
    
    const getAllFiles = (dir, fileList = []) => {
      const files = fs.readdirSync(dir)
      files.forEach(file => {
        const filePath = path.join(dir, file)
        if (fs.statSync(filePath).isDirectory()) {
          getAllFiles(filePath, fileList)
        } else {
          fileList.push(filePath)
        }
      })
      return fileList
    }

    const allFiles = getAllFiles(extractPath)
    console.log('Found files:', allFiles.map(f => path.relative(extractPath, f)))
    
    const updates = []
    const allowedExtensions = ['.jpg', '.jpeg', '.png']
    
    for (const filePath of allFiles) {
      const relativePath = path.relative(extractPath, filePath)
      const fileName = path.basename(filePath)
      const fileExt = path.extname(fileName).toLowerCase()
      
      if (!allowedExtensions.includes(fileExt)) {
        console.log(`Skipping non-image file: ${relativePath}`)
        continue
      }

      const userMobile = path.parse(fileName).name
      console.log(`Processing file: ${fileName}, mobile: ${userMobile}`)
      
      if (!/^\d{10}$/.test(userMobile)) {
        console.warn(`Invalid mobile format in filename: ${fileName}`)
        continue
      }

      const userExists = await new Promise((resolve) => {
        connection.query(
          'SELECT id FROM data WHERE mobile = ?', 
          [userMobile],
          (err, results) => resolve(!err && results.length > 0)
        )
      })

      if (!userExists) {
        console.warn(`User ${userMobile} not found`)
        continue
      }
      const finalDir = path.join(__dirname, 'uploads', 'profiles')
      if (!fs.existsSync(finalDir)) {
        fs.mkdirSync(finalDir, { recursive: true })
      }
      
      const finalPath = path.join('profiles', fileName)
      fs.renameSync(filePath, path.join(finalDir, fileName))

      updates.push(
        new Promise((resolve, reject) => {
          connection.query(
            'UPDATE data SET profilepic = ? WHERE mobile = ?',
            [finalPath, userMobile],
            (err) => err ? reject(err) : resolve()
          )
        })
      )
    }

    await Promise.all(updates)
    
    fs.rmSync(extractPath, { recursive: true, force: true })
    fs.unlinkSync(zipPath)
    
    console.log(`Processed ${updates.length} profile pictures`)
    res.send({ 
      error: false, 
      message: 'Zip processed successfully',
      updatedCount: updates.length,
      updatedMobiles: updates.map(u => u.mobile)
    })
  } catch (error) {
    console.error('Zip processing failed:', error)
    res.status(500).send({ 
      error: true, 
      message: 'Failed to process zip',
      details: error.message
    })
  }
})

