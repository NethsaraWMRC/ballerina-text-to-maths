import { Box, Typography } from "@mui/material";
import React from "react";

function DocCard() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "180px",
          height: "150px",
          backgroundColor: "white",
          border: " 1px solid rgba(0,0,0,0.2)",
          borderRadius: "5px",
          marginTop: "20px",
          cursor: "pointer",
          "&:hover": {
            borderColor: "#518FF5",
          },
          transition: "all 0.05s ease-in",
          //   justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // backgroundColor: "#F1F3F4",
            height: "50px",

            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 5px",
          }}
        >
          <Box
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "100px",
              "&:hover": {
                backgroundColor: "rgba(150,150,150,0.5)",
              },
              transition: "all 0.1s ease-in",
              zIndex: 10,
            }}
          >
            <img
              src={require("../assets/menu.png")}
              style={{ width: "30px", height: "30px" }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0 20px",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                color: "rgb(32, 33, 36)",
              }}
            >
              Example 1
            </Typography>
            <Typography
              sx={{
                color: "rgba(32, 33, 36, 0.6)",
                fontSize: "14px",
              }}
            >
              Opened oct 24, 2024
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DocCard;
