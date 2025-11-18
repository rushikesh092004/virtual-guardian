import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Permissions from "./pages/Permissions";

import Splash from "./pages/Splash";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/UserDashboard";
import GuardianDashboard from "./pages/GuardianDashboard";
import GuardianNotifications from "./pages/GuardianNotifications";


import LiveTracking from "./pages/LiveTracking";
import LiveShare from "./pages/LiveShare";
import SOS from "./pages/SOS";
import Settings from "./pages/Settings";
import EmergencyContacts from "./pages/EmergencyContacts";
import LiveSOS from "./pages/LiveSOS";


import AlertHistory from "./pages/AlertHistory";
import TeenProfile from "./pages/TeenProfile";
import Notifications from "./pages/Notifications";

import StartJourney from "./pages/StartJourney";
import SafetyCheck from "./pages/SafetyCheck";
import AlertSent from "./pages/AlertSent";

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
        <Route path="/guardian/notifications" element={<GuardianNotifications />} />


        <Route path="/track" element={<LiveTracking />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/emergency" element={<EmergencyContacts />} />
        <Route path="/guardian/live-sos" element={<LiveSOS />} />
        <Route path="/live-share" element={<LiveShare />} />


        <Route path="/history" element={<AlertHistory />} />
        <Route path="/profile" element={<TeenProfile />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Correct journey flow */}
        <Route path="/journey" element={<StartJourney />} />
        <Route path="/safety-check" element={<SafetyCheck />} />
        <Route path="/alert-sent" element={<AlertSent />} />
        <Route path="/permissions" element={<Permissions />} />

      </Routes>
    </BrowserRouter>
  );
}
