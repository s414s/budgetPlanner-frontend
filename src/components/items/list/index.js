import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import "./style.css";
import DataTable from "react-data-table-component";
import { columns, customStyles } from "./configTable";
import API from "../../../config/API";
import { useNavigate, Navigate } from "react-router-dom";
import Loading from "../../theme/loading";
import Breadcrumb from "../../theme/breadcrumb/breadcrumb";


const ItemsList = () => {

  const { idGroup } = useParams();
  //console.log(idItem, "ID");
  //console.log(type, "type")

  const [state, setState] = useState({

    status: "loading",
    elements: []

  });

  useEffect(()=>{ // si no pusiese await nunca veriamos el logo de cargando

    API.get('items/list/' + idGroup).then(listElements => {
      console.log(listElements);
      //const budget = await API.get('budgets/get/' + idItem); // va a petars
  
      setState({...state, status: "loaded", elements: listElements.data});  
    })

  },[]);

// Aplicar https://react-data-table-component.netlify.app/?path=/docs/api-custom-conditional-formatting--page

  if(state.status === "loading"){
    return (
      <Loading text={'cargando...'} />
    );
  } else { console.log(state.elements) };

  return (
    <div className="compConceptDecomp">

      <h5>Nombre Presupuesto</h5>

      <Breadcrumb path={['Raíz', 'Estructuras', 'Hormigón Armado', 'Viga de hormigón armado']} />

      <div className="btn-group">
        <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-share"></i></button>
        <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-calculator"></i></button>
        <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-sliders"></i></button>
      </div>

      <div className="table-responsive">
        <DataTable
            columns={columns}
            data={state.elements}
            keyField='id'
            fixedHeader={true}
            fixedHeaderScrollHeight="600px"
            dense
            highlightOnHover={true}
            customStyles={customStyles}
        />
      </div>

    </div>
  );
}

export default ItemsList;