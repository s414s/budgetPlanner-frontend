import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateEmail } from '../../helpers/helper';
import "./style.css";
import API from "../../config/API";

const SignUp = () => {

    const navigate = useNavigate();

    const [state, setState] = useState({
        name: "",
        email: "",
        email2: "",
        password: "",
        password2: "",
        alert: false,
    })


    const disabledButton = () => {
        if( validateEmail(state.email) &&
        state.password.length > 0 &&
        state.name.length > 0 &&
        state.password2 === state.password &&
        state.email === state.email2){
            return false;
        }else{
            return true;
        };
    };

    const sendNewUser = async () => {

        API.post("users/add", {name: state.name, email: state.email, password: state.password})
        .then(resp => {
            if( resp.status ) {
                API.set_token(resp.data.token);
                navigate("/app/budgets");
            } else {
                const alert = {
                    type: "danger",
                    text: "No se ha podido crear el usuario"
                }

                setState({...state, alert: alert, password: ""})
            }
        })
    }

    return (
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card shadow-lg">
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">REGISTRATE</h2>

                                    { ( state.alert !== false &&
                                        <div className={"alert alert-"+state.alert.type}>{state.alert.text}</div> ) }

                                    <form>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="name">Nombre</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="name"
                                                value={state.name}
                                                onChange={(e) => { setState({...state, name: e.target.value}) }}
                                            />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="email">E-mail</label>
                                            <input
                                                type="email"
                                                className="form-control form-control-lg"
                                                id="email"
                                                value={state.email}
                                                onChange={(e) => { setState({...state, email: e.target.value}) }}
                                            />
                                        </div>

                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="email">Introduce de nuevo tu email</label>
                                            <input
                                                type="email"
                                                className="form-control form-control-lg"
                                                id="email"
                                                value={state.email2}
                                                onChange={(e) => { setState({...state, email2: e.target.value}) }}
                                            />
                                        </div>

                                        <div
                                            id="errorCode"
                                            className="form-text text-danger mb-4"
                                            style={{ visibility: (state.email === state.email2) ? 'hidden' : 'visible' }}
                                        >
                                          El email no coincide 
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="password">Contraseña</label>
                                            <input
                                                type="password"
                                                className="form-control form-control-lg"
                                                id="password"
                                                value={state.password}
                                                onChange={(e) => { setState({ ...state, password: e.target.value }) }}
                                            />
                                        </div>

                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="password2">Repite la contraseña</label>
                                            <input
                                                type="password"
                                                className="form-control form-control-lg"
                                                id="password2"
                                                value={state.password2}
                                                onChange={(e) => { setState({ ...state, password2: e.target.value }) }}
                                                />
                                        </div>

                                        <div
                                            id="errorCode"
                                            className="form-text text-danger mb-4"
                                            style={{ visibility: (state.password === state.password2) ? 'hidden' : 'visible' }}
                                        >
                                           La contraseña no coincide 
                                        </div>

                                        <div className="form-check d-flex justify-content-center mb-5">
                                            <input className="form-check-input me-2" type="checkbox" value="" id="termsOfUse" />
                                            <label className="form-check-label" htmlFor="termOfUse">
                                                Acepto los <a href="#!" className="text-body"><u>Términos de uso</u></a>
                                            </label>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button type="button"
                                            className="btn btn-primary form-control btn-lg"
                                            onClick={sendNewUser}
                                            disabled={disabledButton()} 
                                            value="Signup"
                                            >Enviar</button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">
                                            Ya tienes una cuenta?
                                            <Link to="/login" className="fw-bold text-body">
                                                <u>Accede aquí</u>
                                            </Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );

};

export default SignUp;