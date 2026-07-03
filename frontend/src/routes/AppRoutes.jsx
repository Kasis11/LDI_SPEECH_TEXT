import { BrowserRouter, Routes, Route } from "react-router-dom";

import VoiceRecorderPage from "../pages/voice-recorder/VoiceRecorderPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VoiceRecorderPage />} />
      </Routes>
    </BrowserRouter>
  );
}