import { Box, IconButton, Paper, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { useRef } from "react";

export default function TextInput({
  message,
  onMessageChange,
  onSend,
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
          minRows={2}
          maxRows={8}
          variant="outlined"
          placeholder="Type your scenario details here..."
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
