import React from "react";
import { Box, Typography } from "@mui/material";
import html2pdf from "html2pdf.js";

function DocHeader({ editorContent }) {
  return (
    <Box
      sx={{
        display: "flex",

        height: "70px",
        backgroundColor: "white",
        boxShadow: "0 2px 15px rgba(0,0,0,0.1)",

        justifyContent: "space-between",
        padding: "0px 15px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          cursor: "pointer",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <img
          src={require("../assets/docs.png")}
          style={{
            width: "40px",
            height: "40px",
          }}
        />
        <Typography sx={{ fontSize: "20px" }}>Docs</Typography>
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
            width: "50px",
            height: "50px",
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

export default DocHeader;
