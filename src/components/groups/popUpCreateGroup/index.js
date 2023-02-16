import "./style.css";
import { useState } from "react";
import { validateCodeUnique } from "../../../helpers/helper";

const PopUpCreateGroup = (props) => {

    const [state, setState] = useState({
        code: "",
        summary: "",
        amount: 0,
        id_typeunit: 1,
    });

    return <>
        <div className="overlayStyles" />
        <div className="modalStyles" >
            <h5>Create Group</h5>
            <form className="compPopUpCreateComponent">
                <div className="text-end"><i onClick={props.closePopup} className="bi bi-x-lg"></i></div>
                <div className="mb-3">
                    <label className="form-label">Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputCode"
                        onChange={(e) => { setState({ ...state, code: e.target.value }) }} />
                    <div
                        id="errorCode"
                        className="form-text text-danger"
                        style={{ visibility: validateCodeUnique(state.code, props.elements) ? 'hidden' : 'visible' }} >
                        Code already exists
                    </div>
                </div>
                <div className="mb-3">
                <div className="mb-3">
                    <label className="form-label">Summary</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputCode"
                        onChange={(e) => { setState({ ...state, summary: e.target.value }) }} />
                </div>
                    <label className="form-label">Quantity</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputCode"
                        onChange={(e) => { setState({ ...state, amount: e.target.value }) }} />
                </div>
                <button type="button"
                    className="btn btn-primary"
                    onClick={() => { props.trigger(state.code, state.summary) }}
                    disabled={(state.code.length > 0 ?
                        !validateCodeUnique(state.code, props.elements)
                        : true)}>
                    Send
                </button>
            </form>
        </div>
    </>
}

export default PopUpCreateGroup;