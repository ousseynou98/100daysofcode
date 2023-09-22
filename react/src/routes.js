/* eslint-disable prettier/prettier */

/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignUp from "layouts/authentication/sign-up";
import User from "layouts/user";
import AddUser from "layouts/user/add";
import EditUser from "layouts/user/edit";
import Parametrage from "layouts/parametrage";
import Permissions from "layouts/permissions";
import AddPermissions from "layouts/permissions/add";
import Client from "layouts/client";
import AddClient from "layouts/client/add";
import EditClient from "layouts/client/edit";
import UploadClients from "layouts/client/upload";
import Project from "layouts/project";
import AddProject from "layouts/project/add";
import EditProject from "layouts/project/edit";
import Task from "layouts/task";
import AddTask from "layouts/task/add";
import Product from "layouts/sales/product";
import AddProduct from "layouts/sales/addProduct";
import EditProduct from "layouts/sales/editProduct";
import Expense from "layouts/sales/expense";
import AddExpense from "layouts/sales/addExpense";
import EditExpense from "layouts/sales/editExpense";
import UploadExpenses from "layouts/sales/uploadExpense";
import SignOut from "layouts/logout";
import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Utilisateur",
    key: "user",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/user",
    component: <User />,
  },
  {
    route: "/user/add",
    component: <AddUser />,
  },
  {
    route: "/user/edit/:id",
    component: <EditUser />,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Paramétrage",
  //   key: "parametrage",
  //   icon: <Icon fontSize="small">settings</Icon>,
  //   route: "/parametrage",
  //   component: <Parametrage />,
  // },
  {
    route: "/permissions",
    component: <Permissions />,
  },
  {
    route: "/permissions/add",
    component: <AddPermissions />,
  },
  {
    type: "collapse",
    name: "Clients",
    key: "clients",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/clients",
    component: <Client />,
  },
  {
    route: "/client/add",
    component: <AddClient />,
  },
  {
    route: "/client/edit/:id",
    component: <EditClient />,
  },
  {
    route: "/client/upload",
    component: <UploadClients />,
  },
  {
    type: "collapse",
    name: "Projets",
    key: "projects",
    icon: <Icon fontSize="small">business</Icon>,
    route: "/projects",
    component: <Project />,
  },
  {
    route: "/project/add",
    component: <AddProject />,
  },
  {
    route: "/project/edit/:id",
    component: <EditProject />,
  },
  {
    type: "collapse",
    name: "Tâches",
    key: "tasks",
    icon: <Icon fontSize="small">task</Icon>,
    route: "/tasks",
    component: <Task />,
  },
  {
    route: "/task/add",
    component: <AddTask />,
  },
  {
    type: "collapse",
    name: "Ventes",
    key: "products",
    icon: <Icon fontSize="small">store</Icon>,
    route: "/products",
    component: <Product />,
  },
  {
    route: "/product/add",
    component: <AddProduct />,
  },
  {
    route: "/product/edit/:id",
    component: <EditProduct />,
  },
  {
    route: "/expenses",
    component: <Expense />,
  },
  {
    route: "/expense/add",
    component: <AddExpense />,
  },
  {
    route: "/expense/edit/:id",
    component: <EditExpense />,
  },
  {
    route: "/expense/upload",
    component: <UploadExpenses />,
  },
  {
    type: "collapse",
    name: "Déconnexion",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <SignOut />,
  },
];

export default routes;
