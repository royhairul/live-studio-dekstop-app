import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/auth/pages/login-page";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import HostAllPage from "@/pages/host/AllPage";
import HostCreatePage from "@/pages/host/CreatePage";
import AccountAllPage from "@/pages/account/AllPage";
import AccountCreatePage from "@/pages/account/CreatePage";
import FinanceDailyReportPage from "@/pages/finance/pages/daily-report-page";
import HostSchedulePage from "@/pages/host/SchedulePage";
import BankProductPage from "@/pages/riset/BankProductPage";
import RisetProductPage from "@/pages/riset/ProductPage";
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
import { financeRoutes } from "./finance.route";
import { liveRoutes } from "./live.route";

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

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Host */}
        <Route path="/host/all" element={<HostAllPage />} />
        <Route path="/host/create" element={<HostCreatePage />} />
        <Route path="/host/:id/detail" element={<HostDetailPage />} />
        <Route path="/host/:id/edit" element={<HostEditPage />} />
        <Route path="/host/schedule" element={<HostSchedulePage />} />

        {/* Host Schedule */}
        <Route
          path="/host/schedule/create"
          element={<HostScheduleCreatePage />}
        />
        <Route
          path="/host/schedule/:id/edit"
          element={<HostScheduleEditPage />}
        />
        <Route
          path="/host/schedule/switch"
          element={<HostScheduleSwitchPage />}
        />

        {/* Host Shift Management */}
        <Route
          path="/host/schedule/shift-management/all"
          element={<ShiftAllPage />}
        />
        <Route
          path="/host/schedule/shift-management/create"
          element={<ShiftCreatePage />}
        />
        <Route
          path="/host/schedule/shift-management/:id/edit"
          element={<ShiftEditPage />}
        />

        {/* Host Attendance */}
        <Route path="/host/attendance/all" element={<HostAttendancePage />} />

        {/* Route AKUN */}
        <Route path="/account/all" element={<AccountAllPage />} />
        <Route path="/account/create" element={<AccountCreatePage />} />

        {/* Router RISET */}
        {/* <Route path="/riset/product" element={<RisetProductPage />} />
        <Route path="/riset/finance" element={<FinanceDailyReportPage />} />
        <Route path="/riset/bank-produk" element={<BankProductPage />} /> */}

        {/* Setting ~ User Management */}
        <Route path="/setting/user-management" element={<MUserAllPage />} />
        <Route
          path="/setting/user-management/create"
          element={<MUserCreatePage />}
        />
        <Route
          path="/setting/user-management/:id/edit"
          element={<MUserEditPage />}
        />

        {/* Setting ~ Studio Management */}
        <Route path="/setting/studio-management" element={<MStudioAllPage />} />
        <Route
          path="/setting/studio-management/create"
          element={<MStudioCreatePage />}
        />
        <Route
          path="/setting/studio-management/:id/edit"
          element={<MStudioEditPage />}
        />

        {/* Setting ~ Role Management */}
        <Route path="/setting/role-management" element={<MRoleAllPage />} />
        <Route
          path="/setting/role-management/create"
          element={<MRoleCreatePage />}
        />
        <Route
          path="/setting/role-management/:id/edit"
          element={<MRoleEditPage />}
        />

        {financeRoutes}
        {liveRoutes}
      </Route>
    </Routes>
  );
}
