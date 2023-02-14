import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from '../../../config/API';
import Loading from "../../theme/loading";

const ListBudgetShared = () => {

    const [state, setState] = useState({
        status: "loading",
        budgets: []
    });

    useEffect(() => {

        API.get('budgets/list/').then(resp => {
            setState({ ...state, status: "loaded", budgets: resp.data });
        });

    }, []);

    if (state.status === "loading") {
        return (
            <Loading text={'Cargando...'} />
        );
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
                <h5 className="h2">Shared Budget</h5>
            </div>

            <div className="row">
                <div className="d-flex flex-column mt-3">

                    {state.budgets?.map(budget => {
                        if (['editor', 'viewer'].includes(budget.role)) {

                            return <div key={"budget" + budget.ID} className="placeholder-budget mx-3 my-2 px-5 py-4 rounded-3 shadow">
                                <div className="d-flex">
                                    <div className="col-10">
                                        <h5><Link to={"/app/decomp/folders/" + budget.ID}>{budget.title}</Link></h5>
                                    </div>
                                    <div className="d-flex col-2 justify-content-end">
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

export default ListBudgetShared;