import AccountAllPage from "@/features/account/AllPage";
import AccountCreatePage from "@/features/account/CreatePage";
import HostAllPage from "@/features/host/AllPage";
import HostCreatePage from "@/features/host/CreatePage";
import HostDetailPage from "@/features/host/DetailPage";
import HostEditPage from "@/features/host/EditPage";
import MStudioAllPage from "@/features/management/studio_management/AllPage";
import MStudioCreatePage from "@/features/management/studio_management/CreatePage";
import MStudioEditPage from "@/features/management/studio_management/EditPage";
import MUserAllPage from "@/features/management/user_management/AllPage";
import MUserCreatePage from "@/features/management/user_management/CreatePage";
import MUserEditPage from "@/features/management/user_management/EditPage";
import { Route } from "react-router-dom";

export const masterRoutes = (
    <>
        {/* Host */}
        <Route path="/management/host" element={<HostAllPage />} />
        <Route path="/management/host/create" element={<HostCreatePage />} />
        <Route path="/management/host/:id" element={<HostDetailPage />} />
        <Route path="/management/host/edit/:id" element={<HostEditPage />} />

        {/* Account */}
        <Route path="/management/account" element={<AccountAllPage />} />
        <Route path="/management/account/create" element={<AccountCreatePage />} />

        {/* User */}
        <Route path="/management/user" element={<MUserAllPage />} />
        <Route path="/management/user/create" element={<MUserCreatePage />}/>
        <Route path="/management/user/edit/:id" element={<MUserEditPage />}/>

         {/* Studio */}
        <Route path="/management/studio" element={<MStudioAllPage />} />
        <Route path="/management/studio/create" element={<MStudioCreatePage />} />
        <Route path="/management/studio/edit/:id" element={<MStudioEditPage />} />
    </>
);
