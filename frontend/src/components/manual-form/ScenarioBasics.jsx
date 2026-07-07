import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import { useState } from "react";

export default function ScenarioBasics({
  formData,
  handleChange,
}) {

  const investigatorRoles = [
    "TM Analyst",
    "Level 2 Investigator",
    "EDD Analyst",
    "QA Investigator",
  ];

  const businessUnits = [
    "Retail Banking",
    "Commercial Banking",
    "Crypto",
    "Payments",
    "Insurance",
    "Other",
  ];

  const customerTypes = ["Individual", "Business"];

  const riskLevels = ["Low", "Medium", "High", "Critical"];

  const repeatFrequency = ["One-off", "Occasional", "Frequent", "Systematic"];

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Scenario Basics
        </Typography>

        <Grid container spacing={2}>
          {/* Pattern Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Pattern Name"
              name="patternName"
              value={formData.patternName}
              onChange={handleChange}
            />
          </Grid>

          {/* Investigator Role */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Investigator Role"
              name="investigatorRole"
              value={formData.investigatorRole}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Select Investigator Role
              </MenuItem>

              {investigatorRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Business Unit */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Business Unit"
              name="businessUnit"
              value={formData.businessUnit}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Select Business Unit
              </MenuItem>

              {businessUnits.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Product Type */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Product Type"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              placeholder="e.g. Wire Transfer"
            />
          </Grid>

          {/* Geography */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Geography"
              name="geography"
              value={formData.geography}
              onChange={handleChange}
              placeholder="e.g. UAE → Turkey → USA"
            />
          </Grid>

          {/* Customer Type */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Customer Type"
              name="customerType"
              value={formData.customerType}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Select Customer Type
              </MenuItem>

              {customerTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Industry */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            />
          </Grid>

          {/* Risk Level */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Risk Level"
              name="riskLevel"
              value={formData.riskLevel}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Select Risk Level
              </MenuItem>

              {riskLevels.map((risk) => (
                <MenuItem key={risk} value={risk}>
                  {risk}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Confidence */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Confidence Score"
              name="confidenceScore"
              value={formData.confidenceScore}
              onChange={handleChange}
              slotProps={{
                htmlInput: {
                  min: 1,
                  max: 10,
                },
              }}
            />
          </Grid>

          {/* First Seen */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="date"
              label="First Seen Date"
              name="firstSeenDate"
              value={formData.firstSeenDate}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>

          {/* Repeat Frequency */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Repeat Frequency"
              name="repeatFrequency"
              value={formData.repeatFrequency}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Select Repeat Frequency
              </MenuItem>

              {repeatFrequency.map((frequency) => (
                <MenuItem key={frequency} value={frequency}>
                  {frequency}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
