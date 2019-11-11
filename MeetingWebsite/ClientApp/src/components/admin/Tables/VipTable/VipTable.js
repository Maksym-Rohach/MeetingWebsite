import React from "react";
import { connect } from 'react-redux';
import get from "lodash.get";
import { push } from 'react-router-redux';
import * as getListActions from './reducer';
import EclipseWidget from '../../../eclipse';
import Select from 'react-select';
import Paginator from '../../../Paginator';
import '../UserTable/color.scss';
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
  Badge,
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




class VipTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    isLoading: true,
    tmp_NickName: '',
    tmp_month: { value: '11', label: 'Листопад' },
    tmp_year: { value: '2019', label: '2019р' }, 
    modal: false,
    danger: false,
    temp_id:'',
    temp_description:'',
    temp_currentpage: 1,
    totalCount:0
    };
    this.toggle = this.toggle.bind(this);
    this.onClickPage = this.onClickPage.bind(this);
       
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }


  onClickPage(pageNumber) {
    // const { typeOfSort, sortByAscending } = this.props;
     console.log("NUM PAGE ON USER TABLE__________________________________",pageNumber);
     console.log("cor__________________________________",this.props.totalCount);
     const { tmp_year,tmp_month,tmp_NickName} = this.state;
     let year = tmp_year.value;
     let month = tmp_month.value;
     let nickname = tmp_NickName;
     let currentPage = pageNumber;
     this.setState({ currentPage: pageNumber,temp_currentpage:pageNumber,totalCount:this.props.totalCount });
     this.props.getUsersData({ year,month,nickname,currentPage: pageNumber});
   }



  handleChange = (name, selectValue) => {
    this.setState({temp_currentpage:1})
    this.setState({ [name]: selectValue },this.filterSearchData);
  }


  filterSearchData = () => {
    const { tmp_year,tmp_month,tmp_NickName,temp_currentpage } = this.state;
    let year = tmp_year.value;
    let month = tmp_month.value;
    let nickname = tmp_NickName;
    let currentPage = temp_currentpage;
    this.setState({totalCount:this.props.totalCount});
    this.props.getVipsData({ year,month,nickname,currentPage});
  }

  componentDidMount = () => {
    const { tmp_year,tmp_month,tmp_NickName,temp_currentpage } = this.state;
    let year = tmp_year.value;
    let month = tmp_month.value;
    let nickname = tmp_NickName;
    let currentPage = temp_currentpage;
    console.log("COMPONENTDIDMOUNT");
    this.setState({totalCount:this.props.totalCount});
    this.props.getVipsData({ year,month,nickname,currentPage});
  }

  Click(e)//проблема тут!!!
  {
    e.preventDefault();
    const { tmp_year,tmp_month,tmp_NickName,temp_currentpage } = this.state;
    let year = tmp_year.value;
    let month = tmp_month.value;
    let nickname = tmp_NickName;
    let currentPage = temp_currentpage;
    this.setState({totalCount:this.props.totalCount});
    console.log("CLICK__________________________________",tmp_NickName);
    this.props.getVipsData({year,month,nickname,currentPage})
  }
  PostFilters = (e) => {
    console.log("PostFilters",e);
    this.setState({tmp_NickName:e,totalCount:this.props.totalCount})
  }

  render() {
    let counter = 1;
    const { tmp_year, tmp_month, tmp_NickName } = this.state;
    const { listVips, isListLoading } = this.props;
    console.log("---state--------------------------------", this.state);
    console.log("---props--------------------------------", listVips);
    return (
      <React.Fragment>      
      {isListLoading && <EclipseWidget />}
<div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                  <Col className="col-md-2">
                  <CardTitle tag="h4">Таблиця VIP користувачів</CardTitle>
                  </Col>
                  <Col className="col-md-2">
                      <Select
                       className="fontnikita"      
                        value={tmp_month}
                        onChange={(e) => this.handleChange("tmp_month", e)}
                        options={optionsMonth} />
                    </Col>
                    <Col className="col-md-2">
                      <Select
                       className="fontnikita"      
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
           <th>#</th>
           <th>Нікнейм</th>
           <th>Діє до</th>
           <th>Місто</th>
           <th>Статус</th>
          </tr>
      </thead>
      <tbody className="align-items-center">
        {
          listVips.map(item => {
            return (<tr key={item.id}>
              {/* <th scope="row">{counter++}</th> */}
              <td>{counter++}</td>
              <td>{item.nickname}</td>
              <td>{item.dateForValid}</td>
              <td>{item.city}</td>
              {(((new Date(item.dateForValid)-new Date())/1000/60/60/24)<=1)?(<td><Badge style={{ width: 70 }} color="danger">Спливає</Badge></td>):(<td><Badge style={{ width: 70 }} color="info">Активний</Badge></td>)}
              {/* {console.log("i am here")}
              {console.log(((new Date(item.dateForValid)-new Date())))} */}
             <td><Badge></Badge></td>
              {/* <td><Badge style={{ width: 70 }} color="info">Активний</Badge></td> */}
              {/* <td><Modal color = {item.status==="Не забанений"?"info":"warning"}>{item.status}</Modal></td> */}
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
  </React.Fragment>      
    );
  }
}

const mapStateToProps = state => {
  console.log("State=======", state);
  return {
    listVips: get(state, "vipTable.list.data.vips"),
    totalCount: get(state, "vipTable.list.data.totalCount"),
    isListLoading: get(state, "vipTable.list.loading"),  
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getVipsData: filter => {
      dispatch(getListActions.getVipsData(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VipTable);



                    {/* <tbody>
                      <tr>
                        <td>{counter++}</td>
                        <td>Помідорка</td>
                        <td>31.12.19</td>
                        <td>Rivne</td>
                        <td><Badge style={{ width: 70 }} color="info">Активний</Badge></td>
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
                     </tbody> */}

                  