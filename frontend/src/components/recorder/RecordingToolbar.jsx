import { Box, Chip, IconButton, Tooltip } from "@mui/material";

import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

export default function RecordingToolbar({
  isPaused,
  recordingTime,
  onPauseResume,
}) {
  return (
    <Box
      sx={{
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 1,
      }}
    >
      <Chip
        color={isPaused ? "warning" : "error"}
        label={`${isPaused ? "Paused" : "Recording"} • ${recordingTime}`}
      />

      <Tooltip title={isPaused ? "Resume Recording" : "Pause Recording"}>
        <IconButton
          color={isPaused ? "warning" : "primary"}
          onClick={onPauseResume}
        >
          {isPaused ? (
            <PlayArrowRoundedIcon />
          ) : (
            <PauseRoundedIcon />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
}