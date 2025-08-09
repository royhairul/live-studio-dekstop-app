import FinanceCommissionReportPage from "@/pages/finance/pages/commission-report-page";
import FinanceDailyReportPage from "@/pages/finance/pages/daily-report-page";
import ComissionDailyPage from "@/pages/report/comission-daily-page";
import ComissionDailyDetailPage from "@/pages/report/comission-detail-page";
import { Route } from "react-router-dom";

export const financeRoutes = (
  <>
    <Route path="/finance/daily-report" element={<FinanceDailyReportPage />} />
    <Route path="/finance/commission-report" element={<FinanceCommissionReportPage />} />
    <Route path="/finance/result-report" element={<ComissionDailyPage />} />
    <Route path="/finance/result-report-detail" element={<ComissionDailyDetailPage />} />

  </>
);
