import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import { Box, Button } from "@mui/material";
import "quill/dist/quill.snow.css";
import DocumentHeader from "./DocumentHeader";

function DocumentEditor() {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputPosition, setInputPosition] = useState({ top: 0, left: 0 });
  const [editorContent, setEditorContent] = useState("");

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          [{ align: [] }],
          [{ size: ["small", false, "large", "huge"] }],
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const content = quill.getContents();
        // console.log(content);
        setEditorContent(document.querySelector(".ql-editor"));
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

  const handleInputSubmit = () => {
    const range = quill.getSelection();
    if (range) {
      quill.insertText(range.index, inputValue, "user");
    }
    setShowInput(false);
    setInputValue("");
  };

  return (
    <>
      <DocumentHeader editorContent={editorContent} />
      <Box style={{ height: "50vh", padding: "0 15px" }}>
        <Box ref={quillRef} />
      </Box>
      {showInput && (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: inputPosition.top + 130,
            left: inputPosition.left + 15,
            zIndex: 1000,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "8px",
            gap: "5px",
            height: "30px",
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter custom text"
          />
          <Button onClick={handleInputSubmit}>Insert</Button>
        </Box>
      )}
      {/* <Button onClick={handleDownloadPDF} variant="contained" color="primary">
        Download as PDF
      </Button> */}
    </>
  );
}

export default DocumentEditor;
