// import { Box, Paper, Typography } from "@mui/material";
// import { useState, useEffect } from "react";

// import ChatInput from "../../../components/chat/ChatInput";
// import useVoiceRecorder from "../../../hooks/useVoiceRecorder";
// import RecordingToolbar from "../../../components/recorder/RecordingToolbar";
// import formatTime from "../../../utils/formatTime";
// import AudioPreview from "../../../components/recorder/AudioPreview";
// import { sendMessage } from "../../../services/chatService";
// import ExcelUploader from "../../../components/excel/ExcelUploader";
// import { uploadExcel } from "../../../services/excelService";
// import { CircularProgress } from "@mui/material";

// export default function ConversationCard() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [excelResult, setExcelResult] = useState(null);
//   // const recorder = useVoiceRecorder(async (response) => {
//   //   const userId = Date.now();
//   //   const loadingId = userId + 1;

//   //   // Show transcript immediately
//   //   setMessages((prev) => [
//   //     ...prev,
//   //     {
//   //       id: userId,
//   //       role: "user",
//   //       content: response.transcript,
//   //     },
//   //     {
//   //       id: loadingId,
//   //       role: "assistant",
//   //       loading: true,
//   //     },
//   //   ]);

//   //   // Replace loader with assistant reply
//   //   const assistantData =
//   //     typeof response.assistant_reply === "string"
//   //       ? JSON.parse(response.assistant_reply)
//   //       : response.assistant_reply;

//   //   setMessages((prev) =>
//   //     prev.map((msg) =>
//   //       msg.id === loadingId
//   //         ? {
//   //             id: loadingId,
//   //             role: "assistant",
//   //             type: "json",
//   //             content: assistantData,
//   //           }
//   //         : msg,
//   //     ),
//   //   );
//   // });

//   const recorder = useVoiceRecorder(async (response) => {
//     console.log(response);

//     setMessage(response.transcript ?? "");
//   });

//   // useEffect(() => {
//   //   console.log("Transcript:", recorder.transcript);

//   //   if (recorder.transcript) {
//   //     setMessage(recorder.transcript);
//   //   }
//   // }, [recorder.transcript]);
//   const handleSend = async () => {
//     if (!message.trim()) return;

//     const userMessage = message;

//     const userId = Date.now();
//     const loadingId = userId + 1;

//     setMessages((prev) => [
//       ...prev,
//       {
//         id: userId,
//         role: "user",
//         content: userMessage,
//       },
//       {
//         id: loadingId,
//         role: "assistant",
//         loading: true,
//       },
//     ]);

//     setMessage("");

//     try {
//       const response = await sendMessage(userMessage);

//       const assistantData =
//         typeof response.reply === "string"
//           ? JSON.parse(response.reply)
//           : response.reply;

//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg.id === loadingId
//             ? {
//                 id: loadingId,
//                 role: "assistant",
//                 type: "json",
//                 content: assistantData,
//               }
//             : msg,
//         ),
//       );
//     } catch (error) {
//       console.error(error);

//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg.id === loadingId
//             ? {
//                 id: loadingId,
//                 role: "assistant",
//                 content: "Something went wrong.",
//               }
//             : msg,
//         ),
//       );
//     }
//   };

//   const handleExcelUpload = async (file) => {
//     // Unique IDs so we can update the loading message later
//     const userId = Date.now();
//     const loadingId = userId + 1;

//     // Show uploaded file in chat
//     setMessages((prev) => [
//       ...prev,
//       {
//         id: userId,
//         role: "user",
//         type: "file",
//         fileName: file.name,
//       },
//       {
//         id: loadingId,
//         role: "assistant",
//         loading: true,
//       },
//     ]);

//     try {
//       const response = await uploadExcel(file);

//       // Replace loading bubble with extracted JSON
//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg.id === loadingId
//             ? {
//                 id: loadingId,
//                 role: "assistant",
//                 type: "json",
//                 content: response.data,
//               }
//             : msg,
//         ),
//       );
//     } catch (err) {
//       console.error(err);

//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg.id === loadingId
//             ? {
//                 id: loadingId,
//                 role: "assistant",
//                 content: "Failed to process Excel file.",
//               }
//             : msg,
//         ),
//       );
//     }
//   };

//   const handleMicClick = () => {
//     if (recorder.isRecording) {
//       recorder.stopRecording();
//     } else {
//       recorder.startRecording();
//     }
//   };

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         borderRadius: 3,
//         overflow: "hidden",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           px: 3,
//           py: 2,
//           borderBottom: "1px solid #E5E7EB",
//           bgcolor: "#FAFAFA",
//         }}
//       >
//         <Typography variant="h6">Conversation</Typography>

//         <Typography variant="body2" color="text.secondary">
//           Record your voice and review the transcript.
//         </Typography>
//       </Box>

//       {/* Conversation */}
//       <Box
//         sx={{
//           height: 420,
//           p: 3,
//           overflowY: "auto",
//         }}
//       >
//         {messages.length === 0 ? (
//           <Typography color="text.secondary">
//             🎤 Click the microphone to start recording.
//           </Typography>
//         ) : (
//           messages.map((msg) => (
//             <Box
//               key={msg.id}
//               sx={{
//                 display: "flex",
//                 justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
//                 mb: 2,
//               }}
//             >
//               <Box
//                 sx={{
//                   bgcolor: msg.role === "user" ? "primary.main" : "grey.200",

