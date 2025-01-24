import { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import ReactMarkdown from "react-markdown";
import {
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { MentionsInput, Mention } from "react-mentions";
import gfm from "remark-gfm";
import { getVisualizationResponse } from "@/data/dummyData";
import MainVisuals from "@/components/visuals/MainVisuals";
import { TypingAnimation } from "../../components/visuals/typingAnimation";
import { AnimatePresence, motion } from "framer-motion";

const JettIcon = ({ className }) => (
  <img src="/img/logo-ct-dark.png" alt="Bot Icon" className={className} />
);

const UserIcon = ({ className }) => (
  <img src="/img/user-icon.svg" alt="User Icon" className={className} />
);

function ChatBox() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTildePresent, setIsTildePresent] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [partialQuery, setPartialQuery] = useState("");
  const [nameToIdMap, setNameToIdMap] = useState(new Map());

  const [messageState, setMessageState] = useState({
    messages: [
      {
        message: "Hi, what would you like to ask me?",
        type: "bot",
        isTyping: false,
      },
    ],
    history: [],
    pending: undefined,
    sourceDocuments: [],
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!query) {
      alert("Please input a question");
      return;
    }

    const question = query.trim();

    // Add user message
    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: "you",
          message: question,
        },
      ],
    }));

    setLoading(true);
    setQuery("");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const res = getVisualizationResponse(question);

    if (res) {
      setMessageState((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            type: "bot",
            message: res.message,
            visualization: res.data,
            isTyping: true,
          },
        ],
      }));

      setTimeout(() => {
        setMessageState((state) => ({
          ...state,
          messages: state.messages.map((msg, index) =>
            index === state.messages.length - 1
              ? { ...msg, isTyping: false }
              : msg
          ),
        }));
      }, res.message.length * 20 + 500);
    }

    setLoading(false);
  }

  const handleEnter = (e) => {
    if (isTildePresent) return;
    if (e.key === "Enter" && query) {
      handleSubmit(e);
    } else if (e.key == "Enter") {
      e.preventDefault();
    }
  };

  const { messages } = messageState;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.includes("~")) {
      const afterTilde = value.split("~").pop();
      setIsTildePresent(true);
      setPartialQuery(afterTilde);
    } else {
      setIsTildePresent(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        {messages.map((message, index) => {
          if (message.message === "") return null;

          const isBot = message.type === "bot";
          const icon = isBot ? (
            <JettIcon className="h-6 w-6" />
          ) : (
            <UserIcon className="h-4 w-4" />
          );

          return (
            <div
              key={`chatMessage-${index}`}
              className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2`}
            >
              <div
                className={`flex sm:max-w-[80%] max-w-[100%] items-start gap-2 ${
                  isBot
                    ? "border bg-gray-100 shadow-lg"
                    : "border bg-gray-50 shadow-lg"
                } rounded-lg p-3`}
              >
                {isBot && <div className="flex-none">{icon}</div>}
                <div className={`flex-grow sm:text-sm text-xs text-black max-w-[95%]`}>
                  {message.isTyping ? (
                    <TypingAnimation text={message.message} speed={30} />
                  ) : (
                    <ReactMarkdown remarkPlugins={[gfm]} linkTarget="_blank">
                      {message.message}
                    </ReactMarkdown>
                  )}
                  <AnimatePresence>
                    {message.visualization && !message.isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        className="mt-3"
                      >
                        <MainVisuals
                          content={message.visualization}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {!isBot && <div className="flex-none">{icon}</div>}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="border-t p-4">
        <div className="relative w-full">
          <MentionsInput
            value={query}
            onChange={handleInput}
            onKeyDown={handleEnter}
            placeholder="Send a message..."
            disabled={loading}
            className={`w-full ${loading ? "pr-10" : ""}`}
            classNames={{
              input: "border-2 rounded-lg h-10 flex items-center py-2 w-full",
            }}
            style={{
              control: {},
              highlighter: { overflow: "hidden" },
              input: {
                margin: 0,
                border: 0,
                outline: "none",
                paddingLeft: "10px",
                paddingTop: "8px",
                fontSize: "12px",
                width: "100%",
              },
              suggestions: {
                list: {
                  position: "absolute",
                  bottom: "100%",
                  backgroundColor: "white",
                  border: "1px solid rgba(0,0,0,0.15)",
                  fontSize: "12px",
                },
                item: {
                  padding: "5px 15px",
                  borderBottom: "1px solid rgba(0,0,0,0.15)",
                  "&focused": { backgroundColor: "#cee4e5" },
                },
              },
            }}
          >
            <Mention
              trigger="~"
              data={autocompleteResults}
              onAdd={() => {}}
              appendSpaceOnAdd={true}
            />
          </MentionsInput>

          {loading ? (
            <div className="absolute top-1/2 right-2 -translate-y-1/2 transform">
              <EllipsisHorizontalIcon className="animate-ellipsis bold-loader h-5 w-5 text-gray-500" />
            </div>
          ) : (
            <div className="absolute top-1/2 right-2 -translate-y-1/2 transform">
              <PaperAirplaneIcon
                onClick={handleSubmit}
                className="bold-loader h-4 w-4 cursor-pointer text-gray-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Chat() {
  return (
    <>
      <div className="w-full"></div>
      <div className=" flex h-[calc(100vh-48px)] flex-col ">
        <Card className="flex h-full min-h-[50vh] w-full flex-col ">
          <CardBody className="flex flex-1 flex-col overflow-y-auto  p-1 sm:p-2">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Chat with us
            </Typography>
            <div className="flex-1 overflow-y-auto">
              <ChatBox />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Chat;
