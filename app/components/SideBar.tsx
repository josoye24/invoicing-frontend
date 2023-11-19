"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import {
  AppBar,
  Box,
  List,
  CssBaseline,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

const MenuItems = [
  {
    name: "Invoice",
    icon: HomeOutlinedIcon,
    path: "/invoice",
    alt: "icon",
  },
  {
    name: "Create Invoice",
    icon: ReceiptIcon,
    path: "/invoice/create",
    alt: "icon",
  },
];

const drawerWidth = 225;

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const activeRoute = (routeName: string, currentRoute: any) => {
    return routeName === currentRoute ? true : false;
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List sx={{ pt: 10 }}>
          {MenuItems.map((item, index) => (
            <Link
              href={item.path}
              style={{ textDecoration: "none" }}
              key={index}
            >
              <MenuItem selected={activeRoute(item.path, pathname)}>
                <ListItem key={index}>
                  <ListItemIcon
                    sx={{
                      color:
                        pathname === item.path
                          ? "primary.dark"
                          : "secondary.main",
                    }}
                  >
                    {" "}
                    <item.icon />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: pathname === item.path ? "700" : "500",
                      color: pathname === item.path ? "primary.dark" : "",
                    }}
                    sx={{ color: "secondary.main" }}
                  />
                </ListItem>
              </MenuItem>
            </Link>
          ))}
          <MenuItem onClick={handleLogout}>
            <ListItem>
              <ListItemIcon sx={{ color: "secondary.main" }}>
                {" "}
                <LogoutIcon />{" "}
              </ListItemIcon>
              <ListItemText
                primary={"Logout"}
                primaryTypographyProps={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                sx={{ color: "secondary.main" }}
              />
            </ListItem>
          </MenuItem>
        </List>
      </Drawer>
    </Box>
  );
};
export default SideBar;
