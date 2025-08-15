import React from 'react';
import { Badge, Chip, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { Warning, Info, Assignment } from '@mui/icons-material';

const Notifications = () => {
  const notifications = [
    { id: 1, type: 'urgent', message: 'Overflow bin at 123 Green St needs immediate pickup', time: '10 min ago' },
    { id: 2, type: 'new', message: 'New pickup request from 456 Eco Ave', time: '2 hours ago' },
    { id: 3, type: 'info', message: 'Schedule change for tomorrow', time: '1 day ago' }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'urgent': return <Warning color="error" />;
      case 'new': return <Assignment color="primary" />;
      default: return <Info color="info" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
        <Chip label={`${notifications.length} New`} color="primary" size="small" />
      </div>

      <List className="divide-y">
        {notifications.map((notification) => (
          <ListItem key={notification.id} className="hover:bg-gray-50">
            <ListItemAvatar>
              <Badge color="error" variant="dot" invisible={notification.type !== 'urgent'}>
                <Avatar className="bg-gray-100">
                  {getIcon(notification.type)}
                </Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={notification.message}
              secondary={notification.time}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Notifications;