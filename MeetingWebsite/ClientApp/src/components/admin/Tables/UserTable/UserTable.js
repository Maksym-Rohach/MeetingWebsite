import React from "react";
import { connect } from 'react-redux';
import get from "lodash.get";
import { push } from 'react-router-redux';
import * as getListActions from './reducer';
import EclipseWidget from '../../../eclipse';
import Select from 'react-select';
import Paginator from '../../../Paginator';
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

const optionsMonth = [
  
  { value: '1', label: 'Січень' },
  { value: '2', label: 'Лютень' },
  { value: '3', label: 'Березень' },
  { value: '4', label: 'Квітень' },
  { value: '5', label: 'Травень' },
  { value: '6', label: 'Червень' },
  { value: '7', label: 'Липень' },
  { value: '8', label: 'Серпень' },
  { value: '9', label: 'Вересень' },
  { value: '10', label: 'Жовтень' },
  { value: '11', label: 'Листопад' },
  { value: '12', label: 'Грудень' }
];

const optionsYear = [
  { value: '2018', label: '2018р' },
  { value: '2019', label: '2019р' },
  { value: '2020', label: '2020р' },
];


class UserTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    isLoading: true,
    tmp_NickName: '',
    tmp_month: { value: '1', label: 'Січень' },
    tmp_year: { value: '2020', label: '2020р' }, 
    modal: false,
    danger: false,
    temp_id:'',
    temp_description:'',
    temp_currentpage: 1,
    totalCount:0
    };
    this.toggle = this.toggle.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);  
  }
//Modal
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  SetBan=(e,id)=>
  {
    e.preventDefault();
    console.log("SETBAN__________________________________",id);
     this.setState({temp_id:id});
     this.toggleDanger();
  }

  onClickPage(pageNumber) {
   // const { typeOfSort, sortByAscending } = this.props;
    console.log("STATEEEEEEEEEEEEEEEEEEE__________________________________",this);
    const { tmp_year,tmp_month,tmp_NickName,temp_currentpage } = this.state;

    let year = tmp_year.value;
    let month = tmp_month.value;
    let nickname = tmp_NickName;
    let currentPage = temp_currentpage;
    this.setState({ currentPage: pageNumber });
    this.props.getUsersData({ year,month,nickname,currentPage: pageNumber});
  }

  Ban=()=>
  {
    const { temp_id,temp_description} = this.state;
    let id=temp_id;
    let description=temp_description;
    // const { tmp_year,tmp_month,tmp_NickName,temp_currentpage } = this.state;
    // let year = tmp_year.value;
    // let month = tmp_month.value;
    // let nickname = tmp_NickName;
    // let currentPage = temp_currentpage;
    console.log("BAN228__________________________________",id,description);
    console.log("Ban====================");
    this.props.BanUser({id,description});
    //this.props.getUsersData({ year,month,nickname,currentPage});

  }

  PostBanFilters = (e) => {
    //e.preventDefault();
    console.log("BAN222__________________________________",e);
    this.setState({temp_description:e})
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

//Table
  handleChange = (name, selectValue) => {
    this.setState({ [name]: selectValue },this.filterSearchData);
  }


  filterSearchData = () => {
    const { tmp_year,tmp_month,tmp_NickName,temp_currentpage } = this.state;
    let year = tmp_year.value;
    let month = tmp_month.value;
    let nickname = tmp_NickName;
    let currentPage = temp_currentpage;
    this.props.getUsersData({ year,month,nickname,currentPage});
  }

  componentDidMount = () => {
    const { tmp_year,tmp_month,tmp_NickName,temp_currentpage } = this.state;
    let year = tmp_year.value;
    let month = tmp_month.value;
    let nickname = tmp_NickName;
    let currentPage = temp_currentpage;
    console.log("COMPONENTDIDMOUNT");
    this.props.getUsersData({ year,month,nickname,currentPage});
  }

  Click(e)
  {
    e.preventDefault();
    const { tmp_year,tmp_month,tmp_NickName,temp_currentpage } = this.state;
    let year = tmp_year.value;
    let month = tmp_month.value;
    let nickname = tmp_NickName;
    let currentPage = temp_currentpage;
    console.log("CLICK__________________________________",tmp_NickName);
    this.props.getUsersData({year,month,nickname,currentPage})
  }

  PostFilters = (e) => {
    console.log("EEEEEEEE",e);
    this.setState({tmp_NickName:e})
  }

  render() {
    const { tmp_year, tmp_month, tmp_NickName } = this.state;
    const { listUsers, isListLoading } = this.props;
    console.log("---state--------------------------------", this.state);
    console.log("---props--------------------------------", this.props);
    return (
      <>
      {isListLoading && <EclipseWidget />}
      <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                  <Col className="col-md-2">
                  <CardTitle tag="h4">Таблиця користувачів</CardTitle>
                  </Col>
                  <Col className="col-md-2">
                      <Select
                        value={tmp_month}
                        onChange={(e) => this.handleChange("tmp_month", e)}
                        options={optionsMonth} />
                    </Col>
                    <Col className="col-md-2">
                      <Select
                        value={tmp_year}
                        onChange={(e) => this.handleChange("tmp_year", e)}
                        options={optionsYear} />
                    </Col>
                    <Col className="col-md-2">
                      <Input
                        onChange={(e) => this.PostFilters(`${e.target.value}`)}
                        placeholder="Нік"/>
                    </Col>
                    <Col className="col-md-2">
                       <Button onClick={(e)=>this.Click(e)} color='info'>
                        Відправити фільтри
                      </Button>
                    </Col>
                  </Row>                 
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Нікнейм</th>
                        <th>Дата реєстрації</th>
                        <th>Місто</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody className="align-items-center">
                    {
                        listUsers.map(item => {
                          return (<tr key={item.id}>
                            {/* <th scope="row">{counter++}</th> */}
                            <td>{item.nickname}</td>
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
                              <Input onChange={(e) => this.PostBanFilters(`${e.target.value}`)} placeholder="Причина"></Input>
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
  
                </CardBody>
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
    listUsers: get(state, "userTable.list.data"),
    totalCount: get(state, "userTable.list.totalCount"),
    isListLoading: get(state, "userTable.list.loading"),  
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersData: filter => {
      dispatch(getListActions.getUsersData(filter));
    },
    BanUser: filter => {
      dispatch(getListActions.BanUser(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);

