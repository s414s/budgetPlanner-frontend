import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";
import DataTable from "react-data-table-component";
import items from "./example-items"
import styled from "styled-components";
import { roundAccurately } from "../../../helpers/helper";

// https://stackoverflow.com/questions/67272187/reactjs-7-how-to-conditionally-change-the-background-color-of-table-cell-only

// https://codesandbox.io/s/upbeat-galileo-r7p34?file=/src/App.js:195-207

const StyledCell = styled.div`
  &.calculated {
    color: green !important;
  }
  &.fixed {
    background: orange;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  &.high {
    color: red !important;
  }
`;

const StyledCell2 = styled.div`
    color: ${props => props.colorFont} !important;
    color: ${props => props.colorBackground} !important;
`;

const getTextColor = (status) => {
    const colors = {
        calculated: "pink",
        fixed: "blue",
        high: "red"
    };

    return colors[status];
};

const getBackgroundColor = (status) => {
    const colors = {
        editable: "yellow",
        uneditable: "gray"
    };

    return colors[status];
};

const columns = [
    {
        id: 'code',
        name: 'Código',
        selector: row => row["code"],
        compact: true,
        sortable: true
    },
    {
        id: 'type',
        name: 'Tipo',
        selector: row => row["type"],
        sortable: true,
        grow:0.5,
        reorder:true
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
        name: 'Nombre',
        selector: row => row["name"],
        sortable: true,
        grow: 4,
        reorder: true
    },
    {
        id: 'quantity',
        name: 'Cantidad',
        selector: row => row["quantity"],
        sortable: true,
        right: true,
        reorder: true,
        cell: (row) => (
            <StyledCell2 
                colorFont={getTextColor(row.priceStatus)} 
                colorBackground={getBackgroundColor(row.priceStatus)}>
                    {row.quantity}
            </StyledCell2>
        )
    },
    {
        id: 'price',
        name: 'Precio',
        sortable: true,
        right: true,
        reorder: true,
        cell: (row) => (
            <StyledCell className={row.priceStatus}>
                {roundAccurately(row["price"], 3)}
            </StyledCell>
        )
    },
    {
        id: 'cost',
        name: 'Importe',
        selector: row => row["cost"],
        sortable: true,
        right: true,
        reorder: true
    },
    {
        id: 'provider',
        name: 'Proveedor',
        selector: row => row["provider"],
        sortable: true,
        right: true,
        reorder: true
    }
];

const paginationOptions = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selecAllRowsItemText: 'Todos'
};

const ItemsList = () => {

    const params = useParams();

    return (
        <div className="table-responsive">
            <DataTable
                columns={columns}
                data={items}
                keyField='id'
                title="Componentes"
                pagination
                paginationPerPage={20}
                paginationRowsPerPageOptions={[20,25,30]}
                paginationComponentOptions={paginationOptions}
                fixedHeader={true}
                fixedHeaderScrollHeight="600px"
                dense
                highlightOnHover={true}
                striped={true}
            />
        </div>
    );
};

export default ItemsList;