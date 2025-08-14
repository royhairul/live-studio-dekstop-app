
import HostScheduleCreatePage from "@/pages/host/schedule/CreateSchedulePage";
import HostScheduleEditPage from "@/pages/host/schedule/EditSchedulePage";
import ShiftAllPage from "@/pages/host/schedule/shift-management/AllPage";
import ShiftCreatePage from "@/pages/host/schedule/shift-management/CreatePage";
import ShiftEditPage from "@/pages/host/schedule/shift-management/EditPage";
import HostScheduleSwitchPage from "@/pages/host/schedule/SwitchSchedulePage";
import MRoleAllPage from "@/pages/management/role_management/AllPage";
import MRoleCreatePage from "@/pages/management/role_management/CreatePage";
import MRoleEditPage from "@/pages/management/role_management/EditPage";
import HostSchedulePage from "@/pages/schedule/pages/SchedulePage";
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
