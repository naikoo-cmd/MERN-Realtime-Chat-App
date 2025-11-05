import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Track if this is the first load of a conversation
  const isInitialLoad = useRef(true);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    // Mark as initial load when user switches conversation
    isInitialLoad.current = true;

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    // Handle scroll behavior after messages load or change
    if (!messagesContainerRef.current || !messages || messages.length === 0) return;

    const container = messagesContainerRef.current;

    // If this is the initial load of the conversation, scroll to bottom immediately
    if (isInitialLoad.current) {
      // Use setTimeout to ensure DOM has fully rendered
      setTimeout(() => {
        if (messageEndRef.current) {
          messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
        isInitialLoad.current = false;
      }, 0);
      return;
    }

    // For subsequent messages (real-time updates), only auto-scroll if user is near bottom
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;

    if (isNearBottom) {
      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [messages]);

  // Reset initial load flag when user manually scrolls
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // If user scrolls away from bottom, mark as not initial load
      const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 10;
      if (!isAtBottom) {
        isInitialLoad.current = false;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      {/* Header - Fixed at top */}
      <ChatHeader />

      {/* Messages - Scrollable area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 min-h-0"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {messages.map((message) => (
          <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar flex-shrink-0">
              <div className="size-10 rounded-full border overflow-hidden">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
            </div>
            <div className="chat-bubble flex flex-col max-w-[70%] md:max-w-md break-words">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="max-w-full w-auto max-h-[300px] rounded-md mb-2 object-contain"
                />
              )}
              {message.text && <p className="break-words">{message.text}</p>}
            </div>
          </div>
        ))}
        {/* Invisible element to scroll to */}
        <div ref={messageEndRef} />
      </div>

      {/* Input - Fixed at bottom */}
      <MessageInput />
    </div>
  );
};
export default ChatContainer;
