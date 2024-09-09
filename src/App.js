import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/AuthPages/LoginPage/LoginPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import AddCustomer from './Pages/AddCustomer/AddCustomer';
import AddEngineer from './Pages/AddEngineer/AddEngineer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/addCustomer" element={<AddCustomer/>} />
        <Route path="/dashboard/addEngineer" element={<AddEngineer/>} />


      </Routes>
    </Router>
  );
}

export default App;
