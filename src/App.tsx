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
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Cards from "./pages/Cards";
import SharedPlan from "./pages/SharedPlan";
import Profile from "./pages/Profile";
import MobileLayout from "./layouts/MobileLayout";

export default function App() {
  return (
    <CookiesProvider>
      <UserProvider>
        <Router basename="/">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<MobileLayout />}>
                <Route
                  path="/subscriptions"
                  element={
                    <ProtectedRoute>
                      <Subscriptions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cards"
                  element={
                    <ProtectedRoute>
                      <Cards />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shared-plan"
                  element={
                    <ProtectedRoute>
                      <SharedPlan />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
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
