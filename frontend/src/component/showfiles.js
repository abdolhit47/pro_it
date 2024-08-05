import {  urls } from '../Baseurl/baseurl';
import React from "react";

export default function Showfiles({setOpenModal,path_file}) {

    const closeModalTp = () => {
        setOpenModal(false);
    };

    return (
    <div id="modelConfirm" className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
        <div className="relative top-20 mx-auto shadow-xl rounded-md bg-white max-w-6xl">
            <div className=" p-2">
                <button onClick={closeModalTp} type="button"
                    className="top-right text-red-400 bg-transparent hover:bg-gray-200 hover:text-red-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div className="pt-0 text-center ">
                <div className="flex flex-col">
                        <div className="flex fflex-row-reverse justify-center items-center px-4">
                                <object
                                        data=
                                            {urls+path_file}
                                        type="application/pdf"
                                        height="500"
                                        width="100%"
                                >
                                </object>
                        </div>
                </div>
            </div>
            <div className="pt-0 text-center justify-center">
                <div className="flex flex-col py-4">
                    <div className="flex flex-row-reverse justify-center items-center ">
                        <button onClick={closeModalTp} className="mb-2 p-1 font-medium border-solid border-2 border-amber-700 rounded-md w-20 ">رجوع</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};