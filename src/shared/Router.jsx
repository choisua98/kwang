import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/common/layout/Layout';
import Home from '../pages/kwangPage/Home';
import Login from '../pages/kwangPage/Login';
import Signup from '../pages/kwangPage/Signup';
import Main from '../pages/customerPage/Main';
import Admin from '../pages/adminPage/Admin';
import AdminChallenge from '../pages/adminPage/AdminChallenge';
import AdminMailing from '../pages/adminPage/AdminMailing';
import AdminReservation from '../pages/adminPage/AdminReservation';
import AdminFaq from '../pages/adminPage/AdminFaq';
import AdminBannerImage from '../pages/adminPage/AdminBannerImage';
import AdminFanLetter from '../pages/adminPage/AdminFanLetter';
import AdminData from '../pages/adminPage/AdminData';

import CustomerChallenge from '../pages/customerPage/CustomerChallenge';
import CustomerMailing from '../pages/customerPage/CustomerMailing';
import CustomerReservation from '../pages/customerPage/CustomerReservation';
import CustomerFaq from '../pages/customerPage/CustomerFaq';
import CustomerFanletter from '../pages/customerPage/CustomerFanletter';
import CustomerChallengeVerify from '../pages/customerPage/CustomerChallengeVerify';
import AddLink from '../components/adminSide/options/adminBlocks/AddLink';
import NotFound from '../pages/kwangPage/NotFound';
import LoadingPage from '../pages/kwangPage/LoadingPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/:uid" element={<Admin />} />
          <Route path="/admindata" element={<AdminData />} />
          <Route path="/admin/challenge" element={<AdminChallenge />} />
          <Route path="/admin/mailing" element={<AdminMailing />} />
          <Route path="/admin/reservation" element={<AdminReservation />} />
          <Route path="/admin/faq" element={<AdminFaq />} />
          <Route path="/admin/bannerimage" element={<AdminBannerImage />} />
          <Route path="/admin/fanletter" element={<AdminFanLetter />} />
          <Route path="/admin/addlink" element={<AddLink />} />
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
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
