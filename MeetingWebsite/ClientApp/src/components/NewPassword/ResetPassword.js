import React from "react";
import { connect } from 'react-redux';
import get from "lodash.get";
import { push } from 'react-router-redux';
import * as getListActions from './reducer';
import EclipseWidget from '../eclipse';
import Select from 'react-select';

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
  Form,
  InputGroup,
  Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";


class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    isLoading: true,
    email: '',
    oldPass: '',
    newPass: ''
    };
  }


//Table
  handleChange = (name, selectValue) => {
    this.setState({ [name]: selectValue },this.filterSearchData);
  }

  filterSearchData = () => {
    const { email,oldPass,newPass} = this.state;
    this.props.getResetData({email,oldPass,newPass});
  }

  componentDidMount = () => {
    const { email,oldPass,newPass} = this.state;
    this.props.getResetData({email,oldPass,newPass});
  }

  Click(e)
  {
    e.preventDefault();
    const { email,oldPass,newPass} = this.state;
    this.props.getResetData({email,oldPass,newPass});
  }

  PostFilters = (name, selectValue) => {
    this.setState({ [name]: selectValue});
  }

  render() {
    const {  } = this.state;
    const {isListLoading } = this.props;
    console.log("---state--------------------------------", this.state);
    console.log("---props--------------------------------", this.props);
    return (
      <>
      {isListLoading && <EclipseWidget />}
        <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center pt-5 mt-5">
            <Col md="8">
                <Card className="p-4">
                  <CardBody>
                  <Form>
                  <Row>
                  <CardTitle tag="h4">Зміна паролю</CardTitle>
                  </Row>
                    <Row>
                      <Input
                        onChange={(e) => this.PostFilters("email",`${e.target.value}`)}
                        placeholder="Пошта"/>
                    </Row>
                    <Row>
                      <Input
                        onChange={(e) => this.PostFilters("oldPass",`${e.target.value}`)}
                        placeholder="Введіть ваш поточний пароль"/>
                    </Row>
                    <Row>
                      <Input
                        onChange={(e) => this.PostFilters("newPass",`${e.target.value}`)}
                        placeholder="Введіть ваш новий пароль"/>
                    </Row>
                    <Row>
                       <Button onClick={(e)=>this.Click(e)} color='info'>
                        Підтвердити
                      </Button>
                    </Row>           
                    </Form>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div className="content">
          <Row>
            <Col md="12">
              <Card >
                <CardBody>
                      
                </CardBody>
                {/* <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Нікнейм</th>
                        <th>Пошта</th>
                        <th>Дата реєстрації</th>
                        <th>Місто</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody className="align-items-center">
                    {
                        listUsers.map(item => {
                          return (<tr key={item.id}>
                            {/* <th scope="row">{counter++}</th> }
                            <td>{item.nickname}</td>
                            <td>{item.mail}</td>
                            <td>{item.registrdate}</td>
                            <td>{item.city}</td>
                            <td>
                            <div className="animated fadeIn">
                            <Button 
                            onClick={(e) => this.SetBan(e,item.id)}
                           color = {item.status==="Не забанений"?"info":"warning"}>{item.status}</Button>
                           <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                              className={'modal-danger ' + this.props.className}>
                              <ModalHeader toggle={this.toggleDanger}>Забанить</ModalHeader>
                              <ModalBody>
                              <Input style={{color:"black"}} onChange={(e) => this.PostBanFilters(`${e.target.value}`)} placeholder="Причина"></Input>
                              </ModalBody>
                              <ModalFooter>
                                <Button color="danger" onClick={this.Ban}>Так</Button>{' '}
                                <Button color="secondary">Ні</Button>
                              </ModalFooter>
                            </Modal>
                    </div>   
                        </td>
                        </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>    

                    <Paginator callBackParams={this.onClickPage} totalCount={this.props.totalCount} currentPage={this.state.temp_currentpage} >
                   </Paginator>       
                </CardBody>}
              </Card>
            </Col>
          </Row>
        </div> */}
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log("State=======", state);
  return {
    //listUsers: get(state, "userTable.list.ok"),
    isListLoading: get(state, "resetPassword.list.loading"),  
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getResetData: filter => {
      dispatch(getListActions.getResetData(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

