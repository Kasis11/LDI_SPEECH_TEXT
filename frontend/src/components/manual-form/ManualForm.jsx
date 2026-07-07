import { useState } from "react";
import { Box, Button } from "@mui/material";
import ScenarioBasics from "./ScenarioBasics";
import BehavioralPatterns from "./BehavioralPatterns";
import InvestigatorReasoning from "./InvestigatorReasoning";
import BureauFieldTags from "./BureauFieldTags";
import NotesSection from "./NotesSection";

const initialFormData = {
  patternName: "",
  investigatorRole: "",
  businessUnit: "",
  productType: "",
  geography: "",
  customerType: "",
  industry: "",
  riskLevel: "",
  confidenceScore: "",
  firstSeenDate: "",
  repeatFrequency: "",

  triggerEvent: "",
  behavioralIndicator1: "",
  behavioralIndicator2: "",
  behavioralIndicator3: "",
  velocityPattern: "",

  whySuspicious: "",
  falsePositiveDifferentiation: "",
  escalationTrigger: "",
  keySequence: "",
  confirmingEvidence: "",

  bureauFieldTags: "",
  suggestedTypology: "",

  notes: "",
};
export default function ManualForm() {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Submitted Data:", formData);

    // clear form after submit
    setFormData(initialFormData);
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ScenarioBasics formData={formData} handleChange={handleChange} />

      <BehavioralPatterns formData={formData} handleChange={handleChange} />

      <InvestigatorReasoning formData={formData} handleChange={handleChange} />

      <BureauFieldTags formData={formData} handleChange={handleChange} />

      <NotesSection formData={formData} handleChange={handleChange} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
        }}
      >
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
}
