import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  ButtonDropdown,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from 'reactstrap';


class Dashboard extends Component {
    render() { 
      return (
          <>
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-info">
                <CardBody className="pb-0">
                  <ButtonGroup className="float-right">
                    <ButtonDropdown id='card1'>
                      <DropdownToggle caret className="p-0" color="transparent">
                        <i className="icon-settings"></i>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Another action</DropdownItem>
                        <DropdownItem disabled>Disabled action</DropdownItem>
                        <DropdownItem>Something else here</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </ButtonGroup>
                  <div className="text-value">9.823</div>
                  <div>Members online</div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                  <Line height={70} />
                </div>
              </Card>
            </Col>
            </Row>
            </div>
            </>
      );
    }
}

export default Dashboard;