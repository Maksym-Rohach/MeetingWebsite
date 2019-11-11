import React from "react";
import { connect } from 'react-redux';
import get from "lodash.get";
import { push } from 'react-router-redux';
import * as getListActions from './reducer';
import EclipseWidget from '../eclipse';
import Select from 'react-select';
//import Paginator from '../../../Paginator';
//import './color.scss';

//import Modal from '../../../Notifications/Modals/Modals';

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
  Button,
  Input,
  Pagination, 
  PaginationItem,
  PaginationLink,
  Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";

class UserProfileModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    isLoading: true,
    danger: true,
    id:'',
    nickname:'',
    gender:'',
    birthday:'',
    avatar:'',
    zodiac:'',
    city:'',
    status:''
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

  handleChange = (name, selectValue) => {
    this.setState({ [name]: selectValue },this.filterSearchData);
  }

  componentDidMount = () => {
    this.props.getUserModalData({"id":"04584ded-5bbf-4517-b418-f0d6a16602e3"});
  }

  Click(e)
  {
    e.preventDefault();
  }

  render() {
    const {  } = this.state;
    const { nickname,gender,birthday,avatar,zodiac,city,status, isListLoading } = this.props;
    console.log("---state--------------------------------", this.state);
    console.log("---props--------------------------------", this.props);
    return (
      <>
      {isListLoading && <EclipseWidget />}
      <div className="content">
          <Row>
            <Col md="12">
              <Card >
                           <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                              className={'modal-danger ' + this.props.className}>
                              <ModalHeader  toggle={this.toggleDanger}>
                              <Row>{nickname}</Row>
                              </ModalHeader>
                              <ModalBody>
                              <Row>{gender}</Row>
                              <Row>{birthday}</Row>
                              <Row>{avatar}</Row>
                              <Row>{zodiac}</Row>
                              <Row>{city}</Row>
                              <Row>{status}</Row>
                              </ModalBody>
                              <ModalFooter>
                                <Button color="danger">Так</Button>{' '}
                              </ModalFooter>
                            </Modal>  
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log("State=======", state);
  return {
    nickname: get(state, "userModalReducer.list.nickname"),
    gender: get(state, "userModalReducer.list.gender"),
    birthday: get(state, "userModalReducer.list.birthday"),
    avatar: get(state, "userModalReducer.list.avatar"),
    zodiac: get(state, "userModalReducer.list.zodiac"),
    city: get(state, "userModalReducer.list.city"),
    status: get(state, "userModalReducer.list.status"),
    isListLoading: get(state, "userModalReducer.list.loading"),  
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserModalData: filter => {
      dispatch(getListActions.getUserModalData(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileModal);

