import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,FormGroup,Label } from 'reactstrap';

class Register extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center pt-5 mt-5">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Register</h1>
                      <p className="text-muted">Sign Up</p>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="on" />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-envelope"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email" autoComplete="on" />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-birthday-cake"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="DateOfBirth" autoComplete="on" />
                      </InputGroup>

                      <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                      <i className="ml-4 fas fa-venus-mars"></i>






<p className="text-muted ml-3">Gender</p>



<FormGroup check inline>
<p className="text-muted form-check-label ml-1" check htmlFor="inline-radio1">Male</p>
<Input className="text-muted form-check-input ml-1" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
</FormGroup>
<FormGroup check inline>
<p className="text-muted form-check-label ml-1" check htmlFor="inline-radio2">Female</p>
<Input className="text-muted form-check-input ml-1" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
</FormGroup>

</InputGroupAddon> 

                        </InputGroup>
{/* 
                    <FormGroup row>
                    <Col md="3">
                      <Label>Inline Radios</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                        <Label className="form-check-label" check htmlFor="inline-radio1">One</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
                        <Label className="form-check-label" check htmlFor="inline-radio2">Two</Label>
                      </FormGroup>
                
                    </Col>
                  </FormGroup> */}





                    {/* <FormGroup>
                    <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                         
                            <i className="fas fa-venus-mars"></i>

                        <p className="text-muted ml-3">Gender</p>

                        <FormGroup check inline>
                        <Label className="form-check-label ml-1" check htmlFor="inline-radio1">Male</Label>
                        <Input className="form-check-input ml-1" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                      </FormGroup>
                      <FormGroup check inline>
                        <Label className="form-check-label ml-1" check htmlFor="inline-radio2">Female</Label>
                        <Input className="form-check-input ml-1" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
                      </FormGroup>

                        </InputGroupAddon> 
                      </InputGroup> */}

                      {/* <p className="text-muted"><i className="fas fa-venus-mars"></i>Gender</p> */}
                      {/* <FormGroup check inline>
                        <Label className="form-check-label" check htmlFor="inline-radio1">Male</Label>
                        <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                      </FormGroup>
                      <FormGroup check inline>
                        <Label className="form-check-label" check htmlFor="inline-radio2">Female</Label>
                        <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
                      </FormGroup> */}
                      


                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-venus-mars"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Gender" autoComplete="on" /> */}



                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="on" />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Repit password" autoComplete="on" />
                      </InputGroup>

                      <Row>
                        <Col xs="6">
                          <Button color="success" className="px-4">Register</Button>
                        </Col>
                       
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
