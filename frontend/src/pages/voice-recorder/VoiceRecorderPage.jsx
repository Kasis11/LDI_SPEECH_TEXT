// import AppLayout from "../../layouts/AppLayout";
// import AppHeader from "../../components/common/AppHeader";
// import ScenarioExtractionCard from "./components/ScenarioExtractionCard";

// export default function VoiceRecorderPage() {
//   return (
//     <AppLayout>
//       <AppHeader />

//       <ScenarioExtractionCard />
//     </AppLayout>
//   );
// }
import { useState } from "react";

import AppLayout from "../../layouts/AppLayout";
import AppHeader from "../../components/common/AppHeader";
import InputModeTabs from "../../components/common/InputModeTabs/InputModeTabs";

import ScenarioExtractionCard from "./components/ScenarioExtractionCard";
import TextInputCard from "../../components/TextInput/TextInputCard";
import ManualForm from "../../components/manual-form/ManualForm";

export default function VoiceRecorderPage() {
  const [mode, setMode] = useState("voice");

  return (
    <AppLayout>
      <AppHeader />

      <InputModeTabs
        value={mode}
        onChange={setMode}
      />

      {mode === "voice" && <ScenarioExtractionCard />}
      {mode === "text" && <TextInputCard />}
      {mode === "manual" && <ManualForm />}
    </AppLayout>
  );
}