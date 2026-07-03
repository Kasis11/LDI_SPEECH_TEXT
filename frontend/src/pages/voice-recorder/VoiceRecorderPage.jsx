import AppLayout from "../../layouts/AppLayout";
import AppHeader from "../../components/common/AppHeader";
import ScenarioExtractionCard from "./components/ScenarioExtractionCard";

export default function VoiceRecorderPage() {
  return (
    <AppLayout>
      <AppHeader />

      <ScenarioExtractionCard />
    </AppLayout>
  );
}