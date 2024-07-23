import React, {useEffect, useState} from 'react'
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { baseurl } from '../Baseurl/baseurl';

import Sideba from './Sideba'
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
const options = ['الملف الشخصي', 'تسجيل الخروج'];
const ITEM_HEIGHT = 48;

function Navbar() {
    const username = localStorage.getItem('username');

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogoutClick = async () => {
        // await axios.get(baseurl + 'logout',{
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // });
        // toast.success('تم تسجيل الخروج بنجاح');
        // localStorage.removeItem('token');
        // localStorage.removeItem('username');
        // localStorage.removeItem('role');
        // setAnchorEl(null);
        navigate('/');
    };
    const handleProfileClick = () => {
        setAnchorEl(null);
        navigate('/Profile');
    };

    return (
        <>
            <Sideba/>
            <nav
                class="flex  inset-x-0 top-0 flex justify-between  pt-4 pb-2 items-center sticky backdrop-blur-md border-2 border-b-stone-700 bg-white/30">
                <ul class="md:flex space-x-0 mx-8">
                    <li>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            style={{color: '#c88903'}}
                        >
                            <ArrowDropDownIcon/>
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {maxHeight: ITEM_HEIGHT * 4.5, width: '20ch',},
                                }}
                        >
                            {options.map((option) => (<MenuItem
                                key={option}
                                onClick={option === 'الملف الشخصي' ? handleProfileClick : handleLogoutClick}
                            >
                                {option}
                                {option === 'الملف الشخصي' && <ManageAccountsIcon className={'ml-3'}/>}
                                {option === 'تسجيل الخروج' && <LogoutIcon className={'ml-4'}/>}
                            </MenuItem>))}
                        </Menu>
                    </li>
                    <li>
                        <details class="group">
                            <summary
                                class="flex items-center justify-between gap-2 py-2 font-medium marker:content-none hover:cursor-pointer">
                                  <span class="flex gap-2">
                                    <PersonIcon/>
                                      {username && (<span className='font-bold'>
                                        {username}

                                    </span>)} test
                                  </span>
                            </summary>
                        </details>
                    </li>
                    <li href="/dashboard" className="px-4 py-2 flex-row space-x-4   ">
                        <Link to="/chats" aria-expanded="false">
                            <div className="relative inline-flex">
                                {/*<span className="ml-2 text-sm font-medium mr-4 ">الرسائل</span>*/}
                                <MessageIcon />
                                <span className="animate-ping absolute inline-flex h-2 w-2 bg-red-500 rounded-full top-0 right-0"></span>
                                <span className="absolute inline-flex h-2 w-2 rounded-full bottom-0 right-0 text-xs text-black">123</span>
                            </div>
                        </Link>
                    </li>
                </ul>
                <p class="text-black text-3xl font-bold ml-auto pr-4" style={{fonSize: "30px"}}>منظومة وزارة</p>
            </nav>
        </>
    );

}

export default Navbar;