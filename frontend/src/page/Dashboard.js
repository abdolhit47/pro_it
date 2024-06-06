import Navbar from './Navbar'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify'

function Dashboard() {

    return (
    <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between mt-20 w-[calc(100%-16rem)]">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-8/12 ">
                        <div class="px-3 py-4 flex justify-center">
                            <h1>Chart</h1>
                        </div>
                    </div>         
                </div><ToastContainer position="top-left" />
            </div>
        </div>
        </>
    );
}
export default Dashboard