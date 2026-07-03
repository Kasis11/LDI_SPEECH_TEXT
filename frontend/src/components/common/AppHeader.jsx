import { Box, Typography } from "@mui/material";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";

export default function AppHeader() {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1,
        }}
      >
        <GraphicEqRoundedIcon color="primary" fontSize="large" />

        <Typography variant="h4">
          Voice Recorder Assistant
        </Typography>
      </Box>

      <Typography color="text.secondary">
        Record your voice, preview it, convert it into text, and process it with AI.
      </Typography>
    </Box>
  );
}