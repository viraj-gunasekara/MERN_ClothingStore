import {
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { deepPurple } from "@mui/material/colors";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <EditCalendarIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <PersonSearchIcon /> },
  {
    name: "Add Product",
    path: "/admin/product/create",
    icon: <AddToPhotosIcon />,
  },
];

const AdminPanel = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = React.useState(false);
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {isLargeScreen && <Toolbar />}
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider />

        <ListItem disablePadding>
          <ListItemButton>
            <Avatar
              className="text-white"
              sx={{
                bgcolor: deepPurple[500],
                color: "white",
                cursor: "pointer",
              }}
            >
              V
            </Avatar>
            <ListItemText className="ml-5" primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display: `${isLargeScreen ? "flex" : "block"}` }}>
        <CssBaseline />

        <Drawer variant="permanent">{drawer}</Drawer>
      </Box>
    </div>
  );
};

export default AdminPanel;
