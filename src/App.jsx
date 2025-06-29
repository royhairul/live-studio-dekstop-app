import { HashRouter } from "react-router-dom";
import AppRouter from "@/routes/app.route";
import { AuthProvider } from "./auth/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const queryCilent = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryCilent}>
      <AuthProvider>
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
