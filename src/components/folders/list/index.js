import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./style.css";
import DataTable from "react-data-table-component";
import { customStyles } from "./configTable";
import API from "../../../config/API";
import Loading from "../../theme/loading";
import Breadcrumb from "../../theme/breadcrumb";
import PopUpEditConcept from "../../concepts/popUpEditConcept";
import ConceptInfo from "../../concepts/information";
import ToolBar from "../../theme/toolBar";
import PopUpCreateConcept from "../../concepts/popUpCreateConcept";

const FoldersList = () => {
  const { idBudget } = useParams();

  const [state, setState] = useState({
    status: "loading",
    elements: [],
    dataForm: {},
    lastModified: 1,
    popup: {
      create: false,
      modify: false
    }
  });

  useEffect(() => {

    (async () => {
      const promiseFoldersList = API.get('folders/list/' + idBudget);
      const promiseBudgetInfo = API.get('budgets/get/' + idBudget);

      const [listElements, budgetInfo] = await Promise.all([promiseFoldersList, promiseBudgetInfo])

      setState({
        ...state,
        status: "loaded",
        elements: listElements.data,
        targetIdShowInfo: listElements.data[0]?.id,
        budgetInfo: budgetInfo.data,
        userRole: budgetInfo.data.role,
        dataForm: {},
        targetElementId: listElements.data[0]?.id
      });

    })();
    console.log("status", state.status)

  }, [state.lastModified]);

  const deleteFolder = async (idFolder) => {

    try {
      const res = await API.del('folders/del/' + idFolder);
      if (res.status) {
        setState({ ...state, lastModified: (+new Date()) })
      } else {
        alert('Folder NOT eliminated')
      }
    } catch (error) { alert(error) }
  };

  const createNewFolder = async (code, summary) => {

    try {
      const res = await API.post('folders/add', {
        "id_budget": idBudget,
        "code": code,
        "name": summary
      });

      if (res.status) {
        setState({ ...state, popup: { ...state.popup, create: false }, lastModified: (+new Date()) })
      } else {
        alert("New folder was not created")
      }

    } catch (error) {
      alert(error);
    }

  };

  const modifyFolder = async (idFolder, objInfoToUpdate) => {

    try {
      const res = await API.put('folders/update/' + idFolder, objInfoToUpdate);

      if (res.status) {
        setState({ ...state, popup: { ...state.popup, modify: false }, lastModified: (+new Date()) });
      } else {
        alert("Folder not modified");
      }

    } catch (error) {
      alert(error);
    }

  };

  const increaseOrder = async (elementId) => {
    console.log('TBD')
  };

  const decreaseOrder = async (elementId) => {
    console.log('TBD')
  };

  // https://react-data-table-component.netlify.app/?path=/docs/api-custom-conditional-formatting--page

  if (state.status === "loading") {
    return <Loading text={'loading...'} />
  } else { console.log(state.elements) }

  return (
    <div className="compFoldersList vh-100">

      <h5>{state.budgetInfo.title}</h5>

      <Breadcrumb path={[
        [state.budgetInfo.budgetId, state.budgetInfo.title]
      ]} />

      <ToolBar
        style={{ visibility: (state.userRole === 'viewer') ? 'hidden' : 'visible' }}
        openCreatePortal={() => { setState({ ...state, popup: { ...state.popup, create: true } }) }}
        increaseOrder={increaseOrder}
        decreaseOrder={decreaseOrder}
      />

      <div className="table-responsive h-25">
        <DataTable
          data={state.elements}
          keyField="id"
          fixedHeader={true}
          fixedHeaderScrollHeight="600px"
          dense
          highlightOnHover={true}
          customStyles={customStyles}
          onRowClicked={row => { setState({ ...state, targetIdShowInfo: row.id }) }}
          columns={
            [
              {
                id: 'code',
                name: 'Code',
                selector: row => row["code"],
                compact: true,
                sortable: true
              },
              {
                id: 'type',
                name: 'Type',
                selector: row => <i className="bi bi-folder"></i>,
                compact: true,
                sortable: true
              },
              {
                id: 'name',
                name: 'Name',
                selector: row => <Link to={'/app/decomp/groups/' + row.id}>{row["name"]}</Link>,
                sortable: true,
                grow: 4,
                reorder: true,
              },
              {
                id: 'amount',
                name: 'Quantity',
                selector: row => 1,
                right: true,
                reorder: true,
              },
              {
                id: 'price',
                name: 'Price',
                selector: row => new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'EUR',
                  maximumFractionDigits: 2
                }).format(row['totalPrice']),
                right: true,
                reorder: true,
              },
              {
                id: 'cost',
                name: 'Cost',
                selector: row => new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'EUR',
                  maximumFractionDigits: 2
                }).format(row['totalPrice'] * 1),
                sortable: true,
                right: true,
                reorder: true
              },
              {
                id: 'options',
                name: '',
                omit: (state.userRole === 'viewer'),
                selector: row => <div className="optionsIcons">
                  <i onClick={() => {
                    setState({
                      ...state,
                      dataForm: { id: row.id, code: row.code, summary: row.name },
                      popup: { ...state.popup, modify: true }
                    })
                  }} className="bi bi-pencil-square"></i>

                  <i onClick={() => { deleteFolder(row.id) }}
                    className="bi bi-x-square"></i>
                </div>,
                sortable: false,
                right: true,
                reorder: true
              }
            ]
          }
        />
      </div>

      {
        state.popup.modify &&
        <PopUpEditConcept
          closePopup={() => { setState({ ...state, popup: { ...state.popup, modify: false } }) }}
          trigger={modifyFolder}
          elements={state.elements}
          elementFocus={state.dataForm}
        />
      }

      {
        state.popup.create &&
        <PopUpCreateConcept
          closePopup={() => { setState({ ...state, popup: { ...state.popup, create: false } }) }}
          trigger={createNewFolder}
          elements={state.elements}
        />
      }

      <div className="mt-4">
        <ConceptInfo
          elementType={'folders'}
          targetElementId={state.targetIdShowInfo ? state.targetIdShowInfo : 0}
        />
      </div>

    </div>
  );
}

export default FoldersList;