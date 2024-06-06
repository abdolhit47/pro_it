import React, { useRef,useState,useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { baseurl } from '../Baseurl/baseurl';
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";
function Verifyemail() {
    const { token } = useParams();
    const [chach , setchach] = useState(false);

    const ref = useRef(false);
    useEffect(() => {
        (async () => {
            if (ref.current) return;

            ref.current = true;
            try {
                const res = await axios.get(baseurl + `verify-email/${token}`);
                if (res.status === 200) {
                    setchach(true);
                    toast.success('تم التحقق من بريدك الالكتروني');
                } else if (res.status === 203) {
                    setchach(false);
                    //toast.warning('تحقق من بريدك الالكتروني');
                }
            } catch (e) {
                if (e?.response?.status === 404) {
                    toast.warning('مشكلى في تحقق من بريدك الالكتروني');
                }
            }
        })();
    }, []);
    return (
        <div className="min-h-screen flex items-center justify-center w-full bg-gray-900">
            <div className="bg-gray-100 shadow-md rounded-lg px-8 py-6 w-full max-w-md">
                {
                    chach===true ? (
                        <h1 className="text-2xl font-bold text-center mb-4 text-green-700" dir="rtl">تم التحقق من بريدك الالكتروني بنجاح</h1>
                    ): (
                        <h1 className="text-2xl font-bold text-center mb-4 text-green-700" dir="rtl">تم تفعيل حسابك مسبقا</h1>
                    )
                }
                <h1 className="text-xl font-medium text-gray-700 mb-2" dir="rtl">يمكنك <Link to="/login" aria-expanded="false" >
                        <span className="text-xl text-indigo-700 hover:text-green-700 ">تسجيل الدخول</span>
                    </Link>
                </h1>

            </div>
        </div>
    )
}
export default Verifyemail