import { Box, IconButton, Paper, TextField } from "@mui/material";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { useRef } from "react";

export default function ChatInput({
  message,
  onMessageChange,
  onSend,
  onMicClick,
  isRecording,
  onExcelSelect,
}) {
  const fileInputRef = useRef(null);
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
        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => {
            const file = e.target.files[0];

            if (file && onExcelSelect) {
              onExcelSelect(file);
            }

            e.target.value = "";
          }}
        />
        <TextField
          fullWidth
          multiline
          minRows={1}
          maxRows={5}
          variant="outlined"
          placeholder="Type a message or use voice..."
          value={message ?? ""}
          onChange={onMessageChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
            },
          }}
        />
 
        <IconButton
          onClick={() => fileInputRef.current.click()}
          sx={{
            width: 56,
            height: 56,
            bgcolor: "secondary.main",
            color: "white",

            "&:hover": {
              bgcolor: "secondary.dark",
            },
          }}
        >
          <AttachFileRoundedIcon />
        </IconButton>

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
