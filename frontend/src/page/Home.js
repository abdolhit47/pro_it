import React from "react";
import {Link, useNavigate} from 'react-router-dom'

function Home() {

    return (
        <>
            <div className="flex h-screen ">
                <div className="flex-grow bg-gray-100">
                    {/*<Navbar />*/}
                    <nav
                        className="flex inset-x-0 top-0 justify-between  pt-4 pb-5 items-center sticky backdrop-blur-md border-b-stone-700 bg-[#5f4a24]">
                        <ul className="md:flex space-x-0 mx-8 md:space-x-4 text-white">
                            <li>
                                <Link to={"/login"}>
                                    <a href="/login" className="  font-bold">تسجيل دخول</a>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/contact-us"}>
                                    <a href="/contact-us" className="  font-bold">تواصل معنا</a>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/gallery"}>
                                    <a href="/gallery" className="  font-bold">معرض الصور</a>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/entities"}>
                                    <a href="/entities" className="  font-bold">مراكز والجهات</a>
                                </Link>
                            </li>

                        </ul>
                        <p className="text-black text-3xl font-bold ml-auto pr-4" style={{fonSize: "30px"}}>الوزارة الشؤون الإجتماعية</p>
                    </nav>
                    <div className="content-center flex flex-row justify-between mt-20 w-[calc(100%-16rem)]">
                        <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-8/12">
<p>asdsadadsagfdjhagfj</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home