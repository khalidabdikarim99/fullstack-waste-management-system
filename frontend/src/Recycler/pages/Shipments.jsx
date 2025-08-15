import React from 'react';
import { Button, Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { LocalShipping, CheckCircle, Pending } from '@mui/icons-material';

const Shipments = () => {
  const shipments = [
    { id: 1, type: 'Plastic', source: 'Collector A', date: '2023-06-15', status: 'pending', weight: '150 kg' },
    { id: 2, type: 'Metal', source: 'User Direct', date: '2023-06-14', status: 'received', weight: '80 kg' },
    { id: 3, type: 'E-waste', source: 'Collector B', date: '2023-06-13', status: 'received', weight: '45 kg' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Incoming Shipments</h2>
        <Button variant="contained" color="primary">
          New Delivery
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shipments.map((shipment) => (
            <TableRow key={shipment.id} hover>
              <TableCell>{shipment.type}</TableCell>
              <TableCell>{shipment.source}</TableCell>
              <TableCell>{shipment.date}</TableCell>
              <TableCell>{shipment.weight}</TableCell>
              <TableCell>
                <Chip 
                  icon={shipment.status === 'received' ? <CheckCircle /> : <Pending />}
                  label={shipment.status}
                  color={shipment.status === 'received' ? 'success' : 'warning'}
                />
              </TableCell>
              <TableCell>
                <Button size="small">Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Shipments;