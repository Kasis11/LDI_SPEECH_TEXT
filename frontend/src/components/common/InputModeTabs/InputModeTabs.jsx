import { Paper, Tabs, Tab } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function InputModeTabs({ value, onChange }) {
  return (
    <Paper
      elevation={1}
      sx={{
        mb: 3,
        borderRadius: 1,
      }}
    >
      <Tabs
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        centered
        sx={{
          "& .MuiTab-root": {
            mx: 5.5,
          },
        }}
      >
        <Tab
          icon={<MicIcon />}
          iconPosition="start"
          label="Voice Input"
          value="voice"
        />

        <Tab
          icon={<KeyboardIcon />}
          iconPosition="start"
          label="Text Input"
          value="text"
        />

        <Tab
          icon={<EditNoteIcon />}
          iconPosition="start"
          label="Manual Form"
          value="manual"
        />
      </Tabs>
    </Paper>
  );
}
