import logo from './logo.svg';
import './App.css';
import './index.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";

import{
  Dashboard,
  Login,
  Profile,
  User,
  TEST,
  Sign_up,
 
  Showprofile
}from './page'
// import PrivateRoute from './PrivateRoute';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />


        <Route path='/Signup' element={<Sign_up/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/showprofile/:id" element={<Showprofile />} />
          <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
