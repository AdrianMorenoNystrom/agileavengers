import React, { useState } from "react";
import { TextField } from "@mui/material";

export default function NameValidation() {

  const [firstName, setFirstName] = useState("");
  const [FirstnameError, setFirstNameError] = useState(false);


  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
    if (e.target.validity.valid) {
      setFirstNameError(false);
    } else {
      setFirstNameError(true);
    }
  };


  return (
    <TextField
    autoComplete="fname"
    name="firstname"
    variant="outlined"
    required
    fullWidth
    id="firstname"
    label="First Name"
    autoFocus
      value={firstName}
      onChange={handleFirstNameChange}
      error={FirstnameError}
      helperText={
        FirstnameError ? "Please enter your first name (letters and spaces only)" : ""
      }
      inputProps={{
        pattern: "[A-Za-z ]+",
      }}
    />
  );
}