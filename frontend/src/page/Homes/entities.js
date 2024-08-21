import NavBarHome from "../NavBarHome";
function Entities(){
    return(
        <>
            <div className="flex h-screen ">
                <div className="flex-grow bg-gray-100">
                    <NavBarHome/>
                    <div className="content-center flex flex-row justify-between mt-20 w-full">
                        <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-8/12">
                            <p className="text-3xl text-center font-bold mt-10">الجهات والمراكز التابعة
                            </p>
                            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mx-auto p-4">
                                <div className="w-full h-64 overflow-hidden rounded-lg shadow-lg shadow-indigo-600/40 bg-gray-100 p-4">
                                    <h1 className="text-right text-xl font-bold mt-2">
                                        دار الوفاء لرعاية العجزة والمسنين
                                    </h1>
                                    <p className="text-right text-gray-500 mt-3">
                                        دار الوفاء لرعاية العجزة والمسنين
                                    </p>
                                </div>
                                <div className="w-full h-64 overflow-hidden rounded-lg shadow-lg shadow-indigo-600/40 bg-gray-100 p-4">
                                    <h1 className="text-right text-xl font-bold mt-2">
                                        مركز جالو لتأهيل وإعادة تأهيل حالات العلاج الطبيعي والتوحد
                                    </h1>
                                    <p className="text-right text-gray-500 mt-3 line-clamp-5">
                                        تأسس المركز بناءً على قرار مجلس الوزراة رقم (390) لسنة 2012 ويكون المقر الرئيسي للمركز مدينة جالو ويجوز انشاء فروع له في المدن والمناطق الاخرى ويقدم المركز الدعم الارشادي والتوجيهي والتدريبي على كيفية التعامل مع حالات العلاج الطبيعي والتوحد ، ويقوم بتوعية المجتمع والعمل على الاكتشاف المبكر لجميع انواع الاعاقات في مجالات المركز
                                    </p>
                                </div>
                                <div className="w-full h-64 overflow-hidden rounded-lg shadow-lg shadow-indigo-600/40 bg-gray-100 p-4">
                                    <h1 className="text-right text-xl font-bold mt-2">
                                        صندوق الضمان الاجتماعي
                                    </h1>
                                    <p className="text-right text-gray-500 mt-3 line-clamp-5">
                                        أنشئ صندوق الضمان الاجتماعي بموجب القانون رقم (13) لسنة 1980 مسيحي وبدأ العمل به 1/6/1981 مسيحي ويتولى تسجيل المضمونين المشتركين وتحصيل الاشتراكات المقررة وإعداد وصرف المنافع لمستحقيها من معاشات ومنافع قصيرة الأمد ويصل عدد المشتركين إلى مليون مضمون مشترك وعدد أصحاب المعاشات إلى,000347 معاش تقريباً.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Entities