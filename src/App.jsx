import { HashRouter, BrowserRouter, MemoryRouter } from "react-router-dom";
import AppRoutes from "@/routes/routes";

const isElectron = window && window.process && window.process.type;

function App() {
  const Router = isElectron ? MemoryRouter : BrowserRouter;

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
