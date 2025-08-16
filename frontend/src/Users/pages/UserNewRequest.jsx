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
  FormHelperText,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import {
  CalendarToday as DateIcon,
  Schedule as TimeIcon,
  LocationOn as LocationIcon,
  Category as WasteTypeIcon,
  Description as NotesIcon,
  AddAPhoto as PhotoIcon,
  Send as SubmitIcon,
  CheckCircle as SuccessIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const collectionFrequencies = [
  'One-time',
  'Weekly',
  'Bi-weekly',
  'Monthly'
];

const validationSchema = Yup.object().shape({
  wasteType: Yup.string().required('Waste type is required'),
  collectionDate: Yup.date().required('Collection date is required').min(new Date(), 'Date cannot be in the past'),
  collectionTime: Yup.string().required('Collection time is required'),
  frequency: Yup.string().required('Frequency is required'),
  address: Yup.string().required('Address is required').min(10, 'Address is too short'),
  notes: Yup.string().max(200, 'Notes should not exceed 200 characters'),
  quantity: Yup.number().required('Quantity is required').min(1, 'Minimum quantity is 1')
});

const UserNewRequest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [photo, setPhoto] = useState(null);

  const formik = useFormik({
    initialValues: {
      wasteType: '',
      collectionDate: '',
      collectionTime: '',
      frequency: '',
      address: '',
      notes: '',
      quantity: 1
    },
    validationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Submitted:', { ...values, photo });
        setIsSubmitting(false);
        setSuccess(true);
        formik.resetForm();
        setPhoto(null);
      }, 1500);
    }
  });

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ 
        p: 4,
        backgroundColor: 'white'
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold',
          color: 'rgb(34, 197, 94)', // green-500
          '& .MuiSvgIcon-root': {
            color: 'rgb(34, 197, 94)' // green-500 for icon
          }
        }}>
          <SubmitIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          New Collection Request
        </Typography>
        
        <Typography variant="subtitle1" sx={{ 
          mb: 3,
          color: 'text.secondary'
        }}>
          Fill out the form to schedule a waste collection
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
        
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Waste Type */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={formik.touched.wasteType && Boolean(formik.errors.wasteType)}>
                <InputLabel id="waste-type-label">Waste Type</InputLabel>
                <Select
                  labelId="waste-type-label"
                  id="wasteType"
                  name="wasteType"
                  value={formik.values.wasteType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Waste Type"
                >
                  {wasteTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: 'rgb(239, 68, 68)' }}> {/* red-500 */}
                  {formik.touched.wasteType && formik.errors.wasteType}
                </FormHelperText>
              </FormControl>
            </Grid>
            
            {/* Quantity */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="quantity"
                name="quantity"
                label="Quantity (bags/items)"
                type="number"
                InputProps={{
                  inputProps: { min: 1 }
                }}
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
                FormHelperTextProps={{
                  sx: {
                    color: 'rgb(239, 68, 68)' // red-500
                  }
                }}
              />
            </Grid>
            
            {/* Collection Date */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="collectionDate"
                name="collectionDate"
                label={
                  <Box display="flex" alignItems="center">
                    <DateIcon sx={{ mr: 1, fontSize: 20, color: 'action.active' }} />
                    Collection Date
                  </Box>
                }
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.collectionDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.collectionDate && Boolean(formik.errors.collectionDate)}
                helperText={formik.touched.collectionDate && formik.errors.collectionDate}
                FormHelperTextProps={{
                  sx: {
                    color: 'rgb(239, 68, 68)' // red-500
                  }
                }}
              />
            </Grid>
            
            {/* Collection Time */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="collectionTime"
                name="collectionTime"
                label={
                  <Box display="flex" alignItems="center">
                    <TimeIcon sx={{ mr: 1, fontSize: 20, color: 'action.active' }} />
                    Collection Time
                  </Box>
                }
                type="time"
                InputLabelProps={{ shrink: true }}
                value={formik.values.collectionTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.collectionTime && Boolean(formik.errors.collectionTime)}
                helperText={formik.touched.collectionTime && formik.errors.collectionTime}
                FormHelperTextProps={{
                  sx: {
                    color: 'rgb(239, 68, 68)' // red-500
                  }
                }}
              />
            </Grid>
            
            {/* Frequency */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={formik.touched.frequency && Boolean(formik.errors.frequency)}>
                <InputLabel id="frequency-label">Collection Frequency</InputLabel>
                <Select
                  labelId="frequency-label"
                  id="frequency"
                  name="frequency"
                  value={formik.values.frequency}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Collection Frequency"
                >
                  {collectionFrequencies.map((freq) => (
                    <MenuItem key={freq} value={freq}>{freq}</MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: 'rgb(239, 68, 68)' }}> {/* red-500 */}
                  {formik.touched.frequency && formik.errors.frequency}
                </FormHelperText>
              </FormControl>
            </Grid>
            
            {/* Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label={
                  <Box display="flex" alignItems="center">
                    <LocationIcon sx={{ mr: 1, fontSize: 20, color: 'action.active' }} />
                    Collection Address
                  </Box>
                }
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                multiline
                rows={3}
                FormHelperTextProps={{
                  sx: {
                    color: 'rgb(239, 68, 68)' // red-500
                  }
                }}
              />
            </Grid>
            
            {/* Photo Upload */}
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="photo-upload"
                type="file"
                onChange={handlePhotoChange}
              />
              <label htmlFor="photo-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoIcon />}
                  sx={{ mr: 2 }}
                >
                  Upload Photo
                </Button>
              </label>
              {photo && (
                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                  {photo.name}
                </Typography>
              )}
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                Upload a photo of your waste (optional)
              </Typography>
            </Grid>
            
            {/* Notes */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="notes"
                name="notes"
                label={
                  <Box display="flex" alignItems="center">
                    <NotesIcon sx={{ mr: 1, fontSize: 20, color: 'action.active' }} />
                    Additional Notes
                  </Box>
                }
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.notes && Boolean(formik.errors.notes)}
                helperText={formik.touched.notes && formik.errors.notes}
                multiline
                rows={4}
                placeholder="Any special instructions for the collector..."
                FormHelperTextProps={{
                  sx: {
                    color: 'rgb(239, 68, 68)' // red-500
                  }
                }}
              />
            </Grid>
            
            {/* Submit Button */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SubmitIcon />}
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: 'rgb(34, 197, 94)', // green-500
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgb(22, 163, 74)' // green-600
                    }
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
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
          icon={<SuccessIcon fontSize="inherit" />}
          sx={{ 
            width: '100%',
            backgroundColor: 'rgb(34, 197, 94)', // green-500
            color: 'white'
          }}
        >
          Your collection request has been submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserNewRequest;