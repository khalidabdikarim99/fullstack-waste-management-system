// src/User/pages/Support.jsx
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid
} from '@mui/material';
import {
  ExpandMore,
  AccountCircle,
  LocalShipping,
  AssignmentTurnedIn,
  Report,
  Security,
  PrivacyTip,
  Gavel,
  SupportAgent,
  Update,
  CheckCircle,
  Warning,
  Info,
  Rule,
  ContactSupport,
  Email,
  Phone
} from '@mui/icons-material';

const Support = () => {
  const rules = [
    {
      title: "User Account",
      icon: <AccountCircle />,
      content: "Users must register using valid information. Keep your login credentials safe and do not share them. You are responsible for all activities under your account."
    },
    {
      title: "Pickup Requests",
      icon: <LocalShipping />,
      content: "Only submit accurate details when requesting waste pickups. Misleading or false information may result in rejection of the request."
    },
    {
      title: "Confirmations",
      icon: <AssignmentTurnedIn />,
      content: "Confirmations must reflect actual pickup events. Providing incorrect confirmation data may violate site rules and can result in account suspension."
    },
    {
      title: "Reports",
      icon: <Report />,
      content: "Reports should be honest and factual. Users should avoid submitting false complaints or misuse of the reporting system."
    },
    {
      title: "Content Guidelines",
      icon: <Security />,
      content: "Users should avoid uploading inappropriate, offensive, or illegal content, including images or notes. Any violations will be addressed promptly."
    },
    {
      title: "Privacy & Data",
      icon: <PrivacyTip />,
      content: "Your personal data, including contact information and activity history, is used solely to provide services. Sharing or misuse of other users' data is strictly prohibited."
    },
    {
      title: "Accountability",
      icon: <Gavel />,
      content: "Users are responsible for their actions on the platform. The website reserves the right to restrict, suspend, or terminate accounts that violate rules or misuse the platform."
    },
    {
      title: "Support & Feedback",
      icon: <SupportAgent />,
      content: "For any issues, concerns, or questions, users can contact support. Constructive feedback is encouraged to improve our services."
    },
    {
      title: "Changes to Rules",
      icon: <Update />,
      content: "The website may update these rules and conditions periodically. Users are encouraged to review them regularly to stay informed."
    }
  ];

  return (
    <Box className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-10 px-4">
      <Box className="max-w-4xl mx-auto">
        {/* Header Section */}
        <Card className="mb-8 rounded-2xl shadow-lg overflow-hidden">
          <Box className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white text-center">
            <Rule className="text-4xl mb-2" />
            <Typography variant="h3" className="font-bold mb-2">
              Website Rules & Conditions
            </Typography>
            <Typography variant="h6" className="text-green-100">
              Guidelines for using Waste2Wealth services
            </Typography>
          </Box>
        </Card>

        {/* Introduction Card */}
        <Card className="mb-6 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <Box className="flex items-center gap-3 mb-4">
              <Info color="primary" className="text-3xl" />
              <Typography variant="h5" className="font-semibold">
                Important Information
              </Typography>
            </Box>
            <Typography variant="body1" className="mb-4">
              Welcome to Waste2Wealth! To ensure a safe and productive experience for all users, 
              please review the following rules and conditions carefully.
            </Typography>
            <Box className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <Typography variant="body2" className="flex items-start gap-2">
                <CheckCircle className="text-blue-500 mt-0.5" />
                By using this website, you agree to follow all the rules and conditions listed below.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Rules List */}
        <Card className="mb-6 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h5" className="mb-6 flex items-center gap-2">
              <Gavel className="text-amber-600" /> Rules & Guidelines
            </Typography>
            
            <List className="space-y-4">
              {rules.map((rule, index) => (
                <Accordion key={index} className="rounded-lg mb-3 shadow-sm">
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    className="bg-gray-50 hover:bg-gray-100 rounded-t-lg"
                  >
                    <Box className="flex items-center gap-3">
                      <Box className="text-blue-500">
                        {rule.icon}
                      </Box>
                      <Typography variant="h6" className="font-semibold">
                        {rule.title}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails className="bg-white rounded-b-lg">
                    <Typography variant="body1">
                      {rule.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <Box className="text-center">
              <ContactSupport className="text-4xl text-green-600 mb-4" />
              <Typography variant="h5" className="mb-2 font-semibold">
                Need Help?
              </Typography>
              <Typography variant="body1" className="mb-4 text-gray-600">
                Our support team is here to assist you with any questions or concerns
              </Typography>
              
              <Grid container spacing={2} className="mt-6">
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" className="p-4 rounded-xl text-center h-full">
                    <Email className="text-blue-500 text-3xl mb-2" />
                    <Typography variant="h6" className="font-semibold">
                      Email Support
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      support@waste2wealth.com
                    </Typography>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" className="p-4 rounded-xl text-center h-full">
                    <Phone className="text-green-500 text-3xl mb-2" />
                    <Typography variant="h6" className="font-semibold">
                      Phone Support
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      +1 (555) 123-HELP
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              <Box className="mt-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <Typography variant="body2" className="flex items-start gap-2">
                  <Warning className="text-amber-500 mt-0.5" />
                  For urgent issues, please contact us directly through phone support for immediate assistance.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-6 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              <Info color="primary" /> Quick Tips
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-0.5" />
                  <Typography variant="body2">
                    Always keep your account information updated
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-0.5" />
                  <Typography variant="body2">
                    Review pickup details before submission
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-0.5" />
                  <Typography variant="body2">
                    Report any suspicious activity immediately
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-0.5" />
                  <Typography variant="body2">
                    Check for rule updates monthly
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Support;