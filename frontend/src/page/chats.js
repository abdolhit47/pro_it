import Navbar from "./Navbar";
import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import AddOffice from "../component/addOffice";
function Chats() {
    const [Model, setModel] = useState([]);
    const [addOffice, setaddOffice] = useState(false);
    const handleshow = ()=>{
        setaddOffice(true)
    }
    return (
        <>
        <div className="flex h-screen">
            <div className="flex-grow bg-gray-100 h-lvh">
                <Navbar />
                <div className="flex flex-grow flex-row-reverse text-right inset-y-14 h-auto max-h-screen md:max-w-[calc(100%-16rem)] mt-20">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-3/4  ">
                        <div className="p-4 px-10 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 className="text-2xl text-gray-900 text-right">الاستفسارات</h1>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleshow}>اضافة <AddIcon/></button>
                        </div>
                        <div className={"px-6 py-4 flex-wrap gap-4 justify-center overflow-y-auto h-auto max-h-screen max-w-full grid grid-cols-4 "} dir={'rtl'}>
                            {/*<p className="flex items-center justify-center bg-gray-100 flex-grow text-black border-x-8 border-green-500 rounded-md px-3 py-2 w-2">*/}
                            {/*    لا يوجد رسائل*/}
                            {/*</p>*/}
                            {/*<div className="flex col-span-1 row-span-2 items-center justify-center bg-gray-100 flex-grow text-black border-l-2 border-gray-500 rounded-r-md px-3 py-2">*/}
                            {/*    {"لا يوجد رسائل"}*/}

                            {/*</div>*/}
                            <div className="flex  h-auto tall:h-96 col-span-1 row-span-2 bg-gray-100 border-l-2 border-gray-500 rounded-r-md overflow-y-auto">
                                <div className={' flex flex-col md:w-11/12 h-fit pr-2 pt-2 items-start'}>
                                    <div className=" w-full rounded-xl border-2 my-2">
                                        <p className=" p-1">على</p>
                                        <p className="text-gray-500 font-thin text-sm p-1 truncate ">كيف حالك شن أخبارك تمام؟بنقولك إنت وين راهو وصلنا و فاتك جو كله</p>
                                    </div>
<div className=" w-full rounded-xl border-2 my-2">
                                        <p className=" p-1">على</p>
                                        <p className="text-gray-500 font-thin text-sm p-1 truncate ">كيف حالك شن أخبارك تمام؟بنقولك إنت وين راهو وصلنا و فاتك جو كله</p>
                                    </div>
<div className=" w-full rounded-xl border-2 my-2">
                                        <p className=" p-1">على</p>
                                        <p className="text-gray-500 font-thin text-sm p-1 truncate ">كيف حالك شن أخبارك تمام؟بنقولك إنت وين راهو وصلنا و فاتك جو كله</p>
                                    </div>
<div className=" w-full rounded-xl border-2 my-2">
                                        <p className=" p-1">على</p>
                                        <p className="text-gray-500 font-thin text-sm p-1 truncate ">كيف حالك شن أخبارك تمام؟بنقولك إنت وين راهو وصلنا و فاتك جو كله</p>
                                    </div>
<div className=" w-full rounded-xl border-2 my-2">
                                        <p className=" p-1">على</p>
                                        <p className="text-gray-500 font-thin text-sm p-1 truncate ">كيف حالك شن أخبارك تمام؟بنقولك إنت وين راهو وصلنا و فاتك جو كله</p>
                                    </div>
<div className=" w-full rounded-xl border-2 my-2">
                                        <p className=" p-1">على</p>
                                        <p className="text-gray-500 font-thin text-sm p-1 truncate ">كيف حالك شن أخبارك تمام؟بنقولك إنت وين راهو وصلنا و فاتك جو كله</p>
                                    </div>
<div className=" w-full rounded-xl border-2 my-2">
                                        <p className=" p-1">على</p>
                                        <p className="text-gray-500 font-thin text-sm p-1 truncate ">كيف حالك شن أخبارك تمام؟بنقولك إنت وين راهو وصلنا و فاتك جو كله</p>
                                    </div>

                                </div>


                            </div>
                            <div className="flex col-span-3 items-center justify-center h-auto tall:h-96">
                                <div className="m-2 w-4/5  border flex flex-col rounded-t-xl h-full">
                                    <header className="w-full bg-primary-500 flex  justify-between px-2 py-1 rounded-t-lg items-center relative mb-10">
                                        <h2 className="text-sm font-semibold flex items-center absolute tall2:text-2xl tall3:text-4xl">
                                            عنوان الموضوع
                                        </h2>
                                    </header>
                                    <div className="flex flex-col gap-4 p-2 select-none overflow-y-auto">
                                        <div className="flex items-end">
                                            <p className="mx-2 p-2 rounded bg-gray-200 leading-4 text-sm">Hi there 👋<br/>How can I help you today?</p>
                                        </div>
                                        <div className="flex items-end flex-row-reverse">
                                            <p className="mx-2 p-2 rounded bg-gray-200 leading-4 text-sm">Hi there 👋<br/>How can I help you today?</p>
                                        </div>
                                        <div className="flex items-end">
                                            <p className="mx-2 p-2 rounded bg-gray-200 leading-4 text-sm">Hi there 👋<br/>How can I help you today?</p>
                                        </div>
                                        <div className="flex items-end flex-row-reverse">
                                            <p className="mx-2 p-2 rounded bg-gray-200 leading-4 text-sm">Hi there 👋<br/>How can I help you today?</p>
                                        </div>
                                        <div className="flex items-end">
                                            <p className="mx-2 p-2 rounded bg-gray-200 leading-4 text-sm">Hi there 👋<br/>How can I help you today?</p>
                                        </div>
                                        <div className="flex items-end flex-row-reverse">
                                            <p className="mx-2 p-2 rounded bg-gray-200 leading-4 text-sm">Hi there 👋<br/>How can I help you today?</p>
                                        </div>
                                        <div className="flex items-end">
                                            <p className="mx-2 p-2 rounded bg-gray-200 leading-4 text-sm">Hi there 👋<br/>How can I help you today?</p>
                                        </div>
                                        <div className="flex items-end flex-row-reverse">
                                            <p className="mx-2 p-2 rounded bg-gray-200 leading-4 text-sm">Hi there 👋<br/>How can I help you today?</p>
                                        </div>
                                        <div className="flex items-end">
                                            <p className="mx-2 p-2 rounded bg-gray-200 leading-4 text-sm">Hi there 👋<br/>How can I help you today?</p>
                                        </div>
                                        <div className="flex items-end flex-row-reverse">
                                            <p className="mx-2 p-2 rounded bg-gray-200 leading-4 text-sm">Hi there 👋<br/>How can I help you today?</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex col-span-3 items-center justify-center">
                                <div className="flex w-4/5 my-2 mx-1">
                                    <textarea id="chat" rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your message..."></textarea>
                                    <button type="submit" className="flex justify-center items-center aspect-square h-9 bg-primary-500  p-2 rounded-full cursor-pointer hover:bg-primary-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.837t.95-.088l15.4 6.5q.625.275.625.925t-.625.925z"/></svg>
                                    </button>
                                </div>
                            </div>

                        </div>

                                {/*<div className={"px-6 py-4 flex flex-wrap gap-4 justify-center overflow-y-auto h-auto max-h-96 max-w-full "} dir={'rtl'}>*/}
                                {/*    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">*/}
                                {/*        Computer Science Engineering*/}
                                {/*    </span>*/}
                                {/*    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">*/}
                                {/*        Mechanical Engineering*/}
                                {/*    </span>*/}
                                {/*    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">*/}
                                {/*        Civil Engineering*/}
                                {/*    </span>*/}
                                {/*    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">*/}
                                {/*    sdsd*/}
                                {/*    </span>*/}
                                {/*    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">*/}
                                {/*    sdsd*/}
                                {/*    </span>*/}
                                {/*    <span className="bg-gray-100 flex-grow text-black border-r-8 border-green-500 rounded-md px-3 py-2 w-1/5">*/}
                                {/*    sdsd*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Chats