import NavBarHome from "../NavBarHome";
import {useState} from "react";
import {baseurl} from "../../Baseurl/baseurl";
import axios from "axios";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

function ShowOfficeH({office}){
    const { id } = useParams();
    const [showoffice, setOffice] = useState([]);


    async function getOffice() {
        const res =  await axios.get(baseurl + 'showofficeH/' + id, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
        });
        setOffice(res.data)
    }
    useEffect(() => {
        getOffice();
    }, [id]);
    return(
        <>
            <div className="flex min-h-screen ">
                <div className="flex-grow bg-gray-100">
                    <NavBarHome office={office}/>
                <div className="content-center flex flex-row justify-between my-20 md:mt-36 w-full">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md m-auto w-8/12">
                        <p className="text-3xl text-center font-bold mt-10">{showoffice.name}</p>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mx-auto p-4" dir={"rtl"}>
                            {showoffice.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default ShowOfficeH