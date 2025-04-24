# Progress Bar
[https://progress-bars-demo.netlify.app](https://progress-bars-demo.netlify.app)
# Problem Statement: 

Design and implement a **Progress Bar Component** that visually represents the completion percentage of a given task. The component must fulfill the following criteria:

1. The progress bar should **display the percentage value** (e.g., "45%") **inside or beside the bar**.
2. On component load or when the value changes, the **progress fill must animate smoothly** from 0% (or previous value) to the target percentage.
3. The progress percentage must be **accurate and clearly visible** to the user.
4. The component should be reusable, responsive, and accept percentage input as a prop.

---

## Suggestions to Enhance:

1. **Color Variants Based on Percentage**  
   Example:  
   - 0–30%: Red  
   - 31–70%: Orange  
   - 71–100%: Green  

2. **Accessibility Considerations**  
   - Use ARIA roles (`role="progressbar"`) and `aria-valuenow` attributes for screen readers.
   - Provide text labels if the progress is meaningful to non-visual users.
