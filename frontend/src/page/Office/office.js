import Navbar from "../Navbar";
import React, {useEffect, useState} from "react";
import AddOffice from "../../component/addOffice";
import {useNavigate} from "react-router-dom";
import useFollowUp from "../../component/search";

function Office() {
    const {
        Data,
        filteredData,
        filter,
        setFilter,
        DataFilter,
        setDataFilter,
        applyFilters,
        getFollowUp
    } = useFollowUp("Office");
    const role = localStorage.getItem('role');
    const [addOffice, setaddOffice] = useState(false);
    const access = localStorage.getItem('access_token');
    const navigate = useNavigate();
    useEffect(()=>{
        if (access === "0") {
            navigate('/profile');
        }
    },[])
    const handleadd = ()=>{
        setaddOffice(true);
    }
    const handleCloseAddOffice = () => {
        setaddOffice(false);
        // Fetch data again after AddService closes for guaranteed update
        getFollowUp();
    };
    const handleshow = (index, event) => {
        event.preventDefault();
        if (index) {
            navigate(`/showoffice/${index}/`);
        }
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        applyFilters(value, DataFilter);
    };

    const handleOfficeFilterChange = (e) => {
        const value = e.target.value;
        setDataFilter(value);
        applyFilters(filter, value);
    };
    const uniqueOffices = [...new Set(Data.length >0 ?Data.map(item => item.address):"")];
    return (
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100%-16rem)] mt-20">
                    <div class="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto  ">
                        <div class="p-4 px-10 flex content-center justify-between  mt-2" dir="rtl">
                            <h1 class="text-2xl text-gray-900 text-right">الجهة/المركز</h1>
                            {role === "0" &&<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleadd}>اضافة جهة</button>}
                        </div>
                        <div className="px-6 py-4 flex  " dir={'rtl'}>
                            <label htmlFor="filter" className="mr-2 text-center flex items-center ml-3">بحث: </label>
                            <input
                                type="text"
                                className="border-2 border-gray-300 p-2 rounded ml-3"
                                placeholder="Filter"
                                value={filter}
                                onChange={handleFilterChange}
                            />
                            <select
                                className="border-2 border-gray-300 p-2 rounded ml-2"
                                value={DataFilter}
                                onChange={handleOfficeFilterChange}
                            >
                                <option value="">كل البلديات</option>
                                {uniqueOffices.map((office, index) => (
                                    <option key={index} value={office}>{office}</option>
                                ))}
                            </select>
                        </div>
                        <div className="px-6 py-4 flex justify-center">

                            <table className="w-full text-md bg-white shadow-md rounded mb-4 table-fixed max-w-3xl" dir="rtl">
                                <thead className="flex w-full ">
                                <tr className="border-b text-center flex w-full px-2 mb-4">
                                    <th className="p-3 w-1/8">#</th>
                                    <th className="p-3 w-1/4">الاسم الجهة</th>
                                    <th className="p-3 w-1/4" dir={'rtl'}>وصف</th>
                                    {role === "0" &&<th className="p-3 w-1/4">المسؤول</th>}
                                    <th className="p-3 w-1/4">البلدية</th>
                                    {role === "4" &&<th className={"p-3 w-1/4"}>العرض</th>}
                                    {/*{role === "0" &&*/}
                                    {/*    <th className="p-3 w-1/5">التعديل</th>*/}
                                    {/*}*/}
                                </tr>
                                </thead>
                                {
                                    filteredData.length === 0 ?( <div dir="rtl" className={'flex-col flex items-center justify-center text-2xl'}>
                                        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8" style={{borderTopColor: '#c88903'}} />
                                        رجاء الانتظار...
                                        </div>)
                                        :filteredData.length > 0 ?<tbody className="flex flex-col items-center overflow-y-auto h-auto max-h-80">
                                            {filteredData.map((item, index) => (
                                                <tr className="text-center hover:bg-orange-100 flex w-full px-2" key={item.id}>
                                                    <td className="p-3 w-1/8 flex items-center justify-center">{index + 1}</td>
                                                    <td className="p-3 w-1/4 flex items-center justify-center text-ellipsis">{item.name}</td>
                                                    <td className="p-3 w-1/4 flex items-center justify-center truncate text-right">{item.description}</td>
                                                    {role === "0" &&<td className="p-3 w-1/4 flex items-center justify-center">{item.employee}</td>}
                                                    <td className="p-3 w-1/4 flex items-center justify-center">{item.address}</td>
                                                    {role !== "0" &&<td className="p-3 w-1/4 flex items-center justify-center">
                                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={(event) =>handleshow(item.id, event)}>العرض</button>
                                                    </td>}
                                                    {/*{role === "0" &&*/}
                                                    {/*    <td className="p-3 w-1/5 flex items-center justify-center">*/}
                                                    {/*        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={(event) =>handleshow(item.id, event)}>التعديل</button>*/}
                                                    {/*    </td>}*/}
                                                </tr>
                                            ))}
                                            </tbody>
                                        :<p className=" text-2xl flex flex-col items-center my-5">لايوجد بيانات لعرضها</p>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {addOffice && <AddOffice onClose={handleCloseAddOffice}/>}
        </>
    )
}
export default Office