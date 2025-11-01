import FinanceDailyReportPage from "@/features/transaction/daily-report-page";
import TransactionProductPage from "@/features/transaction/TransactionProductPage";
import { Route } from "react-router-dom";

export const productRoutes = (
  <>
    <Route path="/transaksi/keuangan" element={<FinanceDailyReportPage />} />
    <Route path="/transaksi/produk" element={<TransactionProductPage />} />
  </>
);
