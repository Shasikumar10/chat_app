import { Stack } from '@mui/material';
import React from 'react';
import ChatItem from '../Shared/ChatItem';

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    }
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"}>
      {chats?.map((data) => {
        const { avatar, _id, name, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);
        const isOnline = members?.some((member) => onlineUsers.includes(_id));
        
        return (
          <ChatItem
            key={_id}
            index={data.index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            _id={_id}
            name={name}
            groupChat={groupChat}
            sameSender={groupChat}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
