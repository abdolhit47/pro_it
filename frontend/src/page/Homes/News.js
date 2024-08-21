function News(){
    return(
        <>
            <div className="content-center flex flex-row justify-between my-20 w-full">
                <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md m-auto w-8/12">
                    <p className="text-3xl text-center font-bold mt-10">أخبار وزارة الشؤون الاجتماعية</p>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mx-auto p-4">

                        <div className="w-full h-64 min-h-80 overflow-hidden">
                            <img src={require("../../images/news5.jpg")} alt="" className="w-full min-h-32 h-48 object-cover"/>
                            <p className="text-right font-bold line-clamp-3 mt-2">
                                وزيرة الشؤون الاجتماعية تلتقي بالفاعليات الاجتماعية للقبائل الليبية
                            </p>
                        </div>

                        <div className="w-full h-64 min-h-80 overflow-hidden">
                            <img src={require("../../images/news1.jpg")} alt="" className="w-full min-h-32 h-48 object-cover"/>
                            <p className="text-right font-bold line-clamp-3 mt-2">
                                وزارة الشؤون الاجتماعية تشارك في اجتماع الامانة العامة لمنظمة العالم الإسلامي
                            </p>
                        </div>

                        <div className="w-full h-64 min-h-80 overflow-hidden">
                            <img src={require("../../images/news4.jpg")} alt="" className="w-full min-h-32 h-48 object-cover"/>
                            <p className="text-right font-bold line-clamp-3 mt-2">
                                صندوق الضمان الاجتماعي يشارك في المنتدي الأفريقي للضمان الاجتماع بدولة ساحل العاج ويتحصل علي ثماني شهادت دولية من الجمعية الدولية للضمان الاجتماعي
                            </p>
                        </div>
                        <div className="w-full h-64 min-h-80 overflow-hidden">
                            <img src={require("../../images/news6.jpg")} alt="" className="w-full min-h-32 h-48 object-cover"/>
                            <p className="text-right font-bold line-clamp-3 mt-2">
                                وزيرة الشؤون الاجتماعية تلتقي رئيس الاكاديمية الليبية للدراسات العليا
                            </p>
                        </div>

                        <div className="w-full h-64 min-h-80 overflow-hidden">
                            <img src={require("../../images/news2.jpg")} alt="" className="w-full min-h-32 h-48 object-cover"/>
                            <p className="text-right font-bold line-clamp-3 mt-2">
                                مراسم تسليم واستلام المركز الوطني للتوحد من وزارة الصحة الي وزارة الشوون الاجتماعية.
                            </p>
                        </div>

                        <div className="w-full h-64 min-h-80 overflow-hidden">
                            <img src={require("../../images/news3.jpg")} alt="" className="w-full min-h-32 h-48 object-cover"/>
                            <p className="text-right font-bold line-clamp-3 mt-2">
                                وزيرة الشؤون الاجتماعية تحضر إحياء سفارة فلسطين للذكرى الخامسة والسبعين ليوم النكبة
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default News