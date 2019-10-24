/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  Badge,
  Button,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container
} from "reactstrap";

class Tables extends React.Component {
  render() {
    let counter = 1;
    return (
      <>
       <div className="app flex-row align-items-center">
         <Container>
          <Row className="justify-content-center pt-5 mt-5">
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Vip таблиця</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                      <th>#</th>
                        <th>Нікнейм</th>
                        {/* <th>Країна</th> */}
                        <th>Діє до</th>
                        <th>Місто</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{counter++}</td>
                        <td>Помідорка</td>
                        <td>31.12.19</td>
                        <td>Rivne</td>
                        
                        <td><Badge style={{ width: 70 }} color="info">Активний</Badge></td>
                        
                        {/* <td>Активний</td> */}
                      </tr>
                      <tr>
                        <td>{counter++}</td>
                        <td>Minerva Hooper</td>
                        <td>31.12.19</td>
                        <td>Kiyiv</td>
                        <td><Badge style={{ width: 70 }} color="info">Активний</Badge></td>
                      </tr>
                      <tr>
                        <td>{counter++}</td>
                        <td>Sage Rodriguez</td>
                        <td>31.12.19</td>
                        <td>Lviv</td>
                        <td><Badge style={{ width: 70 }} color="info">Активний</Badge></td>
                       </tr>
                      <tr>
                        <td>{counter++}</td>
                        <td>Philip Chaney</td>
                        <td>31.12.19</td>
                        <td>Odessa</td>
                        <td><Badge style={{ width: 70 }} color="info">Активний</Badge></td>
                        </tr>
                   
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Tables;
