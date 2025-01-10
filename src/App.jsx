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
import ComplaintsDetailsPage from "./Pages/admin/components/complaints/pages/complaint_details_page/index.jsx";
import TechniciansDetailsPage from "./Pages/admin/components/technicians/pages/technician_details_page/index.jsx";
import ClientDetailsPage from "./Pages/admin/components/clients/pages/index.jsx";
import AddCustomer from "./Pages/AddCustomer/AddCustomer.jsx";
import AddEngineer from "./Pages/AddEngineer/AddEngineer.jsx";
import AddProject from "./Pages/admin/components/projects/pages/add_project/index.jsx";
import ProjectsDetailsPage from "./Pages/admin/components/projects/pages/project_details_page/index.jsx";
import AddWarranty from "./Pages/admin/components/warranty/pages/add_warranty/index.jsx";
import AddAmc from "./Pages/admin/components/amc/pages/add_amc/index.jsx";
import WarrantyDetails from "./Pages/admin/components/warranty/pages/warranty_details/index.jsx";

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
          <Route path="customers/:id" element={<ClientDetailsPage />} />
          <Route path="customers/create" element={<AddCustomer />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="complaints/:id" element={<ComplaintsDetailsPage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectsDetailsPage />} />
          <Route path="projects/create" element={<AddProject />} />
          <Route path="technicians" element={<Technicians />} />
          <Route path="technicians/create" element={<AddEngineer />} />
          <Route path="technicians/:id" element={<TechniciansDetailsPage />} />
          <Route path="warranty" element={<Warranty />} />
          <Route path="warranty/create" element={<AddWarranty />} />
          <Route path="warranty/:id" element={<WarrantyDetails />} />
          <Route path="amc" element={<Amc />} />
          <Route path="amc/create" element={<AddAmc />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
