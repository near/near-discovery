import React from "react";
import PagesContainer from "../../components/PagesContainer";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Post from "./post.mdx";
import { MDXProvider } from "@mdx-js/react";

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

  console.log(Post);

  const components = {
    per: (props) => (
      <per style={{ backgroundColor: "green", color: "red" }} {...props} />
    ),
    h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    em: (props) => <i {...props} />,
  };
  return (
    <PagesContainer {...props}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
          overflowY: "auto",
          position: "relative",
        }}
      >
        <Box sx={{ pt: 2, position: "absolute", top: 0 }}>
          <MDXProvider components={components}>
            <Post />
          </MDXProvider>

          {/* <div dangerouslySetInnerHTML={{ __html: Post }} /> */}
        </Box>

        {/* <ChatBox>
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
        </ChatBox> */}
      </Box>
    </PagesContainer>
  );
}
