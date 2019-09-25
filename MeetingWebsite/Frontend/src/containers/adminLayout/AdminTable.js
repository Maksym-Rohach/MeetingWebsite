import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class Tables extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Таблиця користувачів
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Ім'я</th>
                    <th>Дата реєстрації</th>
                    <th>Роль</th>
                    <th>Статус</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Петро</td>
                    <td>2012/01/01</td>
                    <td>Користувач</td>
                    <td>
                      <Badge color="success">Активний</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Василь</td>
                    <td>2012/02/01</td>
                    <td>Користувач</td>
                    <td>
                      <Badge color="danger">Забанений</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Микита</td>
                    <td>2012/02/01</td>
                    <td>Адмін</td>
                    <td>
                      <Badge color="success">Активний</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Ольга</td>
                    <td>2012/03/01</td>
                    <td>Користувач</td>
                    <td>
                      <Badge color="warning">Замучений</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Давідік</td>
                    <td>2012/01/21</td>
                    <td>Модератор</td>
                    <td>
                      <Badge color="success">Активний</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
          </Row>
          </div>
          
);
}
}

export default Tables;