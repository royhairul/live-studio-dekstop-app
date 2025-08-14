import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/auth/pages/login-page";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import HostAllPage from "@/pages/host/AllPage";
import HostCreatePage from "@/pages/host/CreatePage";
import AccountAllPage from "@/pages/account/AllPage";
import AccountCreatePage from "@/pages/account/CreatePage";
import HostSchedulePage from "@/pages/schedule/pages/SchedulePage";
import ForgotPasswordPage from "@/pages/auth/pages/forgot-password-page";
import VerifyTokenPage from "@/pages/auth/pages/verify-otp-page";
import ResetPasswordPage from "@/pages/auth/pages/reset-password-page";
import MStudioAllPage from "@/pages/management/studio_management/AllPage";
import MStudioCreatePage from "@/pages/management/studio_management/CreatePage";
import MStudioEditPage from "@/pages/management/studio_management/EditPage";
import HostEditPage from "@/pages/host/EditPage";
import MUserCreatePage from "@/pages/management/user_management/CreatePage";
import MUserAllPage from "@/pages/management/user_management/AllPage";
import ShiftAllPage from "@/pages/host/schedule/shift-management/AllPage";
import ShiftCreatePage from "@/pages/host/schedule/shift-management/CreatePage";
import HostScheduleCreatePage from "@/pages/host/schedule/CreateSchedulePage";
import HostScheduleEditPage from "@/pages/host/schedule/EditSchedulePage";
import HostScheduleSwitchPage from "@/pages/host/schedule/SwitchSchedulePage";
import MUserEditPage from "@/pages/management/user_management/EditPage";
import MRoleEditPage from "@/pages/management/role_management/EditPage";
import MRoleCreatePage from "@/pages/management/role_management/CreatePage";
import MRoleAllPage from "@/pages/management/role_management/AllPage";
import HostAttendancePage from "@/pages/host/attendance/AllPage";
import HostDetailPage from "@/pages/host/DetailPage";
import ShiftEditPage from "@/pages/host/schedule/shift-management/EditPage";
import { performRoutes } from "./perform.route";
import { liveRoutes } from "./live.route";
import { productRoutes } from "./product.route";
import RegisterPage from "@/pages/auth/pages/register-page";
import HostPerformPage from "@/features/perform/host/host-perform-page";
import HostDetailPerformPage from "@/features/perform/host/detail-page";
import { settingRoutes } from "./setting.route";
import { masterRoutes } from "./master.route";

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
    </Routes>
  );
}
