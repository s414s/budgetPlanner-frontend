import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from '../../../config/API';
import Loading from "../../theme/loading";

const RecyclingBin = () => {

    const [state, setState] = useState({
        status: "loading",
        budgets: [],
        lastModified: 1
    });

    useEffect(() => {

        API.get('budgets/list/').then(resp => {
            setState({
                ...state,
                status: "loaded",
                budgets: resp.data
            });
        });

    }, [state.lastModified]);

    if (state.status === "loading") {
        return (
            <Loading text={'Cargando...'} />
        );
    };

    const deleteBudget = async (idBudget) => {

        try {
            const res = await API.del('budgets/del/' + idBudget);
            if (res.status) {
                setState({ ...state, lastModified: (+new Date()) })
            } else {
                alert('Budget NOT eliminated')
            }
        } catch (error) { alert(error) }
    };

    const recoverBudget = async (idBudget) => {

        try {
            const res = await API.del('budgets/recover/' + idBudget);
            if (res.status) {
                setState({ ...state, lastModified: (+new Date()) })
            } else {
                alert('Budget NOT recovered')
            }
        } catch (error) { alert(error) }
    };

    const emptyBin = async () => {

        try {
            const res = await API.del('budgets/emptybin');
            if (res.status) {
                setState({ ...state, lastModified: (+new Date()) })
            } else {
                alert('Bin NOT emptied')
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
                <h5 className="h2">Recycling Bin</h5>
            </div>

            <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                    <a type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-arrow-bar-left"></i></a>
                    <a type="button" onClick={() => { emptyBin() }} className="btn btn-sm btn-outline-secondary"><i className="bi bi-x-lg"></i></a>
                </div>
            </div>

            <div className="row">
                <div className="d-flex flex-column mt-3">

                    {state.budgets?.map(budget => {
                        if (budget.role === 'bin') {
                            return <div key={"budget" + budget.ID} className="placeholder-budget mx-3 my-2 px-5 py-4 rounded-3 shadow">
                                <div className="d-flex">
                                    <div className="col-10">
                                        <h5><Link to={"/app/decomp/folders/" + budget.ID}>{budget.title}</Link></h5>
                                    </div>
                                    <div className="d-flex col-2 justify-content-end">
                                        <div className="btn-toolbar mb-2 mb-md-0">
                                            <div className="btn-group me-2">
                                                <a type="button" onClick={() => { recoverBudget(budget.ID) }} className="btn btn-sm btn-outline-secondary"><i className="bi bi-arrow-bar-left"></i></a>
                                                <a type="button" onClick={() => { deleteBudget(budget.ID) }} className="btn btn-sm btn-outline-secondary"><i className="bi bi-x-lg"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="m-0 text-muted">
                                    {budget.description ? budget.description : 'No description available'}
                                </p>
                                <p className="m-0 text-muted">{formatDate(budget.lastUpdate)}</p>
                            </div>
                        } else { return '' }
                    })}
                </div>
            </div>
        </div>
    );
};

export default RecyclingBin;