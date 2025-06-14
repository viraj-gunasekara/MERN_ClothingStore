import { Grid, Typography, Link, Box, IconButton } from "@mui/material";
import {
  Facebook,
  Instagram,
  YouTube,
  X as XIcon,
  Pinterest,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#4a0080", color: "white", px: 10, py: 6 }}>
      <Grid container spacing={4} justifyContent="space-between">
        {/* Left Side - Logo and Description */}
        <Grid item xs={12} md={3}>
          <Box sx={{ mb: 2 }}>
            {/* Replace with your logo */}
            <Typography variant="h6" fontWeight="bold">
              <img
                alt=""
                src="https://cdn.iconscout.com/icon/premium/png-512-thumb/letter-v-5015672-4169285.png?f=webp&w=512"
                className="h-8 w-auto"
              />
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Style the Life. Fashion for Everyone.
          </Typography>
          <Box>
            {[Facebook, Instagram, Pinterest, XIcon, YouTube].map(
              (Icon, idx) => (
                <IconButton key={idx} sx={{ color: "white" }}>
                  <Icon fontSize="small" />
                </IconButton>
              )
            )}
          </Box>
        </Grid>

        {/* Right Side - Links */}
        <Grid item xs={6} md={2}>
          <Typography fontWeight="bold" gutterBottom>
            Shop
          </Typography>
          {["Men", "Women", "Kids", "Accessories", "New Arrivals"].map(
            (text, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 1 }}>
                <Link href="#" underline="none" color="inherit">
                  {text}
                </Link>
              </Typography>
            )
          )}
        </Grid>

        <Grid item xs={6} md={2}>
          <Typography fontWeight="bold" gutterBottom>
            Customer Care
          </Typography>
          {["Contact Us", "Order Tracking", "Returns & Exchanges", "FAQs"].map(
            (text, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 1 }}>
                <Link href="#" underline="none" color="inherit">
                  {text}
                </Link>
              </Typography>
            )
          )}
        </Grid>

        <Grid item xs={6} md={2}>
          <Typography fontWeight="bold" gutterBottom>
            About Us
          </Typography>
          {["Our Story", "Careers", "Store Locator"].map((text, i) => (
            <Typography key={i} variant="body2" sx={{ mb: 1 }}>
              <Link href="#" underline="none" color="inherit">
                {text}
              </Link>
            </Typography>
          ))}
        </Grid>

        <Grid item xs={6} md={2}>
          <Typography fontWeight="bold" gutterBottom>
            Legal
          </Typography>
          {["Terms of service", "Privacy policy", "License"].map((text, i) => (
            <Typography key={i} variant="body2" sx={{ mb: 1 }}>
              <Link href="#" underline="none" color="inherit">
                {text}
              </Link>
            </Typography>
          ))}
        </Grid>
      </Grid>

      {/* Divider Line */}
      <Box
        sx={{
          borderTop: "1px solid #1E293B",
          mt: 4,
          pt: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="white">
          © 2025 ViraJ's Clothing Store, All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
