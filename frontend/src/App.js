// import logo from './logo.svg';
import './App.css';
import './index.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {baseurl} from "./Baseurl/baseurl";

import{
  Dashboard,
  Login,
  ShowOfficeH,
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

  const [office, setOffice] = useState([]);
  async function getoffice(){
    const response = await axios.get(baseurl+'getshow');
    if (response.data.error) {
      return
    }
    setOffice(response.data)
  }
  useEffect(()=>{
    getoffice()
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home office={office} />} />
        <Route path="/entities" element={<Entities office={office}/>} />
        <Route path="/gallery" element={<Gallery office={office} />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact-us" element={<ContactUs office={office} />} />
        <Route path="/login" element={<Login office={office} />} />
        <Route path='/Signup' element={<Sign_up/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/showprofile/:id" element={<Showprofile />} />
        <Route path="/user" element={<User />} />
        <Route path="/office" element={<Office />} />
        <Route path="/office/:id" element={<ShowOfficeH office={office} />} />
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
