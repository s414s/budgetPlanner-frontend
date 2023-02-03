import "./style.css";
import { useState } from "react";
import { validateCodeUnique } from "../../../helpers/helper";

const PopUpCreateConcept = ( props ) => {

    const [state, setState] = useState({
        code: "",
        summary: ""
    });

    return <>
        <div className="overlayStyles" />
        <div className="modalStyles" >
        <form className="compPopUpCreateComponent">
                    <div className="text-end"><i onClick={props.closePopup} className="bi bi-x-lg"></i></div>
                    <div className="mb-3">
                        <label className="form-label">Código</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCode"
                            onChange={(e)=>{ setState({...state, code: e.target.value})}}
                        />
                        <div
                            id="errorCode"
                            className="form-text text-danger"
                            style={{visibility: validateCodeUnique(state.code, props.elements) ? 'hidden' : 'visible' }}
                             >
                                Código ya existente
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Resumen</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCode"
                            onChange={(e)=>{ setState({...state, summary: e.target.value})}}
                        />
                    </div>
                    <button type="button"
                        className="btn btn-primary"
                        onClick={ ()=>{ props.trigger(state.code, state.summary) } }
                        disabled={ ( state.code.length > 0? 
                            !validateCodeUnique(state.code, props.elements)
                            : true)
                        }>
                            Enviar
                    </button>
                </form>
        </div>
    </>

}

export default PopUpCreateConcept;