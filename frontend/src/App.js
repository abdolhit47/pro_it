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
  Showprofile,
  ShowOffice,
  ShowOrder,
  Office,
    Service,
    Order,
  Archive,
  Chats
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
          <Route path="/office" element={<Office />} />
          <Route path={"/service"} element={<Service/>} />
          <Route path="/showoffice/:id" element={<ShowOffice />} />
          <Route path="/test" element={<TEST />} />
          <Route path="/order" element={<Order />} />
          <Route path="/showorder/:id" element={<ShowOrder />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/chats" element={<Chats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
