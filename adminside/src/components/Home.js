import {Link} from "react-router-dom";
import licon from '../images/Large inwood bagels logo.jpeg'
import '../style/style.css'

function Home() {
    return(
        <div className={"home"}>
            <img
                className="adminicon"
                src={licon}
                alt={"Inwood Bgels"}
            />
            <button className={"homeButton"}><Link to={"/signin"}>Sign In</Link></button>
            <button className={"homeButton"}><Link to={"/createaccount"}>Create Account</Link></button>
        </div>
    )
}
export default Home;