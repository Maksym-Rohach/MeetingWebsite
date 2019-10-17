import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row,Input } from 'reactstrap';

class Modals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      danger: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
                <Button color="danger" onClick={this.toggleDanger} className="mr-1">Забанить</Button>
                <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Забанить</ModalHeader>
                  <ModalBody>
                    <Input placeholder="Причина"></Input>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={this.toggleDanger}>Забанить</Button>{' '}
                    <Button color="info" onClick={this.toggleDanger}>Відміна</Button>
                  </ModalFooter>
                </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Modals;
