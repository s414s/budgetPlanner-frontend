import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from '../../helpers/helper';
import API from '../../config/API';
import "./style.css";

const Login = () => {

    const [state, setState] = useState({
        user: "",
        password: "",
        alert: false
    });

    const navigate = useNavigate();

    const checkUser = async () => {

        // User check
        API.post("users/login", { email : state.user, password : state.password })
        .then(resp =>{
            if( resp.status ){
                API.set_token(resp.data.token);
                navigate('/app/budgets');
            }else{

                const alert = {
                    type : "danger",
                    text : `Usuario ${state.user} no encontrado o contraseña incorrecta`
                }
        
                setState( {...state, alert: alert, password: ""} )
            }
        });        

    };

    const disabledButton = () => {
        if( validateEmail(state.user) && state.password.length > 0 ){
            return false;
        }else{
            return true;
        };
    };
    
    return(
        <div className="vh-100 compLogin">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card shadow-lg">
                                <div className="card-body p-5">
                                    <h3 className="text-uppercase text-center mb-3">LOGIN</h3>

                                    { ( state.alert !== false &&
                                        <div className={"alert alert-"+state.alert.type}>{state.alert.text}</div> ) }
                                    
                                    <form>

                                        <div className="form-outline mb-3">
                                            <label className="form-label" htmlFor="user">E-mail:</label>
                                            <input
                                                type="text" 
                                                className="form-control form-control-lg" 
                                                id="user"
                                                value={state.user}
                                                onChange={(e)=>{ setState({...state, user: e.target.value}) }}
                                            />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="password">Contraseña:</label>
                                            <input
                                                type="text" 
                                                className="form-control form-control-lg" 
                                                id="password"
                                                value={state.password}
                                                onChange={(e)=>{ setState({...state, password: e.target.value}) }}
                                            />
                                        </div>

                                        <div className="form-check d-flex justify-content-between mb-3">
                                            <div>
                                                <input className="form-check-input me-2" type="checkbox" value="" id="keepLogged" />
                                                <label className="form-check-label" htmlFor="keepLogged">
                                                    Recuérdame
                                                </label>
                                            </div>
                                            <div>
                                                <a href="#">Olvidaste tu contraseña?</a>
                                            </div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input 
                                                type="button" 
                                                onClick={checkUser} 
                                                disabled={disabledButton()} 
                                                className="btn btn-primary mt-2 form-control" 
                                                value="Login" 
                                            />
                                        </div>

                                        <p className="text-center text-muted mt-3 mb-0">
                                            Aún no te has registrado?
                                            <Link to="/signup" className="fw-bold text-body">
                                                    <u>Regístrate aquí</u>
                                            </Link>
                                        </p>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;