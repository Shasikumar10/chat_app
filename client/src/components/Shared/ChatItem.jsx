import React, { memo } from 'react';
import {Link } from 'react-router-dom'
import {Stack,Typography } from '@mui/material'
const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat=false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChatOpen,
    
}) => {
  return <Link to={`/chat/${_id}`}  onContextMenu={(e)=> handleDeleteChatOpen(e,_id,groupChat)} >
    <div style={{
        display: "flex",
        gap:"1rem",
        alignItems: "center",
        padding: "1rem",
        backgroundcolor: sameSender ? "black" : "unset",
        color:sameSender ? "White": "unset",
        justifyContent: "space-between",
        position: "relative",
    }} 
    >
        {/*Avatr card*/}
        <Stack>
            <Typography>{name}</Typography>
            {
                newMessageAlert && (
                    <Typography>{newMessageAlert.count} New Message </Typography>
                )

            }
        </Stack>

        isOnline && <Box
         sx={{
            backgroundColor: "green",
            width: "10rem",
            height: "10rem",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            right: "1rem",
            zIndex: 999,
            transition: "translateY(-50%)",
        }} />





    </div>
  </Link>
}

export default memo(ChatItem);
