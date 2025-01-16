import { Box, Stack, Typography } from '@mui/material';
import React, { memo } from 'react'; // Import memo from React
import { Link } from 'react-router-dom';

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChatopen,
}) => {
  return (
    <Link to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChatopen(e, _id, groupChat)}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
        }}
      >
        {/* Avatar Card */}
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert?.count > 0 && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>

        {/* Online Indicator */}
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              position: "absolute",
              top: "50%",
              right: "1rem",
              backgroundColor: "green",
              borderRadius: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem); // Correct usage of memo
