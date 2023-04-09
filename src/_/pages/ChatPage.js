import React from "react";
import PagesContainer from "../components/PagesContainer";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const ChatBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  minWidth: 450,
});

const MessageList = styled(Box)({
  flexGrow: 1,
});

const ChatInput = styled(TextField)({
  marginTop: "auto",
});

export default function ChatPage({ props }) {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, user: "Me" },
      ]);
      setInputValue("");
    }
  };
  return (
    <PagesContainer {...props}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ChatBox>
          <MessageList>
            {messages.map((message, index) => (
              <div key={index}>
                <strong>{message.user}:</strong> {message.text}
              </div>
            ))}
          </MessageList>
          <ChatInput
            placeholder="Type a message..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyPress={handleInputKeyPress}
          />
        </ChatBox>
      </Box>
    </PagesContainer>
  );
}
