import Navbar from "../Navbar";
import React, {useState, useEffect} from "react";
import AddOffice from "../../component/addOffice";
import {useNavigate} from "react-router-dom";
import useFollowUp from "../../component/search";
import AddIcon from "@mui/icons-material/Add";
import {toast}  from "react-toastify";
import {baseurl} from "../../Baseurl/baseurl";
import axios from "axios";
function ShowEmployee() {
     const {
        Data,
        filteredData,
        filter,
        setFilter,
        DataFilter,
        setDataFilter,
        applyFilters,
        getFollowUp
     } = useFollowUp("Employee");
    const role = localStorage.getItem('role');
    // const [addOffice, setaddOffice] = useState(false);

    const navigate = useNavigate()

    // const handleadd = ()=>{
    //     setaddOffice(true);
    // }
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
    const uniqueOffices = [...new Set(Data.map(item => item.address))];
    const [show, setShow] = useState(false);
    const handlshow = () => setShow(!show);

    const [value, setValue] = useState({
        name: '',
    });
    async function addEmployee() {
        // const formData = new formData();
        // formData.append('name', value.name);
        try {
            const res = await axios.post(baseurl + 'addEmployee', value, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (res.status === 200) {
                toast.success('تمت العملية بنجاح');
                getFollowUp()
                setValue({name: ''});
                setShow(false);
            }
        } catch (error) {
            if (error?.response?.status === 422) {
                toast.error('------');
            } else {
                toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
            }
        }
    }

    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {

        // Initialize checkedItems based on filteredData
        const initialCheckedItems = {};
        filteredData.forEach(item => {
            initialCheckedItems[item.id] = item.status === "مفعل";
        });
        setCheckedItems(initialCheckedItems);
    }, [filteredData]);

    // Handle checkbox change
    const handleCheckboxChange = (id) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id] // Toggle the current status
        }));
    };

    async function handlestatus(id) {
        console.log(`Status changed for item ${id}`);

        try {
            const res = await axios.put(baseurl + 'update/' + id, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            if (res.status === 200) {
                toast.success('تمت العملية بنجاح');
                getFollowUp()
            }
        } catch (error) {
            if (error?.response?.status === 422) {
                toast.error('------');
            } else {
                toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
            }
        }
    }
    return (
        <>
            <div className="flex h-screen ">
                <div className="flex-grow bg-gray-100">
                    <Navbar />
                    <div className="content-center flex flex-row justify-between md:max-w-[calc(100%-16rem)] mt-20">
                        <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto  ">
                            <div className="p-4 px-10 flex content-center justify-start  mt-2" dir="rtl">
                                <h1 className="text-2xl text-gray-900 text-right ml-5">عرض الموظفين</h1>
                                {(role === "0" || role === "2") &&<button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-xl py-1 px-1"
                                     >إضافة<AddIcon onClick={handlshow}/></button>}
                            </div>
                            {(role === "0" || role === "2") &&
                                ( <div className={`${show ? "block" : "hidden"} flex justify-start h-10 mt-3 mr-5`}  dir="rtl">
                                        <input type={"text"} className={"border-2 border-gray-300 p-2 rounded ml-5"} placeholder={"اسم الموظف"} name={'name'} value={value.name} onChange={(e) => setValue({...value, [e.target.name]: e.target.value})}/>
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={addEmployee}
                                        >إضافة الموظف</button>
                                </div>)
                            }

                            <div className="px-6 py-4 flex mt-5 " dir={'rtl'}>
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
                                    <option value="">جميع المدن</option>
                                    {uniqueOffices.map((office, index) => (
                                        <option key={index} value={office}>{office}</option>
                                    ))}
                                </select>

                            </div>

                            <div className="px-6 py-4 flex justify-center">
                                <table className="w-full text-md bg-white shadow-md rounded mb-4 table-fixed max-w-3xl" dir="rtl">
                                    <thead className="flex w-full ">
                                    <tr className="border-b text-center flex w-full px-2 mb-4">
                                        <th className="p-3 w-1/7">#</th>
                                        <th className="p-3 w-1/4">الاسم الموظف</th>
                                        <th className="p-3 w-1/4">الاسم مستخدم</th>
                                        <th className="p-3 w-1/4">العنوان</th>
                                        <th className="p-3 w-1/4">حالة الموظف</th>
                                        <th className="p-3 w-1/4">التعديل</th>
                                    </tr>
                                    </thead>
                                    <tbody className="flex flex-col items-center overflow-y-auto h-auto max-h-72 tall3:max-h-96">
                                    {filteredData.map((item, index) => (
                                        <tr className="text-center hover:bg-orange-100 flex w-full px-2" key={item.id}>
                                            <td className="p-3 w-1/8 flex items-center justify-center">{index + 1}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center text-ellipsis">{item.name}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center text-ellipsis">{item.user}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">{item.address}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center">{item.status}</td>
                                            <td className="p-3 w-1/5 flex items-center justify-center" dir={'ltr'}>
                                                <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
                                                    <input
                                                        onClick={() => {
                                                            handleCheckboxChange(item.id);
                                                            handlestatus(item.id);
                                                        }}
                                                        type='checkbox'
                                                        checked={checkedItems[item.id]}
                                                        className='sr-only'
                                                    />
                                                    <span className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                                                        checkedItems[item.id] ? 'bg-green-600' : 'bg-red-700'
                                                    }`}>
                  <span className={`dot h-6 w-6 rounded-full bg-white duration-200 ${checkedItems[item.id] ? 'translate-x-[28px]' : ''}`}></span>
                </span>
                                                </label>
                                                {/*<button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={(event) =>handleshow(item.id, event)}>التعديل</button>*/}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*{addOffice && <AddOffice setOpenModal={setaddOffice}/>}*/}
        </>
    )
}
export default ShowEmployee