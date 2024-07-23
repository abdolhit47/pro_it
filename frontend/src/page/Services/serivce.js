import Navbar from "../Navbar";
import React, {useState} from "react";
import AddService from "../../component/addService";
function Service() {
    const [Model, setModel] = useState([]);
    const [addService, setaddService] = useState(false);
    const id = 123;
    const handleshow = ()=>{
        setaddService(true)
    }
    return (
        <>
        <div className="flex h-screen">
            <div className="flex-grow bg-gray-100 h-lvh">
                <Navbar />
                <div className="flex flex-grow flex-row-reverse text-right inset-y-14 h-auto max-h-screen md:max-w-[calc(100%-16rem)] mt-20">
                    <div class="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-3/4  ">
                        <div className="p-4 px-10 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 className="text-2xl text-gray-900 text-right">الخدمات</h1>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleshow}>اضافة الخدمة</button>
                        </div>
                        {/*<div class="px-6 py-4 flex justify-center ">*/}
                            {/*<div className='w-16 text-md bg-white shadow-md rounded mb-4 table-fixed max-w-3xl'>*/}
                            {/*    <p>asdashfdhjgasdhaf kjdshfdjskhfgkjshdfksdhf skdjhgfjhsdafdskjfhkj</p>*/}
                            {/*</div>*/}
                        {/*<div className=" gap-8 m-7 w-auto max-h-screen " dir={"rtl"}>*/}
                        {/*    <div className=" bg-amber-500 rounded-3xl h-[30rem] md:h-[32rem] px-3">*/}
                                <div className={"px-6 py-4 flex flex-wrap gap-4 justify-center overflow-y-auto h-auto max-h-96 max-w-full "} dir={'rtl'}>
                                    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                        Computer Science Engineering
                                    </span>
                                    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                        Mechanical Engineering
                                    </span>
                                    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                        Civil Engineering
                                    </span>
                                    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                    sdsd
                                    </span>
                                    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                    sdsd
                                    </span>
                                    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">
                                    sdsd
                                    </span>

                                </div>
                            {/*</div>*/}
                            {/*<div className="row-span-1 bg-blue-500 rounded-3xl h-[15rem] md:h-[15rem]">*/}
                            {/*    <div className="p-2 px-10 flex content-center justify-between border-b-2 border-amber-700 mt-2" dir="rtl">*/}
                            {/*        <h1 className="text-2xl text-gray-900 text-right">الطلبات</h1>*/}
                            {/*    </div>*/}
                            {/*    <div className={"overflow-y-auto h-auto max-h-36 m-1"}>*/}
                            {/*        <ul role={"list"} className="divide-y divide-gray-100 px-3">*/}
                            {/*            <li className="flex justify-between gap-x-6 py-5">*/}
                            {/*                <div className={"flex min-w-0 gap-x-4"}>*/}
                            {/*                    <div className="min-w-0 flex-auto">*/}
                            {/*                        <p className="text-sm font-semibold leading-6 text-gray-900">Name</p>*/}
                            {/*                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Message</p>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">*/}
                            {/*                    <p className="text-sm leading-6 text-gray-900">Citizen</p>*/}
                            {/*                    <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time></p>*/}
                            {/*                </div>*/}
                            {/*            </li>*/}
                            {/*        </ul>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="row-span-1 bg-green-500 rounded-3xl h-[15rem] md:h-[15rem] ">*/}
                            {/*    <div className="p-2 px-10 flex content-center justify-between border-b-2 border-amber-700 mt-2" dir="rtl">*/}
                            {/*        <h1 className="text-2xl text-gray-900 text-right  ">استفسارات</h1>*/}
                            {/*    </div>*/}
                            {/*    <div className={"overflow-y-auto h-auto max-h-36 m-1"}>*/}
                            {/*        <ul role={"list"} className="divide-y divide-gray-100 px-3">*/}
                            {/*            <li className="flex justify-between gap-x-6 py-5">*/}
                            {/*                <div className={"flex min-w-0 gap-x-4"}>*/}
                            {/*                    <div className="min-w-0 flex-auto">*/}
                            {/*                        <p className="text-sm font-semibold leading-6 text-gray-900">Name</p>*/}
                            {/*                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Message</p>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">*/}
                            {/*                    <p className="text-sm leading-6 text-gray-900">Citizen</p>*/}
                            {/*                    <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time></p>*/}
                            {/*                </div>*/}
                            {/*            </li>*/}
                            {/*            <li className="flex justify-between gap-x-6 py-5">*/}
                            {/*                <div className={"flex min-w-0 gap-x-4"}>*/}
                            {/*                    <div className="min-w-0 flex-auto">*/}
                            {/*                        <p className="text-sm font-semibold leading-6 text-gray-900">Name</p>*/}
                            {/*                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Message</p>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">*/}
                            {/*                    <p className="text-sm leading-6 text-gray-900">Citizen</p>*/}
                            {/*                    <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time></p>*/}
                            {/*                </div>*/}
                            {/*            </li>*/}
                            {/*            <li className="flex justify-between gap-x-6 py-5">*/}
                            {/*                <div className={"flex min-w-0 gap-x-4"}>*/}
                            {/*                    <div className="min-w-0 flex-auto">*/}
                            {/*                        <p className="text-sm font-semibold leading-6 text-gray-900">Name</p>*/}
                            {/*                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Message</p>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">*/}
                            {/*                    <p className="text-sm leading-6 text-gray-900">Citizen</p>*/}
                            {/*                    <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time></p>*/}
                            {/*                </div>*/}
                            {/*            </li>*/}
                            {/*        </ul>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
            {addService && <AddService setOpenModal={setaddService} id={id}/>}
        </>
    )
}
export default Service