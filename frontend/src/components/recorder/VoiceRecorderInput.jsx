import { Box, IconButton, Paper, TextField } from "@mui/material";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function VoiceRecorderInput({
  message,
  onMessageChange,
  onSend,
  onMicClick,
  isRecording,
  hasTranscript,
}) {
  const isEditable = hasTranscript && !isRecording;
  return (
    <Paper
      elevation={2}
      sx={{
        mt: 2,
        p: 1,
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          multiline
          minRows={1}
          maxRows={5}
          variant="outlined"
          placeholder={
            isRecording
              ? "Listening..."
              : "Click the mic to record — your transcript will appear here"
          }
          value={message ?? ""}
          onChange={onMessageChange}
          disabled={!isEditable}
          helperText={
            !hasTranscript && !isRecording
              ? "Record your voice to fill this in — typing isn't allowed until there's a transcript."
              : ""
          }
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
        />

        <IconButton
          onClick={onMicClick}
          sx={{
            width: 56,
            height: 56,
            bgcolor: isRecording ? "error.main" : "primary.main",
            color: "white",
            transition: "all 0.2s ease",

            "&:hover": {
              bgcolor: isRecording ? "error.dark" : "primary.dark",
              transform: "scale(1.05)",
            },
          }}
        >
          {isRecording ? (
            <StopRoundedIcon fontSize="medium" />
          ) : (
            <MicRoundedIcon fontSize="medium" />
          )}
        </IconButton>

        <IconButton
          onClick={onSend}
          disabled={!(message ?? "").trim()}
          sx={{
            width: 56,
            height: 56,
            bgcolor: "success.main",
            color: "white",

            "&:hover": {
              bgcolor: "success.dark",
            },
          }}
        >
          <SendRoundedIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
