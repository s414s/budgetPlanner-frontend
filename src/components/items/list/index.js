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

const ItemsList = () => {
  const { idGroup } = useParams();

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
    const promiseItemsList = API.get('items/list/' + idGroup);
    const promiseGroupPath = API.get('groups/path/' + idGroup);

    const [listElements, pathInfo] = await Promise.all([promiseItemsList, promiseGroupPath])

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

  if (state.status === "loading") {
    return (
      <Loading text={'loaging...'} />
    );
  };

  const deleteItem = async (idItem) => {

    try {
      const res = await API.del('items/del/' + idItem);
      if (res.status) {
        setState({ ...state, lastModified: (+new Date()) })
      } else {
        alert('Item NOT eliminated')
      }
    } catch (error) { alert(error) }
  };

  const createNewItem = async (code, id_typeunit, name) => {

    try {
      const res = await API.post('items/add', {
        id_budget: state.pathInfo.idBudget,
        code,
        id_typeunit,
        name
      });

      if (res.status) {
        setState({ ...state, popup: { ...state.popup, create: false }, lastModified: (+new Date()) })
      } else {
        alert("new item was not created")
      }
    } catch (error) { alert(error); }
  };

  const updateItem = async (idItem, objInfoToUpdate) => {

    try {
      const res = await API.put('items/update/' + idItem, objInfoToUpdate);

      if (res.status) {
        setState({ ...state, popup: { ...state.popup, modify: false }, lastModified: (+new Date()) });
      } else {
        alert("item was not modified");
      }

    } catch (error) { alert(error); }
  };

  const increaseOrder = async (groupId) => {
    console.log('TBD')
  };

  const decreaseOrder = async (groupId) => {
    console.log('TBD')
  };

  return (
    <div className="compItemsList vh-100">

      <h5>{state.pathInfo.budgetTitle}</h5>

      <Breadcrumb path={[
        [state.pathInfo.budgetId, state.pathInfo.budgetTitle],
        [state.pathInfo.folderId, state.pathInfo.folderName],
        [state.pathInfo.groupId, state.pathInfo.groupName]
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
              selector: row => <i className="bi bi-bricks"></i>,
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
              selector: row => row["name"],
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
              }).format(row['price']),
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
              }).format(row['price'] * row["amount"]),
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

                <i onClick={() => { deleteItem(row.id) }}
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
          trigger={updateItem}
          elements={state.elements}
          elementFocus={state.dataForm}
        />
      }

      {
        state.popup.create &&
        <PopUpCreateConcept
          closePopup={() => { setState({ ...state, popup: { ...state.popup, create: false } }) }}
          trigger={createNewItem}
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
};

export default ItemsList;