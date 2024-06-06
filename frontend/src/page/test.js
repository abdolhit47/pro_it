import Navbar from "./Navbar";

function TEST() {

    return (
        <>
        <div className="flex h-screen ">
            <div className="flex-grow bg-gray-100">
                <Navbar />
                <div className="content-center flex flex-row justify-between md:max-w-[calc(100%-16rem)] mt-20">
                    <div className="bg-gray-200 shadow-xl shadow-indigo-500/40 rounded-md mx-auto w-auto">
                        
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
export default TEST