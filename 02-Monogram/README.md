# Monogram

## Problem Statement
In modern web and mobile applications, visually representing a user's identity greatly enhances the overall user experience  especially in cases where users have not uploaded a profile image. To address this, the goal is to implement a dynamic **Avatar Generator** that allows users to create and manage text-based avatars with ease.

The feature works as follows:

1. The user enters their **name** into an input field and clicks the **"Add"** button.
2. Upon clicking "Add," an **avatar** is generated, displaying the **initials** of the entered name inside a **circular shape with a randomly assigned background color**.
3. Each new avatar will be displayed **side by side in a horizontal list**, allowing users to add multiple avatars in sequence.
4. Every avatar will feature a small **"X" button** positioned at its corner.
5. Clicking the **"X" button** will remove that specific avatar from the list, and the UI will update dynamically to reflect the change.

### **Initials Extraction Logic:**

- If the entered name has **one word** → take the **first two letters**.
    
    Example: `Vignesh` → `VI`
    
- If the entered name has **two or more words** → take the **first letter of the first two words**.
    
    Example:
    
    **`Vignesh Varanasi`→ `VV`**
    
    **`Vijaya Sai Vignesh`** → `VS`
    

The initials will always be in **uppercase** for uniformity.

## Usage Guide

1. **Enter a Name**
    - Type a name into the input field.
    - Click the **Add** button or press **Enter** on your keyboard to create an avatar.
2. **View Avatars**
    - Each submitted name will generate an avatar displayed as a circle with text inside.
    - The avatars will automatically appear side by side as you add more names.
3. **Remove an Avatar**
    - Each avatar has an **X** button for deletion.
    - On mobile devices, the **X** button is always visible.
    - On larger screens, the **X** button will appear when you hover over the avatar.
    - Click the **X** to remove the avatar from the list.
4. **Repeat**
    - You can add as many avatars as you like by repeating the same steps.