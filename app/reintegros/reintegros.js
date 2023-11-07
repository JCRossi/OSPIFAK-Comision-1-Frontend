"use client";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import './reintegros.css';
import { getReintegrosByClient } from './reintegrosFetch';
import Reintegro from "./reintegro";

export default function Reintegros() {
    const [reintegros, setReintegros] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchReintegros = async () => {
            try {
                setLoading(true);
                const usuario = localStorage.getItem('nombre');
                const response = await getReintegrosByClient(usuario);
                setReintegros(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchReintegros();
    }, []);

    return (
        <>
            <div className="solicitar">
                <a href="/reintegrosSolicitar">
                    <FontAwesomeIcon icon={faCirclePlus}/> Solicitar Reintegro
                </a>
            </div>
            <div>
                {loading ? (
                    <h1>Loading</h1>
                ) : (
                    <div>
                        <Row className="reintegros">
                            <Col>
                                {reintegros && reintegros.length === 0 ? (
                                    <p>No se encontraron reintegros.</p>
                                ) : (
                                    <div className="reintegro" style={{ marginBottom: "16px", padding: "16px" }}>
                                        <table className="reintegro-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr>
                                            <th className="text-muted" style={{ textAlign: "center", padding: "8px" }}>DNI</th>
                                            <th className="text-muted" style={{ textAlign: "center", padding: "8px" }}>Apellido y nombre</th>
                                            <th className="text-muted" style={{ textAlign: "center", padding: "8px" }}>Fecha solicitud</th>
                                            <th className="text-muted" style={{ textAlign: "center", padding: "8px" }}>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reintegros.map((reintegro) => (
                                                <Reintegro data={reintegro} key={reintegro.id} />
                                            ))}
                                        </tbody>
                                        </table>
                                    </div>
                                    
                                )}
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        </>
    );
}
