import React, {useEffect, useState} from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import {Link} from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css';
function Sideba() {
  const [activePath, setActivePath] = useState(window.location.pathname);
  const handleLinkClick = (path) => {
    setActivePath(path);
  };
  return (
    <div class="flex flex-grow flex-row-reverse text-right h-auto absolute inset-y-36 right-7 w-auto ">
      <aside class="w-64 flex-shrink-0 rounded-3xl bg-yellow-600 bg-slate-800 ">
        <nav class="flex flex-col flex-grow overflow-y-auto text-white  mt-16">
          <ul class="flex flex-col space-y-2 ltr ">
            <div className={activePath === '/Dashboard' ? 'border-r-8 border-r-amber-700 rounded-r-md' : ''}  onClick={() => handleLinkClick('/Dashboard')}>
                <li class="flex-row items-center justify-between px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500">
                    <Link to="/Dashboard" aria-expanded="false" >
                        <span className="ml-3 item-text mr-4">الصفحة الرئيسية</span>
                        <HomeIcon/>
                    </Link>
                </li>
            </div>
            <div className={activePath === '/Profile' ? 'border-r-8 border-r-amber-700 rounded-r-md' : ''} onClick={() => handleLinkClick('/Profile')}>
                <li class="flex-row items-center justify-between px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500">
                <Link to="/Profile" aria-expanded="false" >
                    <span class="ml-2 text-sm font-medium mr-4">الملف الشخصي</span>
                    <PersonIcon/>
                </Link>
                </li>
            </div>
            <div className={activePath === '/User' ? 'border-r-8 border-r-amber-700 rounded-r-md' : ''} onClick={() => handleLinkClick('/User')}>
                <li className="flex-row items-center justify-between px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500">
                    <Link to="/User" aria-expanded="false">
                        <span className="ml-2 text-sm font-medium mr-4">الموظفون</span>
                        <PersonIcon/>
                    </Link>
                </li>
            </div>
            <div className={activePath === '/Modele' ? 'border-r-8 border-r-amber-700 rounded-r-md' : ''} onClick={() => handleLinkClick('/Modele')}>
                <li className="flex-row items-center justify-between px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500">
                    <Link to="/Modele" aria-expanded="false">
                        <span className="ml-2 text-sm font-medium mr-4">test</span>
                        <PersonIcon/>
                    </Link>
                </li>
            </div>
          </ul>
        </nav>
      </aside>
    </div>
  
	

  );

}

export default Sideba;