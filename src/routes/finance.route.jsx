import FinanceCommissionReportPage from "@/pages/finance/pages/commission-report-page";
import FinanceDailyReportPage from "@/pages/finance/pages/daily-report-page";
import { Route } from "react-router-dom";

export const financeRoutes = (
  <>
    <Route path="/finance/daily-report" element={<FinanceDailyReportPage />} />
    <Route
      path="/finance/commission-report"
      element={<FinanceCommissionReportPage />}
    />
  </>
);
