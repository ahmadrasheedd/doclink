import React from "react";

import { Icon, layout } from "@chakra-ui/react";
import { HamburgerIcon} from '@chakra-ui/icons'
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import SignUpCentered from "views/signup";
import MyClinic from "views/admin/myClinic";
import PatientTable from "views/admin/Patients";
import ReservationsTable from "views/admin/reservations";
import { FaUser } from "react-icons/fa";


const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Sign Up",
    layout: "/signup",
    path: "/sign-up",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignUpCentered,
  },
  {
    name: "My Clinic",
    layout: "/admin",
    path: "/myClinic",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MyClinic,

  },
  {
    name: "Clinic Patients",
    layout: "/admin",
    path: "/patients",
    icon: <Icon as={FaUser} width="20px" height="20px" color="inherit" />,
    component: PatientTable,

  },
  {
    name: "Reservations",
    layout: "/admin",
    path: "/reservations",
    icon: <Icon as={HamburgerIcon} width="20px" height="20px" color="inherit" />,
    component: ReservationsTable,

  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: RTL,
  },
];

export default routes;
