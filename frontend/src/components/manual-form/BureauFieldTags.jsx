import { Card, CardContent, Typography, Grid, TextField } from "@mui/material";

export default function BureauFieldTags({ formData, handleChange }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Bureau Field Tags
        </Typography>

        <Grid container spacing={2}>
          {/* Bureau Field Tags */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Bureau Field Tags"
              name="bureauFieldTags"
              value={formData.bureauFieldTags}
              onChange={handleChange}
              placeholder="e.g. customer_name, account_number, transaction_amount"
              helperText="Enter comma-separated field names."
            />
          </Grid>

          {/* Suggested Typology */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Suggested Typology"
              name="suggestedTypology"
              value={formData.suggestedTypology}
              onChange={handleChange}
              placeholder="e.g. Funnel Accounts"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
