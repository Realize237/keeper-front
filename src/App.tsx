import { CookiesProvider } from "react-cookie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Subscriptions from "./pages/Subscriptions";
import MainLayout from "./layouts/MainLayout";
import NotificationsPage from "./pages/Notifications";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <CookiesProvider>
      <UserProvider>
        <Router basename="/">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subscriptions"
                element={
                  <ProtectedRoute>
                    <Subscriptions />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </UserProvider>
    </CookiesProvider>
  );
}
