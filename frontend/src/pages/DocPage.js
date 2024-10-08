import { Box, Typography } from "@mui/material";
import React from "react";
import DocHeader from "../components/DocHeader";
import DocCard from "../components/DocCard";
import { useNavigate } from "react-router-dom";

function DocPage() {
  const navigation = useNavigate();

  const handleCreateNew = () => {
    navigation("/editor");
  };

  return (
    <>
      <DocHeader />
      <Box
        sx={{
          display: "flex",
          width: "100%",

          backgroundColor: "#F1F3F4",

          padding: "20px 0px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "70%",
          }}
        >
          <Typography
            sx={{
              color: "rgb(32, 33, 36)",
            }}
          >
            Start a new document
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "150px",
              height: "190px",
              backgroundColor: "white",
              border: " 1px solid rgba(0,0,0,0.2)",
              borderRadius: "5px",
              marginTop: "20px",
              cursor: "pointer",
              "&:hover": {
                borderColor: "#518FF5",
              },
              transition: "all 0.05s ease-in",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleCreateNew}
          >
            <img
              src={require("../assets/add.png")}
              style={{ width: "40%", height: "auto" }}
            />
          </Box>
          <Typography
            sx={{
              color: "rgba(32, 33, 36, 0.8)",
              fontWeight: 600,
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            Blank Document
          </Typography>
        </Box>
      </Box>

      {/* recent documents */}

      <Box
        sx={{
          display: "flex",
          width: "100%",

          padding: "20px 0px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "70%",
          }}
        >
          <Typography
            sx={{
              color: "rgb(32, 33, 36)",
            }}
          >
            Recent document
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: "40px",
            }}
          >
            <DocCard />
            <DocCard />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DocPage;
