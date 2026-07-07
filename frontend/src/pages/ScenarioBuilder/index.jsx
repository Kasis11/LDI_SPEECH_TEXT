{/* <ScenarioBuilder>

    Voice Button

    Manual Form Button

    if Voice
        <VoiceRecorder />

    if Manual
        <ScenarioForm />

</ScenarioBuilder> */}

import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import DescriptionIcon from "@mui/icons-material/Description";

export default function ScenarioBuilderPage() {
  const [mode, setMode] = useState("");

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight={600}>
        Scenario Intelligence Builder
      </Typography>

      <Typography sx={{ mt: 2, mb: 4 }}>
        Choose how you want to create the scenario.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea onClick={() => setMode("voice")}>
              <CardContent sx={{ textAlign: "center", py: 5 }}>
                <MicIcon sx={{ fontSize: 50 }} />
                <Typography variant="h6" mt={2}>
                  Voice Input
                </Typography>

                <Typography variant="body2">
                  Record your investigation using your microphone.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea onClick={() => setMode("manual")}>
              <CardContent sx={{ textAlign: "center", py: 5 }}>
                <DescriptionIcon sx={{ fontSize: 50 }} />

                <Typography variant="h6" mt={2}>
                  Manual Form
                </Typography>

                <Typography variant="body2">
                  Fill the scenario details manually.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      {mode === "voice" && (
        <Typography sx={{ mt: 5 }}>
          Voice recorder will be shown here.
        </Typography>
      )}

      {mode === "manual" && (
        <Typography sx={{ mt: 5 }}>
          Manual form will be shown here.
        </Typography>
      )}
    </Container>
  );
}