import React from 'react';
import { Avatar, Button, TextField, Chip, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { Send, Chat } from '@mui/icons-material';

const Communication = () => {
  const messages = [
    { id: 1, sender: 'User', content: 'Hi, can you come 30 minutes earlier tomorrow?', time: '10:30 AM' },
    { id: 2, sender: 'You', content: 'Sure, I can be there by 9:30 AM', time: '10:35 AM' },
    { id: 3, sender: 'Recycler', content: 'The metal waste from yesterday was perfect quality', time: 'Yesterday' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
        <div className="flex space-x-2">
          <Button variant="outlined">Users</Button>
          <Button variant="outlined">Recyclers</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 border rounded-lg">
          <div className="p-3 border-b">
            <TextField size="small" fullWidth placeholder="Search messages..." />
          </div>
          <List className="divide-y">
            {[1, 2, 3].map((item) => (
              <ListItem key={item} button className="hover:bg-gray-50">
                <ListItemAvatar>
                  <Avatar>{item}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Contact ${item}`}
                  secondary={`Last message ${item} hour ago`}
                />
                {item === 1 && <Chip label="3" color="primary" size="small" />}
              </ListItem>
            ))}
          </List>
        </div>

        <div className="md:w-2/3 border rounded-lg flex flex-col">
          <div className="p-3 border-b flex items-center">
            <Avatar className="mr-2">U</Avatar>
            <div>
              <Typography variant="subtitle1">User Conversation</Typography>
              <Typography variant="caption" color="textSecondary">Active now</Typography>
            </div>
          </div>

          <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${message.sender === 'You' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Typography>{message.content}</Typography>
                  <Typography variant="caption" color="textSecondary" className="block text-right">{message.time}</Typography>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex">
            <TextField fullWidth placeholder="Type your message..." size="small" />
            <Button variant="contained" color="primary" className="ml-2" startIcon={<Send />}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;