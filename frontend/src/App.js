import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css'; 

function App() {
  const { quill, quillRef, toolbar } = useQuill({
    modules: {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: [] }],
      
          [{ list: 'ordered'}, { list: 'bullet' }],
          [{ indent: '-1'}, { indent: '+1' }],
      
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['link', 'image', 'video'],
          [{ color: [] }, { background: [] }],
      
          ['clean'],
          ['customInput'],  // Add custom button to the toolbar
        ],
        handlers: {
          'customInput': () => handleCustomButtonClick() // Custom handler for button
        }
      }
    }
  });

  const [showInput, setShowInput] = useState(false);  
  const [inputValue, setInputValue] = useState('');  

  
  const handleCustomButtonClick = () => {
    setShowInput(true); 
  };

  // Function to handle input field change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


 useEffect(() => {
  if (quill) {
   
    quill.on('text-change', () => {
      const content = quill.getContents(); 
     console.log(content)           
    });
  }
}, [quill]);

// Custom button renderer
useEffect(() => {
  if (quill) {
    const toolbar = quill.getModule('toolbar');
    
    // Create a custom button with an icon or text
    const customButton = document.createElement('button');
    customButton.innerHTML = 'Math';  // You can use an icon here if preferred
    customButton.classList.add('ql-customInput');  // Assign a class for styling

    // Append the button to the toolbar
    toolbar.container.querySelector('.ql-align').parentNode.appendChild(customButton);
    
    // Attach the handler to the custom button
    customButton.addEventListener('click', handleCustomButtonClick);
  }
}, [quill]);


// useEffect(() => {
//   if (quill ) {
//     quill.setContents(savedContent); // Set the fetched content to the editor
//   }
// }, [quill, savedContent]);

// Function to handle input submit (for example)
const handleInputSubmit = () => {
 
  setShowInput(false);  // Hide input field after submission
  setInputValue('');    // Clear input field
};

console.log(showInput)
return (
  <div className="App">
    <div style={{ width: "100%", height: "50vh" }}>
      <div ref={quillRef} />  
    </div>

    {showInput && (
        <div style={{position:"absolute"}}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter custom text"
            
          />
          <button onClick={handleInputSubmit}>Insert</button>
        </div>
      )}
  </div>
);
}

export default App;
