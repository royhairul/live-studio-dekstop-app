
import HostScheduleCreatePage from "@/features/host/schedule/CreateSchedulePage";
import HostScheduleEditPage from "@/features/host/schedule/EditSchedulePage";
import ShiftAllPage from "@/features/host/schedule/shift-management/AllPage";
import ShiftCreatePage from "@/features/host/schedule/shift-management/CreatePage";
import ShiftEditPage from "@/features/host/schedule/shift-management/EditPage";
import HostScheduleSwitchPage from "@/features/host/schedule/SwitchSchedulePage";
import MRoleAllPage from "@/features/management/role_management/AllPage";
import MRoleCreatePage from "@/features/management/role_management/CreatePage";
import MRoleEditPage from "@/features/management/role_management/EditPage";
import HostSchedulePage from "@/features/schedule/pages/SchedulePage";
import { Route } from "react-router-dom";

export const settingRoutes = (
    <>
        {/* Setting ~ Role Management */}
        <Route path="/setting/role" element={<MRoleAllPage />} />
        <Route path="/setting/role/create" element={<MRoleCreatePage />} />
        <Route path="/setting/role/edit/:id" element={<MRoleEditPage />} />

        {/* Host Schedule */}
        <Route path="/setting/schedule" element={<HostSchedulePage />} />
        <Route path="/setting/schedule/create" element={<HostScheduleCreatePage />} />
        <Route path="/setting/schedule/edit/:id" element={<HostScheduleEditPage />} />
        <Route path="/setting/schedule/switch" element={<HostScheduleSwitchPage />} />

        {/* Host Shift Management */}
        <Route path="/setting/shift" element={<ShiftAllPage />} />
        <Route path="/setting/shift/create" element={<ShiftCreatePage />} />
        <Route path="/setting/shift/edit/:id" element={<ShiftEditPage />} />
    </>
);
