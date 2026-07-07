import { Card, CardContent, Typography, Grid, TextField } from "@mui/material";

export default function InvestigatorReasoning({ formData, handleChange }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Investigator Reasoning
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Why was this suspicious?"
              name="whySuspicious"
              value={formData.whySuspicious}
              onChange={handleChange}
              placeholder="Describe why this activity appeared suspicious..."
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="What differentiated it from false positives?"
              name="falsePositiveDifferentiation"
              value={formData.falsePositiveDifferentiation}
              onChange={handleChange}
              placeholder="Explain why this was not considered a false positive..."
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="What made you escalate?"
              name="escalationTrigger"
              value={formData.escalationTrigger}
              onChange={handleChange}
              placeholder="Describe the factors that led to escalation..."
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="What sequence mattered most?"
              name="keySequence"
              value={formData.keySequence}
              onChange={handleChange}
              placeholder="Describe the sequence of events that was important..."
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="What additional evidence confirmed suspicion?"
              name="confirmingEvidence"
              value={formData.confirmingEvidence}
              onChange={handleChange}
              placeholder="Provide supporting evidence or observations..."
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
