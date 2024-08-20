// import logo from './logo.svg';
import './App.css';
import './index.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";

import{
  Dashboard,
  Login,

  User,Sign_up,Profile, Showprofile,
  Office,ShowOffice,Service,
  ShowEmployee,
  Order, ShowOrder,Trackorder,
  City,
  //Archive,
  Chats,
  Home,Entities,Gallery,News,ContactUs
}from './page'
// import PrivateRoute from './PrivateRoute';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entities" element={<Entities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path='/Signup' element={<Sign_up/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/showprofile/:id" element={<Showprofile />} />
        <Route path="/user" element={<User />} />
        <Route path="/office" element={<Office />} />
        <Route path={"/service"} element={<Service/>} />
        <Route path="/showoffice/:id" element={<ShowOffice />} />
        <Route path="/order" element={<Order />} />
        <Route path="/showorder/:id" element={<ShowOrder />} />
        <Route path="/trackorder" element={<Trackorder />} />
        {/*<Route path="/archive" element={<Archive />} />*/}
        <Route path="/chats" element={<Chats />} />
        <Route path="/showemployee" element={<ShowEmployee />} />
        <Route path="/city" element={<City />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