//                   color: msg.role === "user" ? "white" : "black",
//                   // color: "white",
//                   px: 2,
//                   py: 1,
//                   borderRadius: 2,
//                   maxWidth: "75%",
//                 }}
//               >
//                 <>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       fontWeight: 600,
//                       display: "block",
//                       mb: 0.5,
//                     }}
//                   >
//                     {msg.role === "user" ? "You" : "Assistant"}
//                   </Typography>

//                   {msg.type === "file" ? (
//                     <Typography>📄 {msg.fileName}</Typography>
//                   ) : msg.loading ? (
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                       }}
//                     >
//                       <CircularProgress size={18} />

//                       <Typography variant="body2">
//                         {msg.loadingText || "Thinking..."}
//                       </Typography>
//                     </Box>
//                   ) : msg.type === "json" ? (
//                     <pre
//                       style={{
//                         whiteSpace: "pre-wrap",
//                         margin: 0,
//                       }}
//                     >
//                       {JSON.stringify(msg.content, null, 2)}
//                     </pre>
//                   ) : (
//                     <Typography>{msg.content}</Typography>
//                   )}
//                 </>
//               </Box>
//             </Box>
//           ))
//         )}
//       </Box>

//       {/* Chat Input */}
//       <Box sx={{ p: 2 }}>
//         {recorder.isRecording && (
//           <RecordingToolbar
//             isPaused={recorder.isPaused}
//             recordingTime={formatTime(recorder.recordingTime)}
//             onPauseResume={
//               recorder.isPaused
//                 ? recorder.resumeRecording
//                 : recorder.pauseRecording
//             }
//           />
//         )}
//         <AudioPreview
//           audioUrl={recorder.audioUrl}
//           onDelete={recorder.deleteRecording}
//         />
//         <ChatInput
//           message={message}
//           onMessageChange={(e) => setMessage(e.target.value)}
//           onSend={handleSend}
//           onMicClick={handleMicClick}
//           isRecording={recorder.isRecording}
//           onExcelSelect={handleExcelUpload}
//         />
//       </Box>
//     </Paper>
//   );
// }

import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";

import { useState } from "react";

import ChatInput from "../../../components/chat/ChatInput";
import useVoiceRecorder from "../../../hooks/useVoiceRecorder";
import RecordingToolbar from "../../../components/recorder/RecordingToolbar";
import AudioPreview from "../../../components/recorder/AudioPreview";
import formatTime from "../../../utils/formatTime";
import ExtractedForm from "../../../components/extraction/ExtractedForm";
import { sendMessage } from "../../../services/chatService";
import { uploadExcel } from "../../../services/excelService";
import { submitScenario } from "../../../services/scenarioService";

export default function ConversationCard() {
  const [message, setMessage] = useState("");
  // const [result, setExtractedData] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const recorder = useVoiceRecorder((response) => {
    console.log(response);

    // Fill textbox with transcript
    setMessage(response?.transcript ?? "");
  });

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setExtractedData(null);
    setSubmittedData(null);

    try {
      const response = await sendMessage(message);

      const data =
        typeof response.reply === "string"
          ? JSON.parse(response.reply)
          : response.reply;

      setExtractedData(data);
    } finally {
      setLoading(false);
    }
  };

  const handleExcelUpload = async (file) => {
    setLoading(true);
    setExtractedData(null);
    setSubmittedData(null);

    try {
      setLoading(true);

      const response = await uploadExcel(file);

      setExtractedData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    submitScenario(extractedData);

    setSubmittedData(extractedData);
    setExtractedData(null);
    setMessage("");
  };

  const handleMicClick = () => {
    if (recorder.isRecording) {
      recorder.stopRecording();
    } else {
      recorder.startRecording();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: "1px solid #E5E7EB",
          bgcolor: "#FAFAFA",
        }}
      >
        <Typography variant="h6">Scenario Intelligence Extraction</Typography>

        <Typography variant="body2" color="text.secondary">
          Submit text, record voice, or upload an Excel scenario to extract
          Bureau intelligence fields.
        </Typography>
      </Box>

      {/* {loading && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>
            Extracting Scenario Intelligence...
          </Typography>
        </Box>
      )} */}

      {/* Input */}
      <Box sx={{ p: 3 }}>
        {recorder.isRecording && (
          <RecordingToolbar
            isPaused={recorder.isPaused}
            recordingTime={formatTime(recorder.recordingTime)}
            onPauseResume={
              recorder.isPaused
                ? recorder.resumeRecording
                : recorder.pauseRecording
            }
          />
        )}

        <AudioPreview
          audioUrl={recorder.audioUrl}
          onDelete={recorder.deleteRecording}
        />

        <ChatInput
          message={message}
          onMessageChange={(e) => setMessage(e.target.value)}
          onSend={handleSend}
          onMicClick={handleMicClick}
          isRecording={recorder.isRecording}
          onExcelSelect={handleExcelUpload}
        />

        {extractedData && !submittedData && (
          <ExtractedForm
            data={extractedData}
            onChange={setExtractedData}
            onSubmit={handleSubmit}
          />
        )}
      </Box>

      {/* Loader */}
      {loading && (
        <Box
          sx={{
            py: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress />

          <Typography color="text.secondary">Extracting scenario...</Typography>
        </Box>
      )}

      {/* Result */}
      {submittedData && (
        <Box sx={{ p: 3 }}>
          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Extraction Result
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: "#fafafa",
            }}
          >
            <pre
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontSize: 14,
              }}
            >
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </Paper>
        </Box>
      )}
    </Paper>
  );
}
