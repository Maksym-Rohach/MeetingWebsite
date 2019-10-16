import React, { Component } from 'react';
import Select from 'react-select';
//import { Link } from 'react-router-dom';
import { Row,Fade,CardHeader,FormGroup,InputGroupButtonDropdown,
  DropdownToggle,DropdownMenu,CardFooter,DropdownItem,Button, 
  Card, CardBody, Col, Container, Form, Input, InputGroup} from 'reactstrap';
  import get from "lodash.get";
  

  // const optionsCity = [
  //   {value: "", label: ""},

  // ];
 
class Boys extends Component {
    state = {
        isLoading: true,
        tmp_zodiac: {value: '', label: ''},
        tmp_city: {value:'', label: ''},
        tmp_age: {value:'', label: ''},   
        collapse: true,
        fadeIn: true,
        timeout: 300
      };

      handleChange = (name, selectValue) => {
        this.setState({ [name]: selectValue }, this.filterSearchBoys);
      }
      
      filterSearchBoys = () => {
        const {tmp_zodiac, tmp_city, tmp_age} = this.state;
        let zodiac = tmp_zodiac.value;
        let city = tmp_city.value;
        let age = tmp_age.value;
        this.props.getBoysData({zodiac, city, age});
      }
      
  render() {
    const {tmp_city, tmp_zodiac, tmp_age} = this.state;
    const {listCities, listZodiacs} = this.props;
    let option=[];
    let counter = 0;    
    for (let i = 18; i<=75; i++)
    {
      option[counter++] = 
      {
        value: {i},
        label: {i}
       
    }
      // option[counter++].value = "{i}";
      // option[counter++].label = "{i}";
    }
    return (
      <React.Fragment>      
         <h2 style={{textAlign: "center"}}>Знайомства з хлопцями в Україні</h2>
      <div className="app flex-row align-items-center">
       <Container>
        
        <Card>
              <CardHeader>
                <h3 style={{color:"#73818f"}}> <strong>Пошук</strong> </h3>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" className="form-horizontal">
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
                    <Button type="submit" size="sm" color="success" className="ml-3"><i className="fa fa-dot-circle-o" ></i> Пошук</Button>     
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
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
                  <medium className = "ml-2">18 років</medium>
               </Row>
               <Row>
                 <medium className = "ml-3">Львів, Україна</medium>
               </Row>
              </CardFooter>
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
    listUsers: get(state, "boys.list.data"),
    listCities: get(state,"boys.list.getCities"),
    listZodiacs: get(state, "boys.list.getZodiacs"),
    isListLoading: get(state, "boys.list.loading"),  
  };
}

export default Boys;

