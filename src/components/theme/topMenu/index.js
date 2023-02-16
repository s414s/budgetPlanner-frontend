import "./style.css";
import { Link } from "react-router-dom";

const TopMenu = () => {
    
    return (
    <nav id="topMenu" className="compTopMenu col-12 d-md-block bg-light topmenu shadow">
        <div className="position-sticky">
            <ul className="nav flex-row">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/app/budgets">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/app/items/:idUser?">
                        Items
                    </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false">
                        File
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                        <li><a className="dropdown-item" href="#">Accion 1</a></li>
                        <li><a className="dropdown-item" href="#">Accion 2</a></li>
                        <li><a className="dropdown-item" href="#">Accion 3</a></li>
                    </ul>
                </li>
                    <li className="nav-item">
                    <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink2" data-bs-toggle="dropdown" aria-expanded="false">
                        Concepts
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink2">
                        <li><a className="dropdown-item" href="#">Accion 1</a></li>
                        <li><a className="dropdown-item" href="#">Accion 2</a></li>
                        <li><a className="dropdown-item" href="#">Accion 3</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink3" data-bs-toggle="dropdown" aria-expanded="false">
                        Tools
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink3">
                        <li><a className="dropdown-item" href="#">Accion 1</a></li>
                        <li><a className="dropdown-item" href="#">Accion 2</a></li>
                        <li><a className="dropdown-item" href="#">Accion 3</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink4" data-bs-toggle="dropdown" aria-expanded="false">
                        Reports
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink4">
                        <li><a className="dropdown-item" href="#">Accion 1</a></li>
                        <li><a className="dropdown-item" href="#">Accion 2</a></li>
                        <li><a className="dropdown-item" href="#">Accion 3</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink5" data-bs-toggle="dropdown" aria-expanded="false">
                        Views
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink5">
                        <li><a className="dropdown-item" href="#">Accion 1</a></li>
                        <li><a className="dropdown-item" href="#">Accion 2</a></li>
                        <li><a className="dropdown-item" href="#">Accion 3</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Settings
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    )
}

export default TopMenu;