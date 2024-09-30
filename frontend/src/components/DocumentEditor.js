import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";

function DocumentEditor() {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputPosition, setInputPosition] = useState({ top: 0, left: 0 });

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          [{ align: [] }],

          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
        ],
        handlers: {
          customInput: () => handleCustomButtonClick(),
        },
      },
    },
  });

  const handleCustomButtonClick = () => {
    if (quill) {
      const range = quill.getSelection();
      if (range) {
        const bounds = quill.getBounds(range.index);
        setInputPosition({ top: bounds.top, left: bounds.left });
        setShowInput(true);
      }
    }
  };

  // Function to handle input field change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const content = quill.getContents();
        console.log(content);
      });
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      const toolbar = quill.getModule("toolbar");

      const customButton = document.createElement("button");
      customButton.innerHTML = "Math";
      customButton.classList.add("ql-customInput");

      toolbar.container
        .querySelector(".ql-align")
        .parentNode.appendChild(customButton);

      customButton.addEventListener("click", handleCustomButtonClick);
    }
  }, [quill]);

  // Function to handle input submit (for example)
  const handleInputSubmit = () => {
    // Optionally insert input value into the Quill editor at the cursor position
    const range = quill.getSelection();
    if (range) {
      quill.insertText(range.index, inputValue, "user");
    }
    setShowInput(false);
    setInputValue("");
  };

  return (
    <>
      <div style={{ width: "100%", height: "50vh" }}>
        <div ref={quillRef} />
      </div>
      {showInput && (
        <div
          style={{
            position: "absolute",
            top: inputPosition.top + 80, // Adjust for editor position
            left: inputPosition.left,
            zIndex: 1000,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "8px",
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter custom text"
          />
          <button onClick={handleInputSubmit}>Insert</button>
        </div>
      )}
    </>
  );
}

export default DocumentEditor;
