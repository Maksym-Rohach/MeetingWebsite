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
import Navb from '../pages/Home/NavBar';
import Footer from '../pages/Home/Footer';
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
        tmp_age_from: {value:'1', label: '18'},   
        tmp_age_to: {value:'1', label:'89'},
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
        console.log("STATEEEEEEEEEEEEEEEEE222222222E",this.state)
        const { tmp_age_from,tmp_age_to, tmp_zodiac, tmp_city } = this.state;  
        let city = tmp_city.value;
        let zodiac = tmp_zodiac.value;
        let age_from = tmp_age_from.value;
        let age_to = tmp_age_to.value; 
        console.log("STATEEEEEEEEEEEEEEEEEE",this.state)
        const model = {
          city: city,
          age_from: age_from,
          age_to: age_to,
          zodiac: zodiac,
          };
  
        this.props.boys(model);      
      }
    
      filterSearchBoys = () => {
        const {tmp_zodiac, tmp_city, tmp_age_from, tmp_age_to, currentPage} = this.state;
        let zodiacId = tmp_zodiac.value;
        let cityId = tmp_city.value;
        let age_from = tmp_age_from.value;
        let age_to = tmp_age_to.value; 
        this.props.getBoysData({zodiacId, cityId, age_from, age_to, currentPage});
      }
      
      componentDidMount = () => {
        const { tmp_city, tmp_zodiac,tmp_age_to, tmp_age_from, currentPage } = this.state;
        let zodiac = tmp_zodiac.value;
        let city = tmp_city.value;
        let age_from = tmp_age_from.value;
        let age_to = tmp_age_to.value; 
        this.props.getBoysData({zodiac, city, age_from, age_to, currentPage });
      }

      onClickPage(pageNumber) {
        // const { typeOfSort, sortByAscending } = this.props;
         console.log("NUM PAGE ON USER TABLE__________________________________",pageNumber);
         const { tmp_city,tmp_zodiac,tmp_age_from, tmp_age_to} = this.state;        
         let city = tmp_city.value;
         let zodiac = tmp_zodiac.value;
         let age_from = tmp_age_from.value;
         let age_to = tmp_age_to.value;
         let currentPage = pageNumber;
         this.setState({ currentPage: pageNumber,temp_currentpage:pageNumber });
         //this.props.getBansData({ year,month,nickname,currentPage: pageNumber,totalCount:this.props.totalCount });
         this.props.getBoysData({city,zodiac,age_from,age_to,currentPage: pageNumber, totalCount:this.props.totalCount});
       }
      
  render() {
    console.log("Line 50 ===============", this.props);
    const {tmp_city, tmp_zodiac, tmp_age_from, tmp_age_to} = this.state;
    console.log("Line 52 ===============", this.props);
    const {listCities, listZodiacs} = this.props;
    const {listUsers}= this.props;
    console.log("this props ==================",this.props);
    let option=[];
    let counter = 0;
   
    for (let i = 18; i<90; i++)
    {
      option[counter++]={value:`${i}`, label:`${i}`};
    }
    for (let q = 18; q<90; q++)
    {
      option[counter++]={value:`${q}`, label:`${q}`};
    }
    return (
      <React.Fragment>
        <Navb></Navb>      
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
                    <Col xs = "3">
                    <Select
                        value={tmp_city}
                        onChange={(e) => this.handleChange("tmp_city", e)}
                        options={listCities} />
                    </Col>
               
                    <Col xs = "3">
                    <Select
                        value={tmp_zodiac}
                        onChange={(e) => this.handleChange("tmp_zodiac", e)}
                        options={listZodiacs} />
                    </Col>
                  
                    <Col xs = "3">
                      <Select
                        value={tmp_age_from}
                        onChange={(e) => this.handleChange("tmp_age_from", e)}
                        options={option} />
                    </Col>
                    <Col xs = "3">
                      <Select
                        value={tmp_age_to}
                        onChange={(e) => this.handleChange("tmp_age_to", e)}
                        options={option} />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            </div>
            </Container>

      </div>
      <section className=" text-white content-section bg-about">
            <div className="container" >
              <div className="row align-items-center">

                <Row className="container text-white mt-5 mb-5 pl-0 pr-0" >
                  {
                    listUsers.map(item => {
                      return (
                        <Col xs="12" sm="4" md="3" >
                          <Card className="border-primary">
                            <CardBody>
                              <div key={item.id}>
                                <img alt="photo" className="img-fluid" 
                                // src="https://scontent.fdnk1-1.fna.fbcdn.net/v/t1.0-9/66881561_357366474909197_3040427990451224576_n.jpg?_nc_cat=109&_nc_oc=AQnb8qdUjE2eSwdRcT5KlqyWc1hdFs9QMNRvFQ1Wlx8Ngaw1NXM6QK7GgQAR-2ALBJE&_nc_ht=scontent.fdnk1-1.fna&oh=4c829acd2cfeeef31dd28a2be8fec660&oe=5E234BEB"
                                 />
                              </div>
                              <Row>
                                <strong className="ml-3">{item.name}</strong>
                                <p className="ml-2">   {item.age}</p>
                              </Row>
                              <Row>
                                <p className="ml-3">{item.city}, Україна</p>
                              </Row>
                              <Row>
                                <p className="ml-3"> {item.zodiac}</p>
                              </Row>


                            </CardBody>
                          </Card>
                        </Col>
                      )
                    })
                  }
                  
                </Row>
              </div>
            </div>
          </section>

      
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
      <Footer></Footer>
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

