import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,FormGroup,Label } from 'reactstrap';
import DatePicker from 'react-date-picker';
import Select from 'react-select';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as registerActions from './reducer';
import get from "lodash.get";



const optionsCity = [
  { value: 'Вінниця‎', label: 'Вінниця‎' },
  { value: 'Дніпро', label: 'Дніпро' },
  { value: 'Донецьк', label: 'Донецьк' },
  { value: 'Житомир', label: 'Житомир' },
  { value: 'Запоріжжя', label: 'Запоріжжя' },
  { value: 'Івано-Франківськ', label: 'Івано-Франківськ' },
  { value: 'Київ', label: 'Київ' },
  { value: 'Кропивницький', label: 'Кропивницький' },
  { value: 'Луганськ', label: 'Луганськ' },
  { value: 'Луцьк', label: 'Луцьк' },
  { value: 'Львів', label: 'Львів' },
  { value: 'Миколаїв', label: 'Миколаїв' },
  { value: 'Одеса', label: 'Одеса' },
  { value: 'Полтава', label: 'Полтава' },
  { value: 'Рівне', label: 'Рівне' },
  { value: 'Суми', label: 'Суми' },
  { value: 'Тернопіль', label: 'Тернопіль' },
  { value: 'Ужгород', label: 'Ужгород' },
  { value: 'Харків', label: 'Харків' },
  { value: 'Херсон', label: 'Херсон' },
  { value: 'Хмельницький', label: 'Хмельницький' },
  { value: 'Черкаси', label: 'Черкаси' },
  { value: 'Чернівці', label: 'Чернівці' },
  { value: 'Чернігів', label: 'Чернігів' },


];







class Register extends Component {
  state = {
    nickName:'',
    email:'',
    dateOfBirth:'',
    gender:'',
    password:'',
    repitPassword:'',
    city:'',
    profileUrl: '',
    errors: {},
    done: false,
    isLoading: false,
    visible: false,
    errorsServer: {},

    tmp_city: { value: '', label: 'Виберіть місто ' }, 
    date: new Date(),
  }
  onChange = date => this.setState({ date })
  onClick = date => this.setState({ date })

  passwordVisible = (e)=>{
    this.setState({
      visible: !this.state.visible,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    return { isLoading: nextProps.loading, errorsServer: nextProps.errors };
}

  setStateByErrors = (name, value) => {
    if (!!this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState(
        {
          [name]: value,
          errors
        }
      )
    }
    else {
      this.setState(
        { [name]: value })
    }
  }
  

  handleChange = (name, selectValue) => {
    this.setState({ [name]: selectValue });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { nickName ,email,dateOfBirth,gender, password,repitPassword, city,errorsServer } = this.state;   
    console.log("state",this.state);
    let errors = {};
    const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/;
    const regex_repitPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/;
    const regex_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!regex_email.test(email)&&!regex_repitPassword.test(repitPassword)) errors.email = "Не правильний формат електронної пошти!";
    if (email === ""&&repitPassword ==="") errors.email = "Поле не може бути пустим!";

    if (!regex_password.test(password)&&!regex_repitPassword.test(repitPassword)) errors.password = "Пароль повинен мати мінімум 6 символів на латиниці, нижній і верхній регістр, та цифри!";
    if (password === ""&& repitPassword === "") errors.password = "Поле не може бути пустим!";
    console.log("Erors",errors);
    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      console.log("true");
      this.setState({ isLoading: true });
      const model = {
        nickName:nickName,
        email: email,
        dateOfBirth:dateOfBirth,
        gender:gender,
        password: password,
        repitPassword:repitPassword,
        city:city,
        };

      this.props.Register(model);      
    }
    else {
      console.log("false");
      this.setState({ errors });
    }
  }



  render() {
    const{tmp_city}=this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center pt-5 mt-5">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                  <Form onSubmit={this.onSubmitForm}>
                      <h1>Реєстрація</h1>
                      <p className="text-muted">Введіть дані</p>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Нікнейм" autoComplete="on" />
                      </InputGroup>


                      <Select
                       className="mb-4  "
                       
                        value={tmp_city}
                        onChange={(e) => this.handleChange("tmp_city")}
                        options={optionsCity} />
                        


                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-envelope"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Електронна адреса" autoComplete="on" />
                        className={classnames("form-control", { "is-invalid": !!errors.email })}
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange} />
                      {!!errors.email ? <div className="invalid-feedback">{errors.email}</div> : ""}
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-birthday-cake mr-3"></i>
                          </InputGroupText>
                        </InputGroupAddon>

                        <DatePicker
          value={this.state.date}
          onChange={this.onChange}
        />

                        {/* <Input type="date" placeholder="Дата народження" autoComplete="on" /> */}
                      </InputGroup>

                      <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                       <i className="ml-4 mt-3 fas fa-venus-mars"></i>
                        <p className="text-muted ml-3 mt-3">Стать</p>



                          <FormGroup check inline>
                          <p className="text-muted form-check-label ml-1" check htmlFor="inline-radio1">Чол</p>
                          <Input className="text-muted form-check-input ml-1" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                          </FormGroup>
                          <FormGroup check inline>
                          <p className="text-muted form-check-label ml-1" check htmlFor="inline-radio2">Жін</p>
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
                        <Input type="password" placeholder="Пароль" autoComplete="on" />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Повторіть пароль" autoComplete="on" />
                      </InputGroup>

                      <Row>
                        <Col xs="6">
                          <Button color="success" className="px-4">Зареєструватись</Button>
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

Register.propTypes =
  {
    register: PropTypes.func.isRequired
  }

function mapStateToProps(state) {
  return {
    loading: get(state, 'register.post.loading'),
    failed: get(state, 'register.post.failed'),
    success: get(state, 'register.post.success'),
    errors: get(state, 'register.post.errors')
  }
}

const mapDispatch = {
  register: (model, history) => {
      return registerActions.register(model, history);
  }
}

export default Register;
