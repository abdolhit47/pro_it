import Navbar from "./Navbar";
import React, {useState} from "react";
import AddOffice from "../component/addOffice";
function ShowOffice() {

    return (
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100%-16rem)] mt-20">
                    <div class="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-3/4 h-auto">
                        <div class="p-4 px-5 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 class="text-3xl text-gray-900 text-right">اسم الجهة/المركز</h1>
                        </div>
                        <div class="px-6 py-4" dir={'rtl'}>
                            <p className={"mr-4"}>وصف/معلومات عن الجهة:</p>

                            <div className={"px-6 py-4 flex flex-wrap gap-4 justify-center overflow-y-auto h-auto max-h-96 max-w-full "} dir={'rtl'}>
                                <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                    <input type={'radio'} id={"test"} name={"city"}/>
                                    <label htmlFor={"test"} className={'mr-2'}>المدينة</label>
                                </span>
                                <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                    <input type={'radio'} id={"test"} name={"city"}/>
                                    <label htmlFor={"test"} className={'mr-2'}>المدينة</label>
                                </span>
                                <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                    <input type={'radio'} id={"test"} name={"city"}/>
                                    <label htmlFor={"test"} className={'mr-2'}>المدينة</label>
                                </span>
                                <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                    <input type={'radio'} id={"test"} name={"city"}/>
                                    <label htmlFor={"test"} className={'mr-2'}>المدينة</label>
                                </span>
                            </div>

                            <div className=" mt-10">
                                <h1 className="text-2xl text-gray-900 text-right">الخدمات</h1>
                            </div>

                            <div className={"overflow-y-auto h-auto max-h-96"}>
                                <ol className="list-inside list-decimal   m-2">

                                    <li className={"mr-3 inline-block  relative "}>
                                        <input type={'radio'} id={"test"} name={"test"}/>
                                        <label htmlFor={"test"} className={'mr-2'}>Now this is a story all about how, my life got flipped-turned upside down</label>
                                    </li>

                                    <li className={"mr-3 inline-block relative "}>
                                        <input type={'radio'} id={"test2"} name={"test"}/>
                                        <label htmlFor={"test2"} className={'mr-2'}>Now this is a story all about how, my life got flipped-turned upside down</label>
                                    </li>

                                </ol>

                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"  >طلب الخدمة</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default ShowOffice