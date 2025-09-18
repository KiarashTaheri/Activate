import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import Profile from "./pages/Profile";
import Swipe from "./pages/Swipe";
import GroupVote from "./pages/GroupVote";
import Dashboard from "./pages/Dashboard";
import AuthWrapper from "./components/AuthWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,   // Layout with Navbar
    children: [
      { index: true, element: <Profile /> }, // "/" goes to Profile
      { path: "swipe", element: <Swipe /> },
      { path: "group-vote", element: <GroupVote /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "authWrapper", element: <AuthWrapper />},
    ],
  },
]);
