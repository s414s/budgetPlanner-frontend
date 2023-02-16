import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from '../../../config/API';
import Loading from "../../theme/loading";

const ListBudget = () => {

    const [state, setState] = useState({
        status: "loading",
        budgets: [],
        lastModified: 1
    });

    useEffect(() => {

        API.get('budgets/list/').then(resp => {
            setState({ ...state, status: "loaded", budgets: resp.data });
        });

    }, [state.lastModified]);

    if (state.status === "loading") {
        return (
            <Loading text={'Cargando...'} />
        );
    };

    const recycleBudget = async (idBudget) => {

        try {
            const res = await API.del('budgets/recycle/' + idBudget);
            console.log(res)
            if (res.status) {
                setState({ ...state, lastModified: (+new Date()) })
            } else {
                alert('Budget NOT recycled')
            }
        } catch (error) { alert(error) }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: "UTC"
        };

        const lastUpdated = date.toLocaleDateString("en-US", options);
        return `Last updated on ${lastUpdated}`;
    };

    return (
        <div className="compBudgetList">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h5 className="h2">My Budget List</h5>
            </div>

            <div className="row">
                <div className="d-flex flex-column mt-3">

                    {state.budgets?.map(budget => {
                        if (budget.role === 'creator') {

                            return <div key={"budget" + budget.ID} className="placeholder-budget mx-3 my-2 px-5 py-4 rounded-3 shadow">
                                <div className="d-flex">
                                    <div className="col-10">
                                        <h5><Link to={"/app/decomp/folders/" + budget.ID}>{budget.title}</Link></h5>
                                    </div>
                                    <div className="d-flex col-2 justify-content-end">
                                        <div className="btn-toolbar mb-2 mb-md-0">
                                            <div className="btn-group me-2">
                                                <a type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-share"></i></a>
                                                <a type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-three-dots-vertical"></i></a>
                                                <a type="button" onClick={() => { recycleBudget(budget.ID) }} className="btn btn-sm btn-outline-secondary"><i className="bi bi-x-lg"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="m-0 text-muted">{
                                    budget.description ? budget.description : 'No description available'
                                }</p>
                                <p className="m-0 text-muted">{formatDate(budget.lastUpdate)}</p>
                            </div>
                        } else { return '' }
                    })}

                </div>
            </div>
        </div>
    );
};

export default ListBudget;