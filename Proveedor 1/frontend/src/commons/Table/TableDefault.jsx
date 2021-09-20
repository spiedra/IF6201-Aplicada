import React from "react";
import Container from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import Button from "../Button/Button";

import "./TableDefault.css";


const TableDefault = ({ attribute, handleChange, param }) => {
    if (attribute.list == null) {
        return (
            <Table responsive striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <td></td>
                    <td></td>
                    <td></td>
                </tbody>
            </Table>
        );
    }
    return (
        <Table responsive striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Categoria</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: attribute.list.length }).map((_, index) => (
                    <tr key={attribute.list[index].ID_PRODUCTO}>
                        <td>{attribute.list[index].NOMBRE}</td>
                        <td>{attribute.list[index].PRECIO}</td>
                        <td>{attribute.list[index].NOMBRE_CATEGORIA}</td>
                    </tr>
                ))}
            </tbody>
        </Table>


    );
}

export default TableDefault;