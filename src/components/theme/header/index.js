import { Link } from "react-router-dom";
import "./style.css";
import API from "../../../config/API";

const TopBar = () => {
    return (
    <header className="compTopBar navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Budget Creator</a>
        <div className="justify-content-end">
            <button className="btn btn-outline-primary btn-sm" href="#">Perfil</button>
            <Link className="btn btn-outline-danger btn-sm mx-3" onClick={()=>{ API.remove_token() }} to="/login">Sign out</Link>
        </div>
    </header>
    );
};

export default TopBar;