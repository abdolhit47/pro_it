import Navbar from "./Navbar";
import React, { useRef,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { baseurl } from '../Baseurl/baseurl';
import { ToastContainer, toast } from 'react-toastify'

import axios from 'axios';

function Profile() {
    const tokenRef = useRef(localStorage.getItem('token'));

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

   async function getuserInfo(){
       setIsLoading(true);
       try{
            const res = await axios.get(baseurl + "getuser",{
                            headers: {
                                Authorization: `Bearer ${tokenRef.current}`,
                            },
                        });
                        
            if(res.status===200){
                setValues(res.data[0]);
            }
            else{
                ///error show data
            }
        }catch(error){
            //error
        }finally {
          setIsLoading(false);
       }
    }
    useEffect(() => {
        if (tokenRef.current) {
          getuserInfo(tokenRef.current);
        } else {
          navigate("/");
          toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
        }
      }, [0]);
    const handelback = () => {
        navigate(`/Dashboard`);
    }

    const [value,setValues] = useState({
        firstName: '',
        middleName: '',
        lastName:'',
        phone:'',
        birthday:'',
        placeOfBirth:'',
        gender:'',
        address:'',
        closePhone:'',
        NearPhone:'',
        userName:'',
        email:'',
        password:'',
        confirmpassword:'',
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
   async function handelupdate () {
        if(value.password !== value.confirmpassword){
            toast.warning('كلمة المرور غير متطابقة');
             return;
        }
        try {
            const res = await  axios.post(baseurl + "updateuser",value,{
                headers: {
                    Authorization: `Bearer ${tokenRef.current}`,
                },
            });
            if(res.status===200){
                toast.success('تم تحديث بياناتك بنجاح');
            }
        }catch (error){
            if(error?.response?.status === 422){
                if(error?.response?.data?.error?.email){
                    toast.warning('البريد الالكتروني مستخدم من قبل');
                }else if(error?.response?.data?.error?.userName){
                    toast.warning('اسم المستخدم مستخدم من قبل');
                }
                else if(error?.response?.data?.error?.phone){
                    toast.warning('رقم الهاتف مستخدم من قبل');
                }
            }
        }
    }
    return (
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100vw-16rem)] mt-10">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto  w-8/12">
                        <div className="flex flex-col p-8 max-w-3xl">
                            <h1 className="text-2xl text-gray-900 text-right mb-6">بياناتي الشخصية</h1>
                            {isLoading ? (
                                <div className="flex items-center justify-center"> {/* Center the content horizontally */}
                                    <img className="w-12 h-12 animate-spin mr-4" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" /> {/* Add margin for spacing */}
                                    <span className="text-xl font-bold">جاري التحميل...</span>
                                </div>
                                ) :(
                                value &&(
                                    <div>
                                        <div className="flex flex-row-reverse -mx-3 mb-4">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="firstName" className="block mb-2 text-gray-700 font-medium  text-right">الاسم</label>
                                                <input type="text" id="firstName" name='firstName' value={value.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700  text-right" />
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="middleName" className="block mb-2 text-gray-700 font-medium  text-right">اسم الأب</label>
                                                <input type="text" id="middleName" name='middleName' value={value.middleName} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="lastName" className="block mb-2 text-gray-700 font-medium  text-right">اللقب</label>
                                                <input type="text" id="lastName" name="lastName" value={value.lastName} onChange={handleChange}className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>
                                        </div>

                                        <div className=" flex flex-row-reverse -mx-3 mb-4">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="phone" className="block mb-2 text-gray-700 font-medium  text-right">رقم الهاتف</label>
                                                <input type="text" id="phone" name="phone" value={value.phone} onChange={handleChange}className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="birthday" className="block mb-2 text-gray-700 font-medium  text-right">تاريخ الميلاد</label>
                                                <input type="date" id="birthday" name="birthday" value={value.birthday} onChange={handleChange}className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="placeOfBirth" className="block mb-2 text-gray-700 font-medium  text-right">مكان الميلاد</label>
                                                <input type="text" id="placeOfBirth" name="placeOfBirth" value={value.placeOfBirth} onChange={handleChange}className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>
                                        </div>

                                        <div className="flex flex-row-reverse -mx-3 mb-4">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="gender" className="block mb-2 text-gray-700 font-medium  text-right">الجنس</label>
                                                <input type="text" id="gender" name="gender" value={value.gender} onChange={handleChange}className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="address" className="block mb-2 text-gray-700 font-medium  text-right">عنوان السكن</label>
                                                <input type="text" id="address" name="address" value={value.address} onChange={handleChange}className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="closePhone" className="block mb-2 text-gray-700 font-medium  text-right">اسم القريب</label>
                                                <input type="text" id="closePhone" name="closePhone" value={value.closePhone} onChange={handleChange}className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>
                                        </div>

                                        <div className="flex flex-row-reverse -mx-3 mb-4">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label for="NearPhone" className="block mb-2 text-gray-700 font-medium  text-right">رقم القريب</label>
                                                <input type="text" id="NearPhone" name="NearPhone" value={value.NearPhone} onChange={handleChange}className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                            </div>
                                        </div>

                                        <h1 className="text-2xl text-gray-900  text-right mb-6">بيانات حسابي</h1>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row-reverse -mx-3 mb-4">
                                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="userName" className="block mb-2 text-gray-700 font-medium  text-right">اسم المستخدم</label>
                                                    <input type="text" id="userName" name="userName" value={value.userName} onChange={handleChange}className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>
                                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="email" className="block mb-2 text-gray-700 font-medium  text-right">البريد الإلكتروني</label>
                                                    <input type="text" id="email" name="email" value={value.email} onChange={handleChange}className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>
                                            </div>
                                            <div className=" flex flex-row-reverse -mx-3 mb-4">
                                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="password" className="block mb-2 text-gray-700 font-medium  text-right">كلمة السر الجديدة</label>
                                                    <input type="password" name="password" id="password" value={value.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>
                                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label for="confirmpassword" className="block mb-2 text-gray-700 font-medium  text-right">تأكيد الكلمة السر</label>
                                                    <input type="password" name="confirmpassword" id="confirmpassword" value={value.confirmpassword} onChange={handleChange}className="w-full border border-gray-300 rounded-md py-1 px-4 text-gray-700 focus:border-indigo-500 focus:outline-none text-right" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="flex flex-row-reverse justify-center items-center mt-4 ">
                                <button className="mb-2 p-1 text-white font-medium ml-28 border-solid border-2 rounded-md w-20 bg-[#5F82BA]" onClick={handelupdate}>تعديل</button>
                                <button className="mb-2 p-1 font-medium mr-28 border-solid border-2 border-amber-700 rounded-md w-20 " onClick={handelback}>رجوع</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div><ToastContainer position="top-left" />
        </div>

        </>
    )
}
export default Profile