import React, { Component ,Redirect} from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,FormGroup,Label ,FormFeedback} from 'reactstrap';
import DatePicker from 'react-date-picker';
import Select from 'react-select';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as registerActions from './reducer';
import get from "lodash.get";
import { thisExpression } from '@babel/types';
import {RadioGroup, RadioButton,Radio,FormControlLabel} from 'react-radio-group'
import EclipseWidget from '../../eclipse';

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


 handleChange1 = (e) => {
  this.setState({
  tmp_city: e,city:e.value  
  })
 }
 
  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { nickName ,email,dateOfBirth,gender, password,repitPassword, city,errorsServer } = this.state;   
    console.log("state",this.state);
    let errors = {};
    const regex_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const regex_password = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\w]){1,})(?!.*\s).{8,}$/;
                         ///^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/
    const regex_repitPassword = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\w]){1,})(?!.*\s).{8,}$/;
    console.log("Erors",errors);
    if (nickName === "") errors.nickName = "Поле не може бути пустим!";
    if (city === "Виберіть місто") errors.city = "Поле не може бути пустим!";
    if (!regex_email.test(email)) errors.email = "Не правильний формат електронної пошти!";
    if (email === "") errors.email = "Поле не може бути пустим!";
    if (dateOfBirth === "") errors.dateOfBirth = "Виберіть дату!";
    if (gender === "") errors.gender = "Виберіть стать!";
    if (!regex_password.test(password)) errors.password = "Пароль повинен мати мінімум 8 символів на латиниці, нижній і верхній регістр, спеціальний символ та цифри!";
    if (password === "" ) errors.password = "Поле не може бути пустим!";
    if (!regex_repitPassword.test(repitPassword)) errors.repitPassword="Пароль повинен мати мінімум 8 символів на латиниці, нижній і верхній регістр, спеціальний символ та цифри!";
    if (repitPassword === "") errors.repitPassword = "Поле не може бути пустим!";
    if (password != repitPassword) errors.repitPassword = "Паролі не співпадають";

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

      this.props.register(model);      
    }
    else {
      console.log("false");
      this.setState({ errors });
    }
  }

  render() {
    const{tmp_city,errors,visible,errorsServer,done,isLoading}=this.state;
    const form = (
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
                        <Input type="text" placeholder="Нікнейм" autoComplete="on" 
                       className={classnames("form-control", { "is-invalid": !!errors.nickName })}
                       id="nickName"
                       name="nickName"
                      // value={this.state.email}
                       onChange={this.handleChange} />
                     {!!errors.nickName ? <div className="invalid-feedback">{errors.nickName}</div> : ""}
                      </InputGroup>


                      <Select
                       className="mb-4  "
                    
                        value={tmp_city}
                        onChange={(e) => this.handleChange1(e)}
                        options={optionsCity} />
                 
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-envelope"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" placeholder="Електронна пошта" autoComplete="on"
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

                        <Input
                  invalid={!!errors.dateOfBirth || !!errorsServer.dateOfBirth}
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  onChange={this.handleChange}
                  value={this.dateOfBirth}/>
                  <FormFeedback valid={!errorsServer.dateOfBirth}>{errorsServer.dateOfBirth}</FormFeedback>
                  <FormFeedback valid={!errors.dateOfBirth}>{errors.dateOfBirth}</FormFeedback>                   
                      </InputGroup>
                      <InputGroup  className="mb-4">
                      <InputGroupAddon addonType="prepend">
                       <i className="ml-4 mt-3 fas fa-venus-mars"></i>
                        <p  className="text-muted ml-3 mt-3">Стать</p>
 
                          <FormGroup   check inline>
                          <p className="text-muted form-check-label ml-1" >Чол </p>
                          <Input    invalid={!!errors.gender || !!errorsServer.gender} onChange={this.handleChange}  className="text-muted form-check-input ml-1" type="radio" id="inline-radio1" name="gender" value="Man"      />
                          <FormFeedback valid={!errorsServer.gender}>{errorsServer.gender}</FormFeedback>
                          <FormFeedback valid={!errors.gender}>{errors.gender}</FormFeedback>
                          </FormGroup>
                          <FormGroup check inline>
                          <p className="text-muted form-check-label ml-1" > Жін</p>
                          <Input  invalid={!!errors.gender || !!errorsServer.gender} onChange={this.handleChange}   className="text-muted form-check-input ml-1" type="radio" id="inline-radio2" name="gender" value="Women" />
                          <FormFeedback valid={!errorsServer.gender}>{errorsServer.gender}</FormFeedback>
                          <FormFeedback valid={!errors.gender}>{errors.gender}</FormFeedback>
                          </FormGroup>
                        
                          </InputGroupAddon> 
                       
                          </InputGroup>
 
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input className={classnames('form-control', { 'is-invalid': !!errors.password })}
                          type={classnames(visible ? "text" : "password")}
                          id="password"
                          name="password"
                          placeholder="Пароль"
                          autoComplete="off"
                          onChange={this.handleChange} />
                        {!!errors.password ?
                          <div className="invalid-feedback">
                            {errors.password}
                          </div> : ''}
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input className={classnames('form-control', { 'is-invalid': !!errors.repitPassword })}
                          type={classnames(visible ? "text" : "password")}
                          id="repitPassword"
                          name="repitPassword"
                          placeholder="Повторіть пароль"
                          autoComplete="off"
                          onChange={this.handleChange} />
                        {!!errors.repitPassword ?
                          <div className="invalid-feedback">
                            {errors.repitPassword}
                          </div> : ''}
                      </InputGroup>

                      <Row>
                        <Col xs="6">
                          <Button color="success" className="px-4">Зареєструватись</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                        <Link to="/">
                          <Button color="success" className="px-3">На головну</Button>
                          </Link>
                        </Col>
                        {/* <Row>
                        <Col xs="6">
                          <Button color="success" className="px-4">Вхід</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                        <Link to="/forgot_password">
                          <Button color="sucess" className="px-0">Забули пароль?</Button>
                          </Link>
                        </Col>
                      </Row> */}


                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
        {isLoading && <EclipseWidget />}
      </div>
    );
    return done ? <Redirect to="/" /> : form;
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


export default connect(mapStateToProps, mapDispatch)(Register);
