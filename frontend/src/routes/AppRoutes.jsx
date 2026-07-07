// 

import { BrowserRouter, Routes, Route } from "react-router-dom";

import VoiceRecorderPage from "../pages/voice-recorder/VoiceRecorderPage";
import ScenarioBuilderPage from "../pages/ScenarioBuilder/index";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VoiceRecorderPage />} />
        <Route
          path="/scenario-builder"
          element={<ScenarioBuilderPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}