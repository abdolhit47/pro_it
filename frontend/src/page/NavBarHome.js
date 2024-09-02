//import React, {useState} from "react";
import {Link} from 'react-router-dom'
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
function NavBarHome({office}) {
    const navigate = useNavigate();

    const handleClick = (id, name) => {
        localStorage.setItem('selected_office_id', id);
        localStorage.setItem('selected_office_name', name);
        navigate(`/office/${id}`);
    }
    const handleHomeClick = () => {
        localStorage.setItem('selected_office_id', 1);
        localStorage.setItem('selected_office_name', "وزارة الشؤون الإجتماعية");
        navigate("/");
    }
    const handleLoginClick =(id) =>{
        const storedOfficeId = localStorage.getItem('selected_office_id');
        if (storedOfficeId) {
            navigate(`/login`);
        } else {
            localStorage.setItem('selected_office_id', 1);
            localStorage.setItem('selected_office_name', "وزارة الشؤون الإجتماعية");
            navigate("/login");
        }
    }
    return (
        <>
        <nav
            className="flex inset-x-0 top-0 justify-between absolute pt-4 pb-5 items-center  backdrop-blur-md border-b-stone-700 bg-[#5f4a24]">
            <ul className="md:flex space-x-0 mx-8 md:space-x-4 text-white">
                <li>
                    {/*<Link to={"/login"}>*/}
                        <a onClick={handleLoginClick} className="hover:border-b-4 hover:border-b-amber-600 ">تسجيل دخول</a>
                    {/*</Link>*/}
                </li>
                <li>
                    <Link to={"/contact-us"}>
                        <a href="/contact-us" className=" hover:border-b-4 hover:border-b-amber-600 ">تواصل معنا</a>
                    </Link>
                </li>
                <li>
                    <Link to={"/gallery"}>
                        <a href="/gallery" className=" hover:border-b-4 hover:border-b-amber-600 ">معرض الصور</a>
                    </Link>
                </li>
                <li>
                    <details onMouseEnter={(e) => e.currentTarget.setAttribute('open', true)}
                                         onMouseLeave={(e) => e.currentTarget.removeAttribute('open')}>

                    <summary dir={'ltr'}>
                            <span className="hover:border-b-4 hover:border-b-amber-600">مراكز والجهات</span>
                        </summary>
                        <ul className="space-y-0 absolute text-gray-800 bg-gray-300/90 rounded-md w-52 text-right max-h-40 overflow-y-auto">
                            {office.map((office, index)=>{
                                return(
                                    <li key={index}>
                                        <summary className="p-3 cursor-pointer" onClick={() => handleClick(office.id, office.name)} >
                                            {office.name}
                                        </summary>
                                    </li>
                                )
                                })
                            }
                        </ul>
                    </details>
                </li>
            </ul>

            <a onClick={handleHomeClick} dir={'rtl'} className={"text-center justify-start"}>
                <img src={require("../images/logo.png")} className={'inline w-20 h-20'}/>
                <p className="text-white text-3xl ml-auto pr-4 inline" style={{fonSize: "30px"}}>وزارة الشؤون الإجتماعية</p>
            </a>
        </nav>
        </>
    );
}
export default NavBarHome