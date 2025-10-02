import FinanceDailyReportPage from "@/pages/finance/pages/daily-report-page";
import TransactionProductPage from "@/pages/product/TransactionProductPage";
import { Route } from "react-router-dom";

export const productRoutes = (
  <>
    <Route path="/transaksi/keuangan" element={<FinanceDailyReportPage />} />
    <Route path="/transaksi/produk" element={<TransactionProductPage />} />
  </>
);
