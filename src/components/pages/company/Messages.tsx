import {
  Avatar,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  MoreVert,
  PinDropOutlined,
  PushPinOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";

interface MessagesProps {}

const chatListData = [
  {
    id: 1,
    name: "Jan Mayer",
    profileIcon: "/assets/images/Avatar1.png",
    lastMessage:
      "Hey Jan, I wanted to reach out because we saw your work contributions and were impressed by your work. ",
    time: "12 mins ago",
  },
  {
    id: 2,
    name: "Joe Bartmann",
    profileIcon: "/assets/images/Avatar2.png",
    lastMessage: "Hi, How are you?",
    time: "12:05 PM",
  },
  {
    id: 3,
    name: "Ally Wales",
    profileIcon: "/assets/images/Avatar3.png",
    lastMessage:
      "Hey Ally, I wanted to reach out because we saw your work contributions and were impressed by your work. ",
    time: "01:15 PM",
  },
  {
    id: 4,
    name: "James Gardner",
    profileIcon: "/assets/images/Avatar4.png",
    lastMessage: "Hi, How are you?",
    time: "02:25 PM",
  },
  {
    id: 5,
    name: "Allison Geidt",
    profileIcon: "/assets/images/Avatar5.png",
    lastMessage:
      "Hey Allison, I wanted to reach out because we saw your work contributions and were impressed by your work. ",
    time: "03:02 PM",
  },
  {
    id: 6,
    name: "Jan Mayer",
    profileIcon: "/assets/images/Avatar6.png",
    lastMessage:
      "Hey Jan, I wanted to reach out because we saw your work contributions and were impressed by your work. ",
    time: "12 mins ago",
  },
  {
    id: 7,
    name: "Joe Bartmann",
    profileIcon: "/assets/images/Avatar7.png",
    lastMessage: "Hi, How are you?",
    time: "12:05 PM",
  },
  {
    id: 8,
    name: "Ally Wales",
    profileIcon: "/assets/images/Avatar8.png",
    lastMessage:
      "Hey Ally, I wanted to reach out because we saw your work contributions and were impressed by your work. ",
    time: "01:15 PM",
  },
  {
    id: 9,
    name: "James Gardner",
    profileIcon: "/assets/images/Avatar9.png",
    lastMessage: "Hi, How are you?",
    time: "02:25 PM",
  },
  {
    id: 10,
    name: "Allison Geidt",
    profileIcon: "/assets/images/Avatar1.png",
    lastMessage:
      "Hey Allison, I wanted to reach out because we saw your work contributions and were impressed by your work. ",
    time: "03:02 PM",
  },
];

const Messages: React.FC<MessagesProps> = () => {
  const [isChat, setIsChat] = useState<boolean>(false);

  return (
    <div className="flex h-full w-full">
      <div className="w-[350px] border-e h-full">
        <div className="h-[52px] mb-1 p-3">
          <TextField
            fullWidth
            color="secondary"
            size="small"
            placeholder="Seach messages"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="inherit" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
        <div className="h-[calc(100%-56px)] overflow-auto p-3">
          <List>
            {chatListData?.map((item, index) => (
              <>
                <ListItem
                  alignItems="flex-start"
                  key={index}
                  className="hover:bg-indigo-100 cursor-pointer border-b"
                  onClick={() => setIsChat(true)}
                >
                  <ListItemAvatar>
                    <Avatar alt={item.name} src={item.profileIcon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <div className="flex justify-between">
                          <p className="text-title mb-1">{item.name}</p>
                          <p className="text-info text-gray-500">{item.time}</p>
                        </div>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <p className="text-base truncate">{item.lastMessage}</p>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </>
            ))}
          </List>
        </div>
      </div>
      <div className="w-[calc(100%-350px)]">
        {!isChat ? (
          <div className="p-4 flex justify-center items-center h-full flex-col">
            <img
              src={"/assets/images/vendorscloud.png"}
              alt="JobHunty Logo"
              className="h-[100px]"
            />
            <h4 className="text-heading my-8">Welcome to Vendors Cloud</h4>
            <p>
              Start a chat with vendors or clients by selecting a contact or
              creating a new chat
            </p>
          </div>
        ) : (
          <div className="h-full">
            <div className="h-[70px] border-b flex justify-between items-center p-4">
              <div className="w-1/2 flex items-center">
                <div>
                  <Avatar alt={"Jon"} src="/assets/images/Avatar1.png" />
                </div>
                <div className="ms-3">
                  <h4 className="text-title mb-1">Jan Mayer</h4>
                  <p className="text-info">Recruiter at Nomad</p>
                </div>
              </div>
              <div className="w-1/2 text-right">
                <IconButton aria-label="PushPinOutlined" className="!mr-3">
                  <PushPinOutlined />
                </IconButton>
                <IconButton aria-label="StarBorderOutlined" className="!mr-3">
                  <StarBorderOutlined />
                </IconButton>
                <IconButton aria-label="MoreVert" className="!mr-3">
                  <MoreVert />
                </IconButton>
              </div>
            </div>
            <div className="h-[calc(100%-70px)] p-4 flex justify-center items-center flex-col">
              <Avatar
                alt={"Jon"}
                src="/assets/images/Avatar1.png"
                className="!h-[75px] !w-[75px]"
              />
              <h4 className="text-title mt-5 mb-2 font-bold">Jon Mayer</h4>
              <p className="text-base">Recruiter at Nomad</p>
              <p className="text-base">
                This is the very beginning of your direct message with Jan Mayer
              </p>

              <div className="w-full h-screen p-6 flex flex-col justify-between">
                {/* Chat Container */}
                <div className="space-y-4 overflow-y-auto">
                  {/* Sender message */}
                  <div className="flex items-start space-x-3">
                    <Avatar alt="Jan Mayer" src="/assets/images/Avatar1.png" />
                    <div className="bg-white p-4 rounded-lg shadow-md max-w-lg">
                      <p className="text-title">Jan Mayer</p>
                      <p className="mt-1 text-gray-700 text-base">
                        Hey Jake, I wanted to reach out because we saw your work
                        contributions and were impressed by your work.
                      </p>
                      <p className="mt-1 text-gray-700 text-base">
                        We want to invite you for a quick interview
                      </p>
                      <span className="text-xs text-gray-500">12 mins ago</span>
                    </div>
                  </div>

                  {/* Receiver message */}
                  <div className="flex items-start justify-end space-x-3">
                    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md max-w-lg">
                      <p className="text-base">
                        Hi Jan, sure I would love to. Thanks for taking the time
                        to see my work!
                      </p>
                      <span className="text-xs text-gray-200">12 mins ago</span>
                    </div>
                    <Avatar alt="You" src="/assets/images/Avatar2.png" />
                  </div>
                </div>

                {/* Input Field */}
                <div className="flex items-center mt-4 sticky bottom-0 px-4">
                  <TextField
                    fullWidth
                    placeholder="Reply message"
                    variant="outlined"
                    className="!mr-4"
                    size="small"
                    multiline
                    maxRows={3}
                  />
                  <IconButton color="primary">
                    <SendIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
