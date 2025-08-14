import FinanceCommissionReportPage from "@/pages/finance/pages/commission-report-page";
import FinanceDailyReportPage from "@/pages/finance/pages/daily-report-page";
import HostDetailPerformPage from "@/features/perform/host/detail-page";
import HostPerformPage from "@/features/perform/host/host-perform-page";
import { Route } from "react-router-dom";
import AccountPerformPage from "@/features/perform/account/account-perform-page";
import StudioPerformPage from "@/features/perform/studio/studio-perform-page";
import StudioPerformDetailPage from "@/features/perform/studio/detail-page";

export const performRoutes = (
  <>
    <Route path="/finance/daily-report" element={<FinanceDailyReportPage />} />
    <Route path="/finance/commission-report" element={<FinanceCommissionReportPage />} />
    <Route path="/perform/studio" element={<StudioPerformPage />} />
    <Route path="/perform/studio/detail" element={<StudioPerformDetailPage />} />
    <Route path="/perform/host" element={<HostPerformPage />} />
    <Route path="/perform/host/detail" element={<HostDetailPerformPage />} />
    <Route path="/perform/account" element={<AccountPerformPage />} />
  </>
);
