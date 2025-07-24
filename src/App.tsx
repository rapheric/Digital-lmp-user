import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ValidatePassword from './components/auth/ValidatePassword';
import ForgotPassword from './components/auth/ForgotPassword';
import ValidateOtp from './components/auth/ValidateOtp';
import Landing from './components/dashboard/Landing';
import Profile from './components/dashboard/user/Profile';
import Statistics from './components/dashboard/stats/Statistics';
import Team from './components/dashboard/user/Team';
import Market from './components/dashboard/marketplace/Market';
import Settings from './components/dashboard/Settings/Settings';
import Forbidden from './components/error/forbidden';
import ServiceProviderForm from './components/common/serviceProviders/serviceproviderForm';
// import VerifiedProvider from './components/dashboard/Shop/Shop';
import Shop from './components/dashboard/Shop/Shop';
// import {Myservices} from "./components/dashboard/marketplace/myservices/servicesData.tsx";
import MyServicesList from "./components/dashboard/marketplace/myservices/myservices.tsx";
// import UpDateServiceModal from './components/dashboard/marketplace/bidsForm';
// import UpDateServiceModal from './components/dashboard/marketplace/bidsForm';
// import BidsForm from './components/dashboard/marketplace/bidsForm';

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/authenticate" element={<ValidatePassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ForgotPassword />} />
        <Route path="/validateotp" element={<ValidateOtp />} />dashboard
        <Route path="/dashboard" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/users" element={<Team />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/apps" element={<Market />} />
        <Route path="/market" element={<Market />} />
        <Route path="/myservices" element={<MyServicesList />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/serviceProviderForm" element={<ServiceProviderForm />} />

        {/* <Route path="/bidsForm" element={<UpDateServiceModal />}/> */}
      </Routes>
    </Router>
  );
}
export default App;