import React, { Suspense } from "react";
import Nevbar from "./components/Nevbar/Nevbar";
import RoutesPaths from "./routes/RoutesPaths";
import { CircularProgress, Box } from "@mui/material";

function App() {
  return (
    <>
      <Nevbar />
      <Box sx={{ pt: 8 }}>
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <RoutesPaths />
        </Suspense>
      </Box>
    </>
  );
}

export default React.memo(App);
