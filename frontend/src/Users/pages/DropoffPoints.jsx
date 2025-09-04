import React, { useState } from 'react';
import { 
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Grid,
  Divider,
  Chip,
  Card,
  CardContent,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
  Rating,
  Pagination,
  CircularProgress,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Schedule as HoursIcon,
  LocalOffer as WasteTypeIcon,
  Star as RatingIcon,
  Directions as DirectionsIcon,
  FilterList as FilterIcon,
  Map as MapIcon,
  List as ListIcon,
  MyLocation as CurrentLocationIcon
} from '@mui/icons-material';

// Sample data for drop-off points
const dropoffPointsData = [
  {
    id: 1,
    name: "Eco Recycling Center",
    address: "123 Green Street, Eco City",
    distance: "1.2 km",
    rating: 4.5,
    reviews: 124,
    hours: "8:00 AM - 6:00 PM",
    acceptedTypes: ["Plastic", "Paper", "Glass", "Metal", "Electronic"],
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 2,
    name: "Community Waste Station",
    address: "456 Sustainability Ave, Green Town",
    distance: "2.3 km",
    rating: 4.2,
    reviews: 89,
    hours: "7:00 AM - 8:00 PM",
    acceptedTypes: ["Plastic", "Paper", "Organic"],
    coordinates: { lat: 40.7218, lng: -74.0160 }
  },
  {
    id: 3,
    name: "Hazardous Materials Depot",
    address: "789 Safety Road, Clean City",
    distance: "3.7 km",
    rating: 4.7,
    reviews: 67,
    hours: "9:00 AM - 5:00 PM (Weekdays only)",
    acceptedTypes: ["Hazardous", "Electronic", "Metal"],
    coordinates: { lat: 40.7028, lng: -74.0260 }
  },
  {
    id: 4,
    name: "Green Earth Recycling",
    address: "101 Environment Blvd, Eco Town",
    distance: "4.1 km",
    rating: 4.0,
    reviews: 203,
    hours: "24/7",
    acceptedTypes: ["Plastic", "Paper", "Glass", "Textile"],
    coordinates: { lat: 40.7328, lng: -74.0060 }
  },
  {
    id: 5,
    name: "Reuse & Recycle Hub",
    address: "202 Circular Street, Sustainable City",
    distance: "5.5 km",
    rating: 4.8,
    reviews: 156,
    hours: "6:00 AM - 10:00 PM",
    acceptedTypes: ["Plastic", "Paper", "Glass", "Metal", "Electronic", "Textile", "Organic"],
    coordinates: { lat: 40.7128, lng: -74.0360 }
  }
];

const wasteTypes = [
  'Plastic',
  'Paper',
  'Glass',
  'Metal',
  'Organic',
  'Electronic',
  'Textile',
  'Hazardous',
  'Other'
];

