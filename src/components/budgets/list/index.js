import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from '../../../config/API';
import Loading from "../../theme/loading";

const ListBudget = () => {

    const [state, setState] = useState({
        status: "loading",
        budgets: []
    });

    useEffect(()=>{

        API.get('budgets/list/' ).then(resp => {
            setState({...state, status: "loaded", budgets: resp.data});
        });

    },[]);

    if(state.status === "loading"){
        return (
            <Loading text={'Cargando...'} />
        );
    };

    return (
        <div className="compBudgetList">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h5 className="h2">Panel de Control</h5>
            </div>

            <div className="row">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                    <a className="nav-link active" href="#">Presupuestos</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Colaboradores</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Relaciones</a>
                    </li>
                </ul>

                <div className="d-flex flex-column mt-3">

                    {state.budgets?.map(budget => {

                        return <div key={"budget"+budget.ID} className="placeholder-budget mx-3 my-2 px-5 py-4 rounded-3 shadow">
                                    <div className="d-flex">
                                        <div className="col-10">
                                        <h5><Link to={"/app/decomp/folders/"+budget.ID}>{budget.title}</Link></h5>
                                        </div>
                                        <div className="d-flex col-2 justify-content-end">
                                        <div className="btn-toolbar mb-2 mb-md-0">
                                            <div className="btn-group me-2">
                                                <a type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-share"></i></a>
                                                <a type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-calculator"></i></a>
                                                <a type="button" onClick={()=> { API.del("budgets/del/" + budget.ID) }} className="btn btn-sm btn-outline-secondary"><i className="bi bi-x-lg"></i></a>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="m-0 text-muted">Descripción Presupuesto {budget.ID}</p>
                                    <p className="m-0 text-muted">Número de colaboradores</p>
                                    <p className="m-0 text-muted">Última actualización</p>
                                </div>
                        }
                    )}

                </div>
            </div>
        </div>
    );
};

export default ListBudget;