import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";

import { useState } from "react";

import TextInput from "./TextInput";
import ExtractedForm from "../extraction/ExtractedForm";
import { sendMessage } from "../../services/chatService";
import { uploadExcel } from "../../services/excelService";
import { submitScenario } from "../../services/scenarioService";

export default function TextInputCard() {
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setExtractedData(null);
    setSubmittedData(null);

    try {
      const response = await sendMessage(message);

      const data =
        typeof response.reply === "string"
          ? JSON.parse(response.reply)
          : response.reply;

      setExtractedData(data);
    } finally {
      setLoading(false);
    }
  };

  const handleExcelUpload = async (file) => {
    setLoading(true);
    setExtractedData(null);
    setSubmittedData(null);

    try {
      const response = await uploadExcel(file);

      setExtractedData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    submitScenario(extractedData);

    setSubmittedData(extractedData);
    setExtractedData(null);
    setMessage("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: "1px solid #E5E7EB",
          bgcolor: "#FAFAFA",
        }}
      >
        <Typography variant="h6">Scenario Intelligence Extraction</Typography>

        <Typography variant="body2" color="text.secondary">
          Type your scenario details or upload an Excel file to extract
          Bureau intelligence fields.
        </Typography>
      </Box>

      {/* Input */}
      <Box sx={{ p: 3 }}>
        <TextInput
          message={message}
          onMessageChange={(e) => setMessage(e.target.value)}
          onSend={handleSend}
          onExcelSelect={handleExcelUpload}
        />

        {extractedData && !submittedData && (
          <ExtractedForm
            data={extractedData}
            onChange={setExtractedData}
            onSubmit={handleSubmit}
          />
        )}
      </Box>

      {/* Loader */}
      {loading && (
        <Box
          sx={{
            py: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress />

          <Typography color="text.secondary">Extracting scenario...</Typography>
        </Box>
      )}

      {/* Result */}
      {submittedData && (
        <Box sx={{ p: 3 }}>
          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Extraction Result
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: "#fafafa",
            }}
          >
            <pre
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontSize: 14,
              }}
            >
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </Paper>
        </Box>
      )}
    </Paper>
  );
}
