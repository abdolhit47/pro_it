import axios from 'axios';
import { baseurl } from '../../Baseurl/baseurl';
import { toast } from 'react-toastify';
export async function getCount(setCountMes) {
    const access = localStorage.getItem('access_token');
    if (access === '0') {
        toast.warning('رجاء تعبية بيانات الدخول');
        return;
    }
    try {
        const res = await axios.get(baseurl + 'countMes', {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
        });
        if (res.status === 200) {
             setCountMes(res.data);
        } else {
            // Handle other status codes if needed
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        if (error?.response?.status === 401) {
            toast.warning('تحقق من كلمة المرور أو اسم المستخدم');
        } else if (error?.response?.status === 402) {
            toast.warning('حسابك غير مؤكد، رجاء تأكيده');
        } else {
            toast.error('حدث خطأ. الرجاء المحاولة مرة أخرى.');
        }
        throw error; // Rethrow the error to handle in components
    }
}