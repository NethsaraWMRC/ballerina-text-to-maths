import React from "react";
import { Box, Typography } from "@mui/material";
import html2pdf from "html2pdf.js";

function DocumentHeader({ editorContent }) {
  const handleDownloadPDF = () => {
    console.log(editorContent);
    const opt = {
      margin: 1,
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(editorContent).set(opt).save(); // Convert and download the content as a PDF
  };

  return (
    <Box
      sx={{
        display: "flex",

        height: "50px",
        backgroundColor: "white",
        boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
        marginBottom: "15px",
        justifyContent: "space-between",
        padding: "0px 15px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          cursor: "pointer",
        }}
      >
        <Typography>HOME</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100px",
            height: "30px",
            backgroundColor: "red",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.7,
            },
            "&:active": {
              opacity: 0.5,
            },
          }}
        >
          <Box sx={{ color: "white" }} onClick={handleDownloadPDF}>
            Download
          </Box>
        </Box>

        <Box
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "200px",
            backgroundColor: "gray",
            cursor: "pointer",
            "&:active": {
              opacity: 0.7,
            },
            overflow: "hidden",
          }}
        >
          <img
            src={require("../assets/profile.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DocumentHeader;
