import { Card, CardContent, Typography, Grid, TextField } from "@mui/material";

export default function BehavioralPatterns({ formData, handleChange }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Behavioral Patterns
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Alert Trigger / Trigger Event"
              name="triggerEvent"
              value={formData.triggerEvent}
              onChange={handleChange}
              placeholder="Describe what triggered the investigation..."
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Behavioral Indicator 1"
              name="behavioralIndicator1"
              value={formData.behavioralIndicator1}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Behavioral Indicator 2"
              name="behavioralIndicator2"
              value={formData.behavioralIndicator2}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Behavioral Indicator 3"
              name="behavioralIndicator3"
              value={formData.behavioralIndicator3}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Velocity Pattern"
              name="velocityPattern"
              value={formData.velocityPattern}
              onChange={handleChange}
              placeholder="e.g. 17 wire transfers within 3 hours"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
