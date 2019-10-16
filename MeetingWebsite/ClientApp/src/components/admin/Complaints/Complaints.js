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
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container,
  Button
} from "reactstrap";

class Tables extends React.Component {
  render() {
    return (
      <>
       <div className="app flex-row align-items-center">
         <Container>
          <Row className="justify-content-center pt-5 mt-5">
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Таблиця користувачів</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Нікнейм</th>
                        {/* <th>Країна</th> */}
                        <th>Дата скарги</th>
                        <th>Скарга</th>
                        <th>Відповіді</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Помідорка</td>
                        <td>27/10/18</td>
                        <td>Мене покусала собака</td>
                        <td><Button>Відповісти</Button></td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td><Button>Відповісти</Button></td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td><Button>Відповісти</Button></td>
                       </tr>
                      <tr>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td><Button>Відповісти</Button></td>
                        </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td><Button>Відповісти</Button></td>
                        </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td><Button>Відповісти</Button></td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td><Button>Відповісти</Button></td>
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
