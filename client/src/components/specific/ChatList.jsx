import React from "react";
import { Stack } from "@mui/material";
import ChatItem from "../Shared/ChatItem"; 
;
const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [{ chatId: "1", count: 0 }],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction="column">
      {chats?.map((data,) => {
        const { avatar, _id, name, groupChat, members } = data;

        const newMessageAlert = newMessagesAlert.find(
          (alert) => alert.chatId === _id
        );

        const isOnline = members?.some((member) => onlineUsers.includes(member));

        return (
          <ChatItem
            index={index}
            newMessagesAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChatOpen={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
