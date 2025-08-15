import React from 'react';
import { Button, Chip } from '@mui/material';
import { Today, CalendarViewWeek, Map } from '@mui/icons-material';

const Schedule = () => {
  const pickups = [
    { id: 1, address: "123 Green St", time: "09:00 AM", status: "pending", wasteType: "Plastic" },
    { id: 2, address: "456 Eco Ave", time: "10:30 AM", status: "pending", wasteType: "Paper" },
    { id: 3, address: "789 Recycle Rd", time: "01:00 PM", status: "completed", wasteType: "Metal" }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'warning';
      case 'in-progress': return 'info';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Pickup Schedule</h2>
        <div className="flex space-x-2">
          <Button variant="outlined" startIcon={<Today />}>Today</Button>
          <Button variant="outlined" startIcon={<CalendarViewWeek />}>Week</Button>
          <Button variant="contained" color="primary" startIcon={<Map />}>View Map</Button>
        </div>
      </div>

      <div className="space-y-4">
        {pickups.map(pickup => (
          <div key={pickup.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{pickup.address}</h3>
                <p className="text-sm text-gray-500">{pickup.time} • {pickup.wasteType}</p>
              </div>
              <Chip 
                label={pickup.status} 
                color={getStatusColor(pickup.status)} 
                size="small"
              />
            </div>
            <div className="mt-3 flex space-x-2">
              <Button size="small" variant="outlined">Details</Button>
              <Button size="small" variant="contained" color="primary">
                {pickup.status === 'completed' ? 'View Details' : 'Start Pickup'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;