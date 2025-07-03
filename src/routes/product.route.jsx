import BankProductPage from "@/pages/product/BankProductPage";
import ListProductPage from "@/pages/product/ListProductPage";
import ResearchProductPage from "@/pages/product/ReseacrhProductPage";
import TransactionProductPage from "@/pages/product/TransactionProductPage";
import { Route } from "react-router-dom";

export const productRoutes = (
  <>
    <Route path="/product/list" element={<ListProductPage />} />
    <Route path="/product/orders" element={<TransactionProductPage />} />
    <Route path="/product/research" element={<ResearchProductPage />} />
    <Route path="/product/bank" element={<BankProductPage />} />
  </>
);
