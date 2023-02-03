import { Link } from "react-router-dom";
import { roundAccurately } from "../../../helpers/helper";

const columns = [
    {
        id: 'code',
        name: 'Código',
        selector: row => row["code"],
        compact: true,
        sortable: true
    },
    {
        id: 'unit',
        name: 'Ud',
        selector: row => row["unit"],
        sortable: true,
        compact: true,
        reorder: true
    },
    {
        id: 'name',
        name: 'Resumen',
        selector: row => row["name"],
        sortable: true,
        grow: 4,
        reorder: true
    },
    {
        id: 'amount',
        name: 'Cantidad',
        selector: row => row["amount"],
        format: row => roundAccurately(row["amount"], 3),
        sortable: true,
        right: true,
        reorder: true,
    },
    {
        id: 'price',
        name: 'Precio',
        selector: row => row["price"],
        right: true,
        reorder: true,
    },
    {
        id: 'cost',
        name: 'Importe',
        selector: row => roundAccurately(row["price"] * row["amount"], 3),
        sortable: true,
        right: true,
        reorder: true
    },
    {
        id: 'edit',
        name: 'Edit',
        selector: row => <Link to={'/app/login'}><span>Ver</span></Link>,
        sortable: false,
        right: true,
        reorder: true
    }
];

const customStyles = {
    rows: {
        style: {
            minHeight: '72px',
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
  };

export {
    columns,
    customStyles
}