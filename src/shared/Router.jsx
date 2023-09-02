import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Main from '../pages/Main';
import Admin from '../pages/Admin';
import AdminData from '../pages/AdminData';
import Layout from '../components/common/layout/Layout';
import AdminProfile from '../pages/AdminProfile';
import AdminChallenge from '../pages/AdminChallenge';
import AdminMailing from '../pages/AdminMailing';
import AdminReservation from '../pages/AdminReservation';
import AdminFaq from '../pages/AdminFaq';
import AdminBannerImage from '../pages/AdminBannerImage';
import AdminFanLetter from '../pages/AdminFanLetter';
import CustomerChallenge from '../pages/CustomerChallenge';
import CustomerMailing from '../pages/CustomerMailing';
import CustomerReservation from '../pages/CustomerReservation';
import CustomerFaq from '../pages/CustomerFaq';
import CustomerFanletter from '../pages/CustomerFanletter';
import CustomerChallengeVerify from '../pages/CustomerChallengeVerify';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admindata" element={<AdminData />} />
          <Route path="/admin/challenge" element={<AdminChallenge />} />
          <Route path="/admin/mailing" element={<AdminMailing />} />
          <Route path="/admin/reservation" element={<AdminReservation />} />
          <Route path="/admin/faq" element={<AdminFaq />} />
          <Route path="/admin/bannerimage" element={<AdminBannerImage />} />
          <Route path="/admin/fanletter" element={<AdminFanLetter />} />
          <Route path="/:uid" element={<Main />} />
          <Route path="/:uid/challenge" element={<CustomerChallenge />} />
          <Route
            path="/:uid/challenge/verify"
            element={<CustomerChallengeVerify />}
          />
          <Route path="/:uid/mailing" element={<CustomerMailing />} />
          <Route path="/:uid/reservation" element={<CustomerReservation />} />
          <Route path="/:uid/faq" element={<CustomerFaq />} />
          <Route path="/:uid/fanletter" element={<CustomerFanletter />} />
          <Route
            path="*"
            element={
              <>
                <h3>Not Found</h3>
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
