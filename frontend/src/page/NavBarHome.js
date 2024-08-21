//import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
function NavBarHome() {
    // const [activePath, setActivePath] = useState(window.location.pathname);
    // const navigate = useNavigate();

    return (
        <>
        <nav
            className="flex inset-x-0 top-0 justify-between absolute pt-4 pb-5 items-center  backdrop-blur-md border-b-stone-700 bg-[#5f4a24]">
            <ul className="md:flex space-x-0 mx-8 md:space-x-4 text-white">
                <li>
                    <Link to={"/login"}>
                        <a href="/login" className="hover:border-b-4 hover:border-b-amber-600 font-bold">تسجيل دخول</a>
                    </Link>
                </li>
                <li>
                    <Link to={"/contact-us"}>
                        <a href="/contact-us" className=" hover:border-b-4 hover:border-b-amber-600 font-bold">تواصل معنا</a>
                    </Link>
                </li>
                <li>
                    <Link to={"/gallery"}>
                        <a href="/gallery" className=" hover:border-b-4 hover:border-b-amber-600 font-bold">معرض الصور</a>
                    </Link>
                </li>
                <li>
                    <Link to={"/entities"}>
                        <a href="/entities" className=" hover:border-b-4 hover:border-b-amber-600 font-bold">مراكز والجهات</a>
                    </Link>
                </li>
            </ul>

            <Link to={"/"}>
                <p className="text-white text-3xl font-bold ml-auto pr-4" style={{fonSize: "30px"}}>الوزارة الشؤون الإجتماعية</p>
            </Link>
        </nav>
        </>
    );
}
export default NavBarHome