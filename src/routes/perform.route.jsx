import HostDetailPerformPage from "@/features/perform/host/detail-page";
import HostPerformPage from "@/features/perform/host/host-perform-page";
import { Route } from "react-router-dom";
import AccountPerformPage from "@/features/perform/account/account-perform-page";
import StudioPerformPage from "@/features/perform/studio/pages/studio-perform-page";
import StudioPerformDetailPage from "@/features/perform/studio/pages/detail-page";
import TargetPage from "@/features/perform/target/pages/target-page";

export const performRoutes = (
  <>
    <Route path="/perform/studio" element={<StudioPerformPage />} />
    <Route path="/perform/studio/detail/:id" element={<StudioPerformDetailPage />} />
    <Route path="/perform/host" element={<HostPerformPage />} />
    <Route path="/perform/host/detail/:id" element={<HostDetailPerformPage />} />
    <Route path="/perform/account" element={<AccountPerformPage />} />
    <Route path="/perform/target" element={<TargetPage />} />
  </>
);
