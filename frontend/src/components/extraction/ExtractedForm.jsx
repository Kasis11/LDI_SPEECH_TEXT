import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function ExtractedForm({
  data,
  onChange,
  onSubmit,
}) {
  if (!data) return null;

  const handleFieldChange = (key, value) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  return (
    <Paper
      elevation={2}
      sx={{
        mt: 3,
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 3 }}
      >
        Extracted Information
      </Typography>

      {Object.entries(data).map(([key, value]) => {
        const isArray = Array.isArray(value);

        return (
          <Box
            key={key}
            sx={{ mb: 2 }}
          >
            <TextField
              fullWidth
              label={key.replace(/_/g, " ")}
              value={
                isArray
                  ? value.join(", ")
                  : value ?? ""
              }
              multiline={isArray}
              minRows={isArray ? 2 : 1}
              onChange={(e) =>
                handleFieldChange(
                  key,
                  isArray
                    ? e.target.value
                        .split(",")
                        .map((v) => v.trim())
                    : e.target.value,
                )
              }
            />
          </Box>
        );
      })}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
}