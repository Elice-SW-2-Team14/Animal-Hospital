import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/login/LoginLayout';
import Register from './pages/register/Register';
import UserMypage from './pages/user-mypage/UserMypage';
import UserInfo from './pages/user-info/UserInfo';
import PetInfo from './pages/pet-info/PetInfo';
import HospitalMypage from './pages/hospital-mypage/HospitalMypage';
import HospitalInfo from './pages/hospital-info/HospitalInfo';
import AdminMypage from './pages/admin-mypage/AdminMypage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={< />} />  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-mypage" element={<UserMypage />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/pet-info" element={<PetInfo />} />
        <Route path="/hospital-mypage" element={<HospitalMypage />} />
        <Route path="/hospital-info" element={<HospitalInfo />} />
        <Route path="/admin-mypage" element={<AdminMypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
