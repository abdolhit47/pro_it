import {Link} from "react-router-dom";
import NavBarHome from "../NavBarHome";
import News from "../Homes/News";
function Home(){


    return(
        <>
            <div className="flex min-h-screen">
                <div className="flex-grow bg-gray-100">
                    <NavBarHome/>
                    <News/>
                </div>
            </div>
        </>
    )
}

export default Home