import Navbar from './Navbar'
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";

import { ToastContainer, toast } from 'react-toastify'

function Dashboard() {
    const navigate = useNavigate()
    const access = localStorage.getItem('access_token');

    useEffect(() => {
        if(access === "0"){
            navigate('/profile');
        }
    })


    return (
    <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between mt-20 w-[calc(100%-16rem)]">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-8/12 ">
                        <div class="px-3 py-4 flex justify-center">
                            <h1>Chart</h1>
                        </div>
                    </div>         
                </div><ToastContainer position="top-left" />
            </div>
        </div>
        </>
    );
}
export default Dashboard