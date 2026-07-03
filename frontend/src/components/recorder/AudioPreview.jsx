import { useEffect, useRef, useState } from "react";

import {
  Box,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "00:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function AudioPreview({
  audioUrl,
  onDelete,
}) {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const loaded = () => setDuration(audio.duration);

    const update = () => setCurrentTime(audio.currentTime);

    const ended = () => setPlaying(false);

    audio.addEventListener("loadedmetadata", loaded);
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", ended);

    return () => {
      audio.removeEventListener("loadedmetadata", loaded);
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("ended", ended);
    };
  }, [audioUrl]);

  if (!audioUrl) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 3,
      }}
    >
      <Typography
        fontWeight={600}
        mb={2}
      >
        🎵 Voice Recording
      </Typography>

      <audio
        ref={audioRef}
        src={audioUrl}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          onClick={togglePlay}
        >
          {playing ? (
            <PauseRoundedIcon />
          ) : (
            <PlayArrowRoundedIcon />
          )}
        </IconButton>

        <Box sx={{ flex: 1 }}>
          <LinearProgress
            variant="determinate"
            value={
              duration
                ? (currentTime / duration) * 100
                : 0
            }
            sx={{
              height: 8,
              borderRadius: 10,
            }}
          />

          <Box
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="caption">
              {formatTime(currentTime)}
            </Typography>

            <Typography variant="caption">
              {formatTime(duration)}
            </Typography>
          </Box>
        </Box>

        <IconButton
          color="error"
          onClick={onDelete}
        >
          <DeleteRoundedIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}