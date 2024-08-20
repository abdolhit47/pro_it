import NavBarHome from "../NavBarHome";
function ContactUs(){
    return(
        <>
            <div className="flex h-screen ">
                <div className="flex-grow bg-gray-100">
                    <NavBarHome/>
                    <div className="content-center flex flex-row justify-between mt-20 w-full">
                        <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-8/12">
                            <p className="text-3xl text-center font-bold mt-10">تواصل</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ContactUs