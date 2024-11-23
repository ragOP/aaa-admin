import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Admin from "./Pages/admin/index.jsx";
import Dashboard from "./Pages/admin/components/dashboard/index.jsx";
import Clients from "./Pages/admin/components/clients/index.jsx";
import Complaints from "./Pages/admin/components/complaints/index.jsx";
import LoginPage from "./Pages/AuthPages/LoginPage/LoginPage.jsx";
import Projects from "./Pages/admin/components/projects/index.jsx";
import Technicians from "./Pages/admin/components/technicians/index.jsx";
import Warranty from "./Pages/admin/components/warranty/index.jsx";
import Amc from "./Pages/admin/components/amc/index.jsx";
import Reports from "./Pages/admin/components/reports/index.jsx";
import ProtectedRoute from "./components/routes_wrapper/ProtectedRoute.jsx";
import PublicRoute from "./components/routes_wrapper/PublicRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<Clients />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="projects" element={<Projects />} />
          <Route path="technicians" element={<Technicians />} />
          <Route path="warranty" element={<Warranty />} />
          <Route path="amc" element={<Amc />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
