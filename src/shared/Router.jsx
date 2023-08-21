import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Main from '../pages/Main';
import Admin from '../pages/Admin';
import AdminData from '../pages/AdminData';
import Layout from '../components/layout/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:id" element={<Main />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admindata" element={<AdminData />} />
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
