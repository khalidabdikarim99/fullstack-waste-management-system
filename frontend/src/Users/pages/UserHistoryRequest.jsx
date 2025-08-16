import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Grid,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Pagination
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Visibility as ViewIcon,
  Receipt as ReceiptIcon,
  Cancel as CancelIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  DirectionsCar as InProgressIcon
} from '@mui/icons-material';

const statusChip = (status) => {
  switch (status) {
    case 'Completed':
      return <Chip icon={<CompletedIcon />} label="Completed" color="success" variant="outlined" />;
    case 'Pending':
      return <Chip icon={<PendingIcon />} label="Pending" color="warning" variant="outlined" />;
    case 'In Progress':
      return <Chip icon={<InProgressIcon />} label="In Progress" color="info" variant="outlined" />;
    case 'Cancelled':
      return <Chip icon={<CancelIcon />} label="Cancelled" color="error" variant="outlined" />;
    default:
      return <Chip label={status} variant="outlined" />;
  }
};

const historyData = [
  {
    id: '#W2W-2023-001',
    date: '2023-10-15',
    wasteType: 'Plastic',
    quantity: 3,
    collector: 'Green Collectors',
    status: 'Completed',
    points: 150
  },
  {
    id: '#W2W-2023-002',
    date: '2023-10-18',
    wasteType: 'Paper',
    quantity: 5,
    collector: 'Eco Warriors',
    status: 'Completed',
    points: 200
  },
  {
    id: '#W2W-2023-003',
    date: '2023-10-20',
    wasteType: 'Electronic',
    quantity: 2,
    collector: 'Tech Recyclers',
    status: 'In Progress',
    points: 0
  },
  {
    id: '#W2W-2023-004',
    date: '2023-10-22',
    wasteType: 'Organic',
    quantity: 4,
    collector: 'Bio Collect',
    status: 'Pending',
    points: 0
  },
  {
    id: '#W2W-2023-005',
    date: '2023-10-10',
    wasteType: 'Metal',
    quantity: 7,
    collector: 'Metal Masters',
    status: 'Cancelled',
    points: 0
  }
];

const UserHistoryRequest = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const filteredData = historyData.filter((request) =>
    request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.wasteType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.collector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: 'white' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold',
          color: 'rgb(34, 197, 94)', // green-500
          display: 'flex',
          alignItems: 'center'
        }}>
          <ReceiptIcon sx={{ mr: 1 }} />
          My Collection History
        </Typography>
        
        <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
          View and manage your past waste collection requests
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <IconButton onClick={() => setSearchTerm('')}>
                    <CancelIcon />
                  </IconButton>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              sx={{ mr: 2 }}
            >
              Filters
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Request ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Waste Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Collector</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Points Earned</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.wasteType}</TableCell>
                    <TableCell>{request.quantity} bags</TableCell>
                    <TableCell>{request.collector}</TableCell>
                    <TableCell>{statusChip(request.status)}</TableCell>
                    <TableCell>
                      {request.points > 0 ? (
                        <Chip label={`+${request.points}`} color="success" variant="outlined" />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ViewIcon />}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {filteredData.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              No collection requests found
            </Typography>
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default UserHistoryRequest;