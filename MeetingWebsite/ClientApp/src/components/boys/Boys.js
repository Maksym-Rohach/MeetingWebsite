import React, { Component } from 'react';
import Select from 'react-select';
//import { Link } from 'react-router-dom';
import { Row,Fade,CardHeader,FormGroup,InputGroupButtonDropdown,
  DropdownToggle,DropdownMenu,CardFooter,DropdownItem,Button, 
  Card, CardBody, Col, Container, Form, Input, InputGroup} from 'reactstrap';
import get from "lodash.get";
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import './style.scss';
import '../pages/Home/instruments/scss/palette.scss';
import Paginator from '../Paginator';


  // const optionsCity = [
  //   {value: "", label: ""},

  // ];
 
class Boys extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        tmp_zodiac: {value: 'q', label: 'Зодіак'},
        tmp_city: {value:'w', label: 'Місто'},
        tmp_age: {value:'1', label: '18'},   
        collapse: true,
        fadeIn: true,
        timeout: 300,
        currentPage: 1,
        temp_currentpage: 1,
        totalCount: 0,
      };
      this.onClickPage = this.onClickPage.bind(this);
    }
       
      handleChange = (name, selectValue) => {
        this.setState({ [name]: selectValue }, this.filterSearchBoys);
      }
      
      sendFilters = () => {
        const { tmp_age, tmp_zodiac, tmp_city } = this.state;  
        let city = tmp_city.value;
        let zodiac = tmp_zodiac.value;
        let age = tmp_age.value; 
        console.log("STATEEEEEEEEEEEEEEEEEE",this.state)
        const model = {
          city: city,
          age: age,
          zodiac: zodiac,
          };
  
        this.props.boys(model);      
      }
    
      filterSearchBoys = () => {
        const {tmp_zodiac, tmp_city, tmp_age, currentPage} = this.state;
        let zodiacId = tmp_zodiac.value;
        let cityId = tmp_city.value;
        let age = tmp_age.value;
        this.props.getBoysData({zodiacId, cityId, age, currentPage});
      }
      
      componentDidMount = () => {
        const { tmp_city, tmp_zodiac,tmp_age, currentPage } = this.state;
        let zodiac = tmp_zodiac.value;
        let city = tmp_city.value;
        let age = tmp_age.value;
        this.props.getBoysData({zodiac, city, age, currentPage });
      }

      onClickPage(pageNumber) {
        // const { typeOfSort, sortByAscending } = this.props;
         console.log("NUM PAGE ON USER TABLE__________________________________",pageNumber);
         const { tmp_city,tmp_zodiac,tmp_age} = this.state;        
         let city = tmp_city.value;
         let zodiac = tmp_zodiac.value;
         let age = tmp_age.value;
         let currentPage = pageNumber;
         this.setState({ currentPage: pageNumber,temp_currentpage:pageNumber });
         //this.props.getBansData({ year,month,nickname,currentPage: pageNumber,totalCount:this.props.totalCount });
         this.props.getBoysData({city,zodiac,age,currentPage: pageNumber, totalCount:this.props.totalCount});
       }
      
  render() {
    console.log("Line 50 ===============", this.props);
    const {tmp_city, tmp_zodiac, tmp_age} = this.state;
    console.log("Line 52 ===============", this.props);
    const {listCities, listZodiacs} = this.props;
    console.log("this props ==================",this.props);
    let option=[];
    let counter = 0;
    console.log("line 55 =====================", this.props);    
    for (let i = 18; i<90; i++)
    {
      option[counter++]={value:`${i}`, label:`${i}`};
    }
    return (
      <React.Fragment>      
         <h2 style={{textAlign: "center"}}>Знайомства з хлопцями в Україні</h2>
      <div className="app flex-row align-items-center">
       <Container className="fontyana">
        <div >
        <Card className="bgyana">
              <CardHeader >
                <h3 style={{color:"#c0c0c0", marginBottom:"5px"}}> <strong>Пошук</strong> </h3>
              </CardHeader>
              <CardBody style={{marginTop: "-10px"}} >
                <Form onSubmit={this.sendFilters} action="" method="post" className="form-horizontal">
                  <FormGroup row>              
                    <Col xs = "4">
                    <Select
                        value={tmp_city}
                        onChange={(e) => this.handleChange("tmp_city", e)}
                        options={listCities} />
                    </Col>
               
                    <Col xs = "4">
                    <Select
                        value={tmp_zodiac}
                        onChange={(e) => this.handleChange("tmp_zodiac", e)}
                        options={listZodiacs} />
                    </Col>
                  
                    <Col xs = "4">
                      <Select
                        value={tmp_age}
                        onChange={(e) => this.handleChange("tmp_age", e)}
                        options={option} />
                    </Col>
                    {/* <Button type="submit" size="sm" color="success" className="ml-3 mt-3"><i className="fa fa-dot-circle-o"></i> Пошук</Button>      */}
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            </div>
            </Container>

      </div>
      

      <div className="animated fadeIn">
        <Row>
        
          <Col xs="12" sm="6" md="2">
            <Card className = "ml-5">
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuLorem ipsum dolor sit amet, consectetu
                 {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                 
              </CardBody>
              
              <CardFooter>
              
               <Row>
                  <strong className = "ml-3">Arcadiy</strong>
                  <p className = "ml-2">18 років</p>
               </Row>
               <Row>
                 <p className = "ml-3">Львів, Україна</p>
               </Row>
              </CardFooter>
               
            </Card>
          </Col>
        </Row>     

       

      </div>

      <div className="row justify-content-md-center">
        <div className="col col-lg-2">          
        </div>
        <div className="col-md-auto">
        <Paginator callBackParams={this.onClickPage} totalCount={this.props.totalCount} currentPage={this.state.temp_currentpage} >
      </Paginator>
        </div>
        <div className="col col-lg-2">          
        </div>
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log("mapStateToProps======Boys=", state);
  return {
    listUsers: get(state, "boys.list.getListBoys"),
    listCities: get(state,"boys.list.getCities"),
    listZodiacs: get(state, "boys.list.getZodiacs"),
    isListLoading: get(state, "boys.list.loading"),      
  };  
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBoysData: filter => {
      dispatch(getListActions.getBoysData(filter));
    }
  }
}

// export default Boys;
export default connect(mapStateToProps, mapDispatchToProps)(Boys);

