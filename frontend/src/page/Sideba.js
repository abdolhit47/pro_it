import React, { useState} from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';
// import ArchiveIcon from '@mui/icons-material/Archive';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {Link, useNavigate} from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css';
// import {Office} from "./index";
// import Service from "./Services/serivce";
function Sideba() {
  const [activePath, setActivePath] = useState(window.location.pathname);
  const navigator = useNavigate();
  const handleLinkClick = (path) => {
    setActivePath(path);
    navigator(path);
  };
  const open = useState(true);
  const [subOpen, setSubOpen] = useState(false);
  return (
      <>
          <div className=" bg-gray-50 flex flex-row-reverse text-right absolute inset-y-14 mt-10 right-7">
              <nav className="  w-64  rounded-3xl bg-yellow-600  flex flex-col justify-between text-white transition duration-150 ease-in-out">
                  <div className="grow ">
                      <div className="ounded-lg my-2">
                          <ul className="flex flex-col space-y-0 mt-5">
                              <div className={activePath === '/Dashboard' ? 'border-r-8 border-r-amber-700 rounded-r-md' : ''} onClick={() => handleLinkClick('/Dashboard')}>
                                  <li  className="px-4 py-2 flex-row space-x-4 items-center hover:bg-amber-700  cursor-pointer">
                                      <Link to="/Dashboard" aria-expanded="false" >
                                          <span className="ml-3 item-text mr-4">الصفحة الرئيسية</span>
                                          <HomeIcon/>
                                      </Link>
                                  </li>
                              </div>
                              <div className={activePath === '/Office' ? 'border-r-8 border-r-amber-700 rounded-r-md' : ''} onClick={() => handleLinkClick('/Office')}>
                                  <li className="px-4 py-2 flex-row space-x-4 items-center hover:bg-amber-700 cursor-pointer">
                                      <Link to="/Office" aria-expanded="false">
                                          <span className="ml-2 text-sm font-medium mr-4">الجهة/المركز</span>
                                          <BusinessCenterIcon/>
                                      </Link>
                                  </li>
                              </div>
                              <div className={activePath === '/Order' ? 'border-r-8 border-r-amber-700 rounded-r-md' : ''} onClick={() => handleLinkClick('/Order')}>
                                  <li className="px-4 py-2 flex-row space-x-4 items-center hover:bg-amber-700 cursor-pointer ">
                                      <Link to="/order" aria-expanded="false">
                                              <span className="ml-2 text-sm font-medium mr-4 ">طلبات</span>
                                              <SendIcon />
                                      </Link>
                                  </li>
                              </div>
                              <div className={activePath === '/Trackorder' ? 'border-r-8 border-r-amber-700 rounded-r-md' : ''} onClick={() => handleLinkClick('/Trackorder')}>
                                  <li className="px-4 py-2 flex-row space-x-4 items-center hover:bg-amber-700 cursor-pointer ">
                                      <Link to="/Trackorder" aria-expanded="false">
                                              <span className="ml-2 text-sm font-medium mr-4 ">تتبع طلبات</span>
                                              <SendIcon />
                                      </Link>
                                  </li>
                              </div>
                              <div /*className={subOpen === true ? 'border-r-8 border-r-amber-700 rounded-r-md' : ''}*/ onClick={() => setSubOpen(!subOpen)}>
                                  <li className="flex-row items-center justify-between px-4 py-2 rounded hover:bg-amber-700 ">
                                      <span className="ml-2 text-sm font-medium mr-4">إعدادات</span>
                                      <SettingsIcon className={subOpen === true ? 'animate-spin-slow' : ''}/>
                                  </li>
                              </div>
                              {open && subOpen && (<>
                                      <li className="flex-row items-center justify-between mr-6 px-4 py-2 rounded hover:bg-amber-700 ">
                                          <span className="ml-2 text-sm font-medium mr-4">تعيين الموظف</span>
                                          <PersonAddIcon/>
                                      </li>

                                      <li className="flex-row items-center justify-between mr-6 px-4 py-2 rounded hover:bg-amber-700 ">
                                          <Link to="/Service" aria-expanded="false">
                                              <span className="ml-2 text-sm font-medium mr-4">الخدمات</span>
                                              <MiscellaneousServicesIcon/>
                                          </Link>
                                      </li>
                                      {/*<li className="flex-row items-center justify-between mr-6 px-4 py-2 rounded hover:bg-amber-700 ">*/}
                                      {/*    <Link to="/archive" state={{ from: "occupation" }} aria-expanded="false">*/}
                                      {/*        <span className="ml-2 text-sm font-medium mr-4">الأرشيف الطلبات</span>*/}
                                      {/*        <ArchiveIcon/>*/}
                                      {/*    </Link>*/}
                                      {/*</li>*/}

                                      <li className={
                                          //activePath === '/Profile' ? 'border-r-8 border-r-amber-700 rounded-r-md' :
                                          'flex-row items-center justify-between mr-6 px-4 py-2 rounded hover:bg-amber-700'} onClick={() => handleLinkClick('/Profile')}>
                                          <Link to="/Profile" aria-expanded="false" >
                                              <span className="ml-2 text-sm font-medium mr-4">الملف الشخصي</span>
                                              <ManageAccountsIcon/>
                                          </Link>
                                      </li>
                                  </>
                              )}
                          </ul>
                      </div>
                  </div>
                  <div className=" flex-col mr-4 mb-10 tall:mb-5 ">
                      <Link to="/Service" aria-expanded="false">
                      <span className="ml-2 text-sm font-medium mr-2"> تسجيل الخروج </span>
                      <LogoutIcon/>
                      </Link>
                  </div>
              </nav>
          </div>
  </>
	

  );

}

export default Sideba;