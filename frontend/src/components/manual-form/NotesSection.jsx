import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
} from "@mui/material";

export default function NotesSection({
  formData,
  handleChange,
}) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>

        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
        >
          Additional Notes
        </Typography>

        <Grid container spacing={2}>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Provide any additional context, investigation notes, example cases, references, or observations that may help explain this scenario..."
              helperText="Optional"
            />
          </Grid>

        </Grid>

      </CardContent>
    </Card>
  );
}