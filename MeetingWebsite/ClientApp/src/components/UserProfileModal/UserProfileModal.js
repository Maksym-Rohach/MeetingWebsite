import React from "react";
import { connect } from 'react-redux';
import get from "lodash.get";
import { push } from 'react-router-redux';
import * as getListActions from './reducer';
import EclipseWidget from '../eclipse';
import Select from 'react-select';
import { Link } from 'react-router-dom';
//import Paginator from '../../../Paginator';
import '../admin/Tables/UserTable/color.scss';

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
  CardText,
  CardFooter,
  Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";

class UserProfileModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    isLoading: true,
    danger: false,
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
    const {id}=this.props;
    this.setState({danger:this.props.danger})
    this.props.getUserModalData({"id":id});
  }

  Click(e)
  {
    e.preventDefault();
  }

  render() {
    const {  } = this.state;
    const { nickname,gender,birthday,avatar,zodiac,city,status, isListLoading } = this.props;
    console.log("---state ON MODAL!!!!!!!--------------------------------", this.state);
    console.log("---props ON MODAL!!!!!!!--------------------------------", this.props);
    return (
      <>
      {isListLoading && <EclipseWidget />}
      <div className="content">
          <Row>
            <Col md="12">
              <Card  className="fontnikita">
                <Modal style={{width: 1000,maxWidth:1000}} isOpen={this.state.danger} toggle={this.toggleDanger}
                             className={'modal-danger ' + this.props.className}>
            <Container className= "align-items-center content-section  bg-dark text-black ">
           		<div className="profile_inner p_120">
					<div className="row">
						<div className="col-lg-5">
							<img className="img-fluid" src="https://www.odt.co.nz/sites/default/files/styles/odt_landscape_extra_large_4_3/public/story/2018/11/attractive_man_getty.jpg?itok=8ML4TBUu" alt=""/>
						</div>
						<div className="col-lg-7">
							<div className="personal_text">
								<h6> </h6>
								<h3>{nickname}</h3>
                <h4>{gender}</h4>
								<h4>Місто:  {city}</h4>
                <h4>Вік:  {birthday} років</h4>
                <h4>Знак зодіаку:  {zodiac}</h4>
                <h4 className="align-items-center">Статус:</h4>
								<p>{status}</p>
							</div>
						</div>
					</div>
           		</div>
               </Container>
               <ModalFooter className= "bg-dark">
                 <Link to="/user">
                  <Button  color="info">Написати</Button>{' '}
                  </Link>
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

