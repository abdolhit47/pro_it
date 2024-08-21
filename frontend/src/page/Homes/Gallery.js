import NavBarHome from "../NavBarHome";
function Gallery(){
    return(
        <>
            <div className="flex min-h-screen ">
                <div className="flex-grow bg-gray-100">
                    <NavBarHome/>
                    <div className="content-center flex flex-row justify-between my-20 w-full">
                        <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-8/12">
                            <p className="text-3xl text-center font-bold mt-10">معرض الصور</p>
                            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-14 w-full mx-auto p-4">

                                <div className="w-full h-64 min-h-80 overflow-hidden">
                                    <img src={require("../../images/news5.jpg")} alt="" className="w-full min-h-32 h-50 لال- transform transition-transform duration-300 ease-in-out hover:scale-110"/>

                                </div>

                                <div className="w-full h-64 min-h-80 overflow-hidden">
                                    <img src={require("../../images/news1.jpg")} alt="" className="w-full min-h-32 h-50 transform transition-transform duration-300 ease-in-out hover:scale-110"/>

                                </div>

                                <div className="w-full h-64 min-h-80 overflow-hidden">
                                    <img src={require("../../images/news4.jpg")} alt="" className="w-full min-h-32 h-50 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"/>

                                </div>
                                <div className="w-full h-64 min-h-80 overflow-hidden">
                                    <img src={require("../../images/news6.jpg")} alt="" className="w-full min-h-32 h-50 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"/>

                                </div>

                                <div className="w-full h-64 min-h-80 overflow-hidden">
                                    <img src={require("../../images/news2.jpg")} alt="" className="w-full min-h-32 h-50 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"/>

                                </div>

                                <div className="w-full h-64 min-h-80 overflow-hidden">
                                    <img src={require("../../images/news3.jpg")} alt="" className="w-full min-h-32 h-50 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"/>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Gallery