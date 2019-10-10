import React, { Component } from 'react';
import Select from 'react-select';
//import { Link } from 'react-router-dom';
import { Row,Fade,CardHeader,FormGroup,InputGroupButtonDropdown,
  DropdownToggle,DropdownMenu,CardFooter,DropdownItem,Button, 
  Card, CardBody, Col, Container, Form, Input, InputGroup} from 'reactstrap';

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
        this.setState({ [name]: selectValue }, this.filterSearchData);
      }

      // filterSearchData = () => {
      //   const { tmp_month, tmp_year } = this.state;
      //   let year = tmp_year.value;
      //   let month = tmp_month.value;
      //   this.props.getUsersData({ year, month });
      // }

      filterSearchBoys = () => {
        const {tmp_zodiac, tmp_city, tmp_age} = this.state;
        let zodiac = tmp_zodiac.value;
        let city = tmp_city.value;
        let age = tmp_age.value;
        this.props.getBoysData({zodiac, city, age});
      }
      
  render() {
    return (
      <React.Fragment>
         {/* <h2 className="text-center">Знайомства з хлопцями в Україні</h2> */}
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
                    <Col xs = "3">
                      <InputGroup>
                        <Input type="email" id="input2-group3" name="input2-group3" placeholder="Шукаю хлопця" />
                        <InputGroupButtonDropdown addonType="append"
                                                  isOpen={this.state.second}
                                                  toggle={() => { this.setState({ second: !this.state.second }); }}>
                          <DropdownToggle caret color="success">
                            Dropdown
                          </DropdownToggle>
                          <DropdownMenu className={this.state.second ? 'show' : ''}>
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem>Something else here</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Separated link</DropdownItem>
                          </DropdownMenu>
                        </InputGroupButtonDropdown>
                      </InputGroup>
                    </Col>
                  
                    <Col xs = "3">
                      <InputGroup>
                        <Input type="email" id="input2-group3" name="input2-group3" placeholder="Львів, Україна" />
                        <InputGroupButtonDropdown addonType="append"
                                                  isOpen={this.state.second}
                                                  toggle={() => { this.setState({ second: !this.state.second }); }}>
                          <DropdownToggle caret color="success">
                            Dropdown
                          </DropdownToggle>
                          <DropdownMenu className={this.state.second ? 'show' : ''}>
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem>Something else here</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Separated link</DropdownItem>
                          </DropdownMenu>
                        </InputGroupButtonDropdown>
                      </InputGroup>
                    </Col>
                 
                    <Col xs = "3">
                      <InputGroup>
                        <Input type="email" id="input2-group3" name="input2-group3" placeholder="18" />
                        <InputGroupButtonDropdown addonType="append"
                                                  isOpen={this.state.second}
                                                  toggle={() => { this.setState({ second: !this.state.second }); }}>
                          <DropdownToggle caret color="success">
                            Dropdown
                          </DropdownToggle>
                          <DropdownMenu className={this.state.second ? 'show' : ''}>
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem>Something else here</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Separated link</DropdownItem>
                          </DropdownMenu>
                        </InputGroupButtonDropdown>
                      </InputGroup>
                    </Col>
                  
                    <Col xs = "3">
                      <InputGroup>
                        <Input type="email" id="input2-group3" name="input2-group3" placeholder="Козерог" />
                        <InputGroupButtonDropdown addonType="append"
                                                  isOpen={this.state.second}
                                                  toggle={() => { this.setState({ second: !this.state.second }); }}>
                          <DropdownToggle caret color="success">
                            Dropdown
                          </DropdownToggle>
                          <DropdownMenu className={this.state.second ? 'show' : ''}>
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem>Something else here</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Separated link</DropdownItem>
                          </DropdownMenu>
                        </InputGroupButtonDropdown>
                      </InputGroup>
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

export default Boys;

