import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/UserDashboard";
import GuardianDashboard from "./pages/GuardianDashboard";

import LiveTracking from "./pages/LiveTracking";
import SOS from "./pages/SOS";
import Settings from "./pages/Settings";
import EmergencyContacts from "./pages/EmergencyContacts";

import AlertHistory from "./pages/AlertHistory";
import TeenProfile from "./pages/TeenProfile";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/guardian/dashboard" element={<GuardianDashboard />} />

        <Route path="/track" element={<LiveTracking />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/emergency" element={<EmergencyContacts />} />

        <Route path="/history" element={<AlertHistory />} />
        <Route path="/profile" element={<TeenProfile />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}
