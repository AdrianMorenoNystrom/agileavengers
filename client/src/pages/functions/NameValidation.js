import React, { useState } from "react";
import { TextField } from "@mui/material";

export default function NameValidation() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const handleNameChange = e => {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };
  return (
    <TextField
      autoComplete="fname"
      name="fullName"
      variant="outlined"
      required
      fullWidth
      id="fullName"
      label="Full Name"
      autoFocus
      value={name}
      onChange={handleNameChange}
      error={nameError}
      helperText={
        nameError ? "Please enter your name (letters and spaces only)" : ""
      }
      inputProps={{
        pattern: "[A-Za-z ]+",
      }}
    />
  );
}