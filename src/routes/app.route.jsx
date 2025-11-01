import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "@/features/auth/pages/login-page";
import DashboardPage from "@/features/dashboard/DashboardPage";
import ForgotPasswordPage from "@/features/auth/pages/forgot-password-page";
import VerifyTokenPage from "@/features/auth/pages/verify-otp-page";
import ResetPasswordPage from "@/features/auth/pages/reset-password-page";
import HostAttendancePage from "@/features/host/attendance/AllPage";
import { performRoutes } from "./perform.route";
import { liveRoutes } from "./live.route";
import { productRoutes } from "./product.route";
import RegisterPage from "@/features/auth/pages/register-page";
import { settingRoutes } from "./setting.route";
import { masterRoutes } from "./master.route";
import NotFound from "@/components/not-found";

export default function AppRouter() {
  const ProtectedRoute = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyTokenPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/attendance" element={<HostAttendancePage />} /> 
        {liveRoutes}
        {performRoutes}
        {productRoutes}
        {masterRoutes}
        {settingRoutes}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
