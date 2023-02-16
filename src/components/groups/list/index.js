import "./style.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { customStyles } from "./configTable";
import API from "../../../config/API";
import Loading from "../../theme/loading";
import Breadcrumb from "../../theme/breadcrumb";
import ConceptInfo from "../../concepts/information";
import ToolBar from "../../theme/toolBar";
import PopUpCreateConcept from "../../concepts/popUpCreateConcept";
import PopUpEditConcept from "../../concepts/popUpEditConcept";

const GroupsList = () => {
  const { idFolder } = useParams();

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

  const awaitResponses = async () => {
    const promiseGroupsList = API.get('groups/list/' + idFolder);
    const promiseFolderPath = API.get('folders/path/' + idFolder);

    const [listElements, pathInfo] = await Promise.all([promiseGroupsList, promiseFolderPath])

    setState({
      ...state,
      status: "loaded",
      elements: listElements.data,
      targetIdShowInfo: listElements.data[0]?.id,
      pathInfo: pathInfo.data,
      userRole: pathInfo.data.role,
      dataForm: {},
      targetElementId: listElements.data[0]?.id
    });
  };

  useEffect(() => {
    awaitResponses();
  }, [state.lastModified]);

  const deleteGroup = async (idGroup) => {

    try {
      const res = await API.del('groups/del/' + idGroup);
      if (res.status) {
        console.log('Group erased correctly');
        setState({ ...state, lastModified: (+new Date()) })
      } else {
        alert('Group NOT eliminated')
      }
    } catch (error) { alert(error) }
  };

  const createNewGroup = async (code, id_typeunit, name) => {

    try {
      const res = await API.post('groups/add', {
        id_budget: state.pathInfo.idBudget,
        code,
        id_typeunit,
        name
      });

      if (res.status) {
        setState({ ...state, popup: { ...state.popup, create: false }, lastModified: (+new Date()) })
      } else {
        alert("new group was not created")
      }
    } catch (error) { alert(error); }
  };

  const updateGroup = async (idGroup, objInfoToUpdate) => {

    try {
      const res = await API.put('groups/update/' + idGroup, objInfoToUpdate);

      if (res.status) {
        setState({ ...state, popup: { ...state.popup, modify: false }, lastModified: (+new Date()) });
      } else {
        alert("group was not modified");
      }

    } catch (error) { alert(error); }
  };

  const increaseOrder = async (groupId) => {
    console.log('TBD')
  };

  const decreaseOrder = async (groupId) => {
    console.log('TBD')
  };

  if (state.status === "loading") {
    return <Loading text={'loading...'} />
  } else { console.log(state.elements) };

  return (
    <div className="compGroupsList vh-100">

      <h5>{state.pathInfo.budgetTitle}</h5>

      <Breadcrumb path={[
        [state.pathInfo.budgetId, state.pathInfo.budgetTitle],
        [state.pathInfo.folderId, state.pathInfo.folderName]
      ]} />

      <ToolBar
        style={{ visibility: (state.userRole === "viewer") ? 'hidden' : 'visible' }}
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
            [{
              id: 'code',
              name: 'Code',
              selector: row => row["code"],
              compact: true,
              sortable: true
            },
            {
              id: 'type',
              name: 'Type',
              selector: row => <i className="bi bi-share"></i>,
              compact: true,
              sortable: true
            },
            {
              id: 'unit',
              name: 'Unit',
              selector: row => row["unit"],
              compact: true,
              sortable: false
            },
            {
              id: 'name',
              name: 'Name',
              selector: row => <Link to={'/app/decomp/items/' + row.id}>{row["name"]}</Link>,
              sortable: true,
              grow: 4,
              reorder: true,
            },
            {
              id: 'amount',
              name: 'Quantity',
              selector: row => row["amount"],
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
              }).format(row['totalPrice'] * row["amount"]),
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

                <i onClick={() => { deleteGroup(row.id) }}
                  className="bi bi-x-square"></i>
              </div>,
              sortable: false,
              right: true,
              reorder: true
            }]
          }
        />
      </div>

      {
        state.popup.modify &&
        <PopUpEditConcept
          closePopup={() => { setState({ ...state, popup: { ...state.popup, modify: false } }) }}
          trigger={updateGroup}
          elements={state.elements}
          elementFocus={state.dataForm}
        />
      }

      {
        state.popup.create &&
        <PopUpCreateConcept
          closePopup={() => { setState({ ...state, popup: { ...state.popup, create: false } }) }}
          trigger={createNewGroup}
          elements={state.elements}
        />
      }

      <div className="mt-4">
        <ConceptInfo
          elementType={'folders'}
          targetElementId={state.targetIdShowInfo}
        />
      </div>

    </div>
  );
}

export default GroupsList;