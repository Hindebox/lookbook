import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function DescriptionAlerts({ alertType, message, alertAdvice }) {
  return (
    <Stack
      sx={{
        width: "80%",
        position: "fixed",
        top: "85%",
        left: "50%",
        transform: "translateX(-50%)",
      }}
      spacing={2}
    >
      <Alert severity={alertType === "error" ? "error" : "success"}>
        <AlertTitle>{alertType === "error" ? "Error" : "Success"}</AlertTitle>
        {message} — <strong>{alertAdvice}!</strong>
      </Alert>
    </Stack>
  );
}

{
  /* <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert — <strong>check it out!</strong>
      </Alert>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — <strong>check it out!</strong>
      </Alert> */
}