const DropoffPoints = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const itemsPerPage = 3;
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTypeFilter = (event, newTypes) => {
    setSelectedTypes(newTypes);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDirections = (location) => {
    setLoading(true);
    // Simulate getting directions
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setSelectedLocation(location);
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  // Filter and sort data
  const filteredData = dropoffPointsData
    .filter(point => {
      const matchesSearch = point.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           point.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTypes = selectedTypes.length === 0 || 
                          selectedTypes.some(type => point.acceptedTypes.includes(type));
      return matchesSearch && matchesTypes;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') {
        return parseFloat(a.distance) - parseFloat(b.distance);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: 'white' }}>
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems={isMobile ? 'flex-start' : 'center'} mb={3}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold',
            color: 'rgb(34, 197, 94)',
            mr: 2
          }}>
            <LocationIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Drop-off Points
          </Typography>
          
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            sx={{ mt: isMobile ? 2 : 0 }}
          >
            <ToggleButton value="list" aria-label="list view">
              <ListIcon />
            </ToggleButton>
            <ToggleButton value="map" aria-label="map view">
              <MapIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        
        <Typography variant="subtitle1" sx={{ 
          mb: 3,
          color: 'text.secondary'
        }}>
          Find nearby locations to drop off your recyclable materials
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
        
        {/* Filters and Search */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search locations"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: <FilterIcon />
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="sort-label">Sort by</InputLabel>
              <Select
                labelId="sort-label"
                id="sort"
                value={sortBy}
                label="Sort by"
                onChange={handleSortChange}
              >
                <MenuItem value="distance">Distance</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<CurrentLocationIcon />}
              sx={{ height: '56px' }}
            >
              Use My Location
            </Button>
          </Grid>
          
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" flexWrap="wrap">
              <WasteTypeIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ mr: 2, fontWeight: 'bold' }}>
                Filter by waste type:
              </Typography>
              <ToggleButtonGroup
                value={selectedTypes}
                onChange={handleTypeFilter}
                aria-label="waste types"
                sx={{ flexWrap: 'wrap' }}
              >
                {wasteTypes.map((type) => (
                  <ToggleButton
                    key={type}
                    value={type}
                    aria-label={type}
                    sx={{ 
                      mb: 1, 
                      mr: 1,
                      borderRadius: '16px',
                      border: '1px solid rgba(34, 197, 94, 0.5)',
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(34, 197, 94, 0.12)',
                        color: 'rgb(34, 197, 94)'
                      }
                    }}
                  >
                    {type}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Grid>
        </Grid>
        
        {/* Content based on view mode */}
        {viewMode === 'list' ? (
          <>
            {/* List View */}
            <Grid container spacing={3}>
              {paginatedData.map((point) => (
                <Grid item xs={12} key={point.id}>
                  <Card elevation={2} sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between">
                        <Box flex={1}>
                          <Typography variant="h6" gutterBottom>
                            {point.name}
                          </Typography>
                          <Box display="flex" alignItems="center" mb={1}>
                            <LocationIcon sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {point.address} • {point.distance} away
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <HoursIcon sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {point.hours}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={2}>
                            <RatingIcon sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                            <Rating value={point.rating} precision={0.1} size="small" readOnly />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                              ({point.reviews} reviews)
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                              Accepted materials:
                            </Typography>
                            <Box>
                              {point.acceptedTypes.map((type) => (
                                <Chip
                                  key={type}
                                  label={type}
                                  size="small"
                                  sx={{ 
                                    mr: 1, 
                                    mb: 1,
                                    backgroundColor: 'rgba(34, 197, 94, 0.12)',
                                    color: 'rgb(34, 197, 94)'
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                        
                        {!isMobile && (
                          <Box sx={{ ml: 2, minWidth: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box
                              sx={{
                                width: 100,
                                height: 100,
                                backgroundColor: '#f5f5f5',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 1
                              }}
                            >
                              <Typography variant="caption" color="text.secondary">
                                Map Preview
                              </Typography>
                            </Box>
                            <Button
                              variant="contained"
                              startIcon={<DirectionsIcon />}
                              onClick={() => handleDirections(point)}
                              sx={{
                                backgroundColor: 'rgb(34, 197, 94)',
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: 'rgb(22, 163, 74)'
                                }
                              }}
                            >
                              Directions
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                    
                    {isMobile && (
                      <CardActions>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<DirectionsIcon />}
                          onClick={() => handleDirections(point)}
                          sx={{
                            backgroundColor: 'rgb(34, 197, 94)',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'rgb(22, 163, 74)'
                            }
                          }}
                        >
                          Get Directions
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    '& .MuiPaginationItem-root.Mui-selected': {
                      backgroundColor: 'rgb(34, 197, 94)',
                      color: 'white'
                    }
                  }}
                />
              </Box>
            )}
          </>
        ) : (
          /* Map View */
          <Box 
            sx={{ 
              height: '500px', 
              backgroundColor: '#e8f5e9', 
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <MapIcon sx={{ fontSize: 64, color: 'rgb(34, 197, 94)', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Interactive Map View
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '400px', textAlign: 'center' }}>
              This would display an interactive map with markers for all drop-off locations. 
              Clicking on a marker would show details about that location.
            </Typography>
          </Box>
        )}
      </Paper>
      
      {/* Success Notification */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ 
            width: '100%',
            backgroundColor: 'rgb(34, 197, 94)',
            color: 'white'
          }}
        >
          {selectedLocation && `Directions to ${selectedLocation.name} are being prepared!`}
        </Alert>
      </Snackbar>
      
      {/* Loading Overlay */}
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <CircularProgress sx={{ color: 'rgb(34, 197, 94)' }} />
        </Box>
      )}
    </Container>
  );
};

export default DropoffPoints;