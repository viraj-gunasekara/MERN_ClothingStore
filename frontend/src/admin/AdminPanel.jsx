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
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { deepPurple } from "@mui/material/colors";

import CreateProductForm from "./componets/CreateProductForm";
import ProductsTable from "./componets/ProductsTable";
import UpdateProductForm from "./componets/UpdateProductForm";
import CustomersTable from "./componets/CustomersTable";
import AdminDashboard from "./componets/AdminDashboard";
import AdminNavbar from "./navigation/AdminNavbar";

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

  const handleSideBarViewInMobile = () => {
    setSideBarVisible(true);
  };

  const handleCloseSideBar = () => {
    setSideBarVisible(false);
  };

  const drawerVariant = isLargeScreen ? "permanent" : "temporary";

  return (
    <div>
      <Box sx={{ display: `${isLargeScreen ? "flex" : "block"}` }}>
        <CssBaseline />

        {/* Admin Navbar */}
        <AdminNavbar handleSideBarViewInMobile={handleSideBarViewInMobile} />
        {/* Admin Drawer */}
        <Drawer
        variant={drawerVariant}
        open={isLargeScreen || sideBarVisible}
          onClose={handleCloseSideBar}
        >{drawer}</Drawer>

        {/*Admin Routes */}
        <Box className="adminContainer" component="main" sx={{ flexGrow: 1, width: "100%", padding: 2, boxSizing: "border-box" }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={ <AdminDashboard />}></Route>
            <Route path="/product/create" element={<CreateProductForm/>}></Route>
            <Route path="/products" element={<ProductsTable/>}></Route>
            <Route path="/product/update/:productId" element={<UpdateProductForm/>}></Route>
            <Route path="/customers" element={<CustomersTable/>}></Route>
          </Routes>
        </Box>
      </Box>
    </div>
  );
};

export default AdminPanel;
