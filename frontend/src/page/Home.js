import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import {Link} from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import React from "react";

function Home() {

    return (
        <>
            <div className="flex h-screen ">
                <div className="flex-grow bg-gray-100">
                    {/*<Navbar />*/}
                    <nav
                        className="flex  inset-x-0 top-0 justify-between  pt-4 pb-2 items-center sticky backdrop-blur-md border-2 border-b-stone-700 bg-white/30">
                        <ul className="md:flex space-x-0 mx-8">
                            <li>

                            </li>
                        </ul>
                        <p className="text-black text-3xl font-bold ml-auto pr-4" style={{fonSize: "30px"}}>الوزارة الشؤون الإجتماعية</p>
                    </nav>
                    <div className="content-center flex flex-row justify-between mt-20 w-[calc(100%-16rem)]">
                        <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-8/12 ">

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home