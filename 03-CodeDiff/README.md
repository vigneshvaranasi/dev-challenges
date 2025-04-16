# CodeDiff
[https://codediffy.netlify.app](https://codediffy.netlify.app)



## Problem Statement

In software development, comparing two versions of code is a frequent but often cumbersome task. Developers, students, and reviewers frequently face situations where identifying the changes between two code snippets becomes essential  whether for debugging, peer review, or learning from differences. While professional tools like Git or IDE-integrated diff viewers exist, they are often overkill for quick or casual comparisons, and not always beginner-friendly.

Solve this problem by providing a simple, lightweight, and interactive web based tool to visually compare two blocks of code. The application highlights added, removed, and modified lines, making it easy to spot differences at a glance. Should also automatically preserve the last compared code even after a page refresh or accidental tab closure.

## Usage Guide

1. **Paste Your Code**  
   - On the **Left Editor**, paste your original or first version of the code.  
   - On the **Right Editor**, paste your updated or second version of the code.

2. **Instant Comparison**  
    | Color          | Meaning                          |
    |----------------|----------------------------------|
    | Green          | Added lines                      |
    | Red            | Removed lines                    |
    | Yellow         | Modified lines                   |
    | Dark Gray      | Unchanged lines                  |
    | Light Gray     | Line numbers (click to copy)     |

   
3. **Refresh-Proof Comparison**  
   Accidentally closed the tab or refreshed the page?  
   No worries — CodeDiff preserves your last compared code automatically using local storage. When you return, your previous input will be restored!
