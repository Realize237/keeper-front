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
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Cards from "./pages/Cards";
import SharedPlan from "./pages/SharedPlan";
import Profile from "./pages/Profile";
import NavLayout from "./layouts/NavLayout";

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
                element={
                  <ProtectedRoute>
                    <NavLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/shared-plan" element={<SharedPlan />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<NotificationsPage />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </UserProvider>
    </CookiesProvider>
  );
}
