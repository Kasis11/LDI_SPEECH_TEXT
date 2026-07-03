import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { uploadExcel } from "../../services/excelService";

export default function ExcelUploader({ onResult }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const response = await uploadExcel(file);

      if (onResult) {
        onResult(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {file.name}
        </Typography>
      )}

      <Button
        variant="contained"
        sx={{ mt: 1 }}
        onClick={handleUpload}
      >
        Upload Excel
      </Button>
    </Box>
  );
}