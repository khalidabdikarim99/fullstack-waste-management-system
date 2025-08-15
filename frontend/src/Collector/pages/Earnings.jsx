import React from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { AttachMoney, TrendingUp, History } from '@mui/icons-material';

const Earnings = () => {
  const stats = [
    { label: 'This Week', value: '$245', change: '+12%' },
    { label: 'This Month', value: '$980', change: '+5%' },
    { label: 'All Time', value: '$5,420', change: '+22%' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Earnings Overview</h2>
        <Button variant="outlined" startIcon={<History />}>View History</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Box key={index} className="border rounded-lg p-4 text-center">
            <Typography variant="subtitle2" color="textSecondary">{stat.label}</Typography>
            <div className="flex items-center justify-center mt-2">
              <AttachMoney className="text-green-500 mr-1" />
              <Typography variant="h5">{stat.value}</Typography>
            </div>
            <Typography variant="caption" className={`flex items-center justify-center mt-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              <TrendingUp fontSize="small" className="mr-0.5" />
              {stat.change}
            </Typography>
          </Box>
        ))}
      </div>

      <Divider className="my-4" />

      <div>
        <Typography variant="h6" className="mb-2">Recent Transactions</Typography>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded">
              <div>
                <Typography>Pickup #{100 + item}</Typography>
                <Typography variant="caption" color="textSecondary">Jun {15 - item}, 2023</Typography>
              </div>
              <Typography className="font-medium">${80 + (item * 10)}</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Earnings;