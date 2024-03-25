import React, { useState } from "react";
import { TextField } from "@mui/material";

export default function NameValidation() {

  const [lastName, setLastName] = useState("");
  const [LastnameError, setLastNameError] = useState(false);

  const handleLastNameChange = e => {
    setLastName(e.target.value);
    if (e.target.validity.valid) {
      setLastNameError(false);
    } else {
      setLastNameError(true);
    }
  };

  return (
    <TextField
    autoComplete="lname"
    name="lastname"
    variant="outlined"
    required
    fullWidth
    id="lastname"
    label="Last Name"
      value={lastName}
      onChange={handleLastNameChange}
      error={LastnameError}
      helperText={
        LastnameError ? "Please enter your last name (letters and spaces only)" : ""
      }
      inputProps={{
        pattern: "[A-Za-z ]+",
      }}
    />
  );
}