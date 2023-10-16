"use client"
import { Table } from 'react-bootstrap';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import './prestaciones.css';

export default function Prestaciones() {
  return (
    <>
        <div className="solicitar">
            <a href="/prestacionesSolicitar">
                <FontAwesomeIcon icon={faCirclePlus}/> Solicitar Prestación
            </a>
        </div>
        <div>
            {true ? (
                <Table responsive borderless className="prestacionesTable">
                    <thead>
                        <tr>
                            <th>DNI</th>
                            <th>Apellido y Nombre</th>
                            <th>Fecha Solicitud</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>11111111</td>
                            <td>Román Ramón</td>
                            <td>09/12/2021</td>
                            <td>Pendiente</td>
                        </tr>
                        <tr>
                            <td>11111111</td>
                            <td>Román Ramón</td>
                            <td>09/12/2021</td>
                            <td>Pendiente</td>
                        </tr>
                    </tbody>
                </Table>
            ) : 
            ( 
            <Container fluid>
              <Row className="justify-content-md-center">
                <Col  xs={12} sm={4} md={4}>
                  <Image src="https://media.discordapp.net/attachments/756140354008514571/1123714447207309444/peticionesInmediatas.png" fluid />
                </Col>
              </Row>
            </Container>
            )}
        </div>
    </>
  );
}