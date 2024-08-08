import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
export default function NavBar() {

    const navigator = useNavigate();

    function logout() {
        localStorage.clear();
        navigator("/");
    }


    return (
        <div className="navbar">
            <button className="nav-button" onClick={() => window.history.back()}><FontAwesomeIcon icon={faBackward} /> Back</button>
            <button className="nav-button" onClick={() => logout()}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</button>
        </div>
    );
}