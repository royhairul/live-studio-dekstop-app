import FinanceCommissionReportPage from "@/pages/finance/pages/commission-report-page";
import FinanceDailyReportPage from "@/pages/finance/pages/daily-report-page";
import LiveGraphReportPage from "@/pages/live/GraphicPage";
import LivePreviewPage from "@/pages/live/PreviewPage";
import LiveReportPage from "@/pages/live/ReportPage";
import { Route } from "react-router-dom";

export const liveRoutes = (
  <>
    <Route path="/live/preview" element={<LivePreviewPage />} />
    <Route path="/live/report" element={<LiveReportPage />} />
    <Route path="/live/report/graph" element={<LiveGraphReportPage />} />
  </>
);
