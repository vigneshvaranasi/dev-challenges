# Tab Form

## Problem Statement

You are tasked with building a dynamic, multi-tab form using **React.js** to simulate a real-world data entry application.

The application should include:

- **Three Tabs:**  
   - `Profile`  
   - `Interests`  
   - `Settings`

Each tab will contain specific form fields, and the following criteria must be met:

---

### Profile Tab:
- **Name Field:** Text input, required.
- **Age Field:** Numeric input, only numbers allowed.
- **Email Field:** Text input with email format validation.

---

### Interests Tab:
- Multiple checkboxes (e.g., Coding, Cooking, Cricket).
- At least one interest must be selected.

---

### Settings Tab:
- Radio buttons for notification preferences (e.g., Email, SMS, Push).
- Dropdown to select a theme (Light / Dark / System Default).
- Terms & Conditions checkbox (must be checked before submission).

Anything like this can Be done

---

## Functional Requirements:

1. **Validation Rules:**  
   - Required fields must be filled.
   - Age must be a numeric value.

2. **Data Persistence:**  
   Switching between tabs should **retain previously entered values**. No data loss should occur.

3. **Submit Behavior:**  
   The "Submit" button should only be available and functional on the **Settings** tab.  
   On submit, log the entire form data to the console.

---

## Discussion Points:

During or after implementation, be prepared to discuss:

- **Scalability:**  
  Suggest how the form structure could evolve if the number of fields or tabs grows. Could a `configuration object` help avoid repetitive code?

- **Maintainability:**  
  Talk about your strategies for writing modular, reusable, and readable code. Why are these important in team-based or large-scale projects?

---

## Technical Constraints:

- Use **React.js functional components**.
- State management using `useState`.
- No external form libraries (e.g., Formik, React Hook Form) unless specifically allowed.