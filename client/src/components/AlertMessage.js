import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AlertMessage({ open, onClose, message, severity }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose(event, reason);
  };

  //autoHideDuration baserat på meddelandets severity
  const autoHideDuration = severity === "error" ? 6000 : null;

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
