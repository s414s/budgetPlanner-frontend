import "./style.css";
import { useState } from "react";
import { validateCodeUnique } from "../../../helpers/helper";
import { compareObj } from "../../../helpers/helper";

const PopUpEditGroup = (props) => {

    const [state, setState] = useState({
        code: "",
        summary: "",
        amount: ""
    });

    return <>
        <div className="overlayStyles" />
        <div className="modalStyles" >
            <h5>Edit Group</h5>
            <form className="compPopUpCreateComponent">
                <div className="text-end"><i onClick={props.closePopup} className="bi bi-x-lg"></i></div>
                <div className="mb-3">
                    <label className="form-label">Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputCode"
                        placeholder={props.elementFocus.code}
                        onChange={(e) => { setState({ ...state, code: e.target.value }) }}
                    />
                    <div
                        id="errorCode"
                        className="form-text text-danger"
                        style={{ visibility: validateCodeUnique(state.code, props.elements) ? 'hidden' : 'visible' }} >
                        Code already exists
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Summary</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputCode"
                        placeholder={props.elementFocus.summary}
                        onChange={(e) => { setState({ ...state, name: e.target.value }) }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputCode"
                        placeholder={props.elementFocus.amount}
                        onChange={(e) => { setState({ ...state, amount: e.target.value }) }}
                    />
                </div>
                
                <button type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        console.log('trigger', props.elementFocus.id, state)
                        props.trigger(props.elementFocus.id,
                            compareObj({
                                code: props.elementFocus.code,
                                name: props.elementFocus.name,
                                amount: props.elementFocus.amount
                            }, state))
                    }}

                    disabled={(state.code.length >= 0 ?
                        !validateCodeUnique(state.code, props.elements)
                        : true)}>
                    Enviar
                </button>
            </form>
        </div>
    </>

}

export default PopUpEditGroup;