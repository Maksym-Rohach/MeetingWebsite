import React, { Component,Redirect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardGroup,
         Col, Container, Form, Input, InputGroup,
         InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as loginActions from './reducer';
import get from "lodash.get";
import EclipseWidget from '../../eclipse';

class Login extends Component {
  state = {
    email: '',
    password: '',
    profileUrl: '',
    errors: {},
    done: false,
    isLoading: false,
    visible: false,
    errorsServer: {}
  }
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

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);

  }
  onSubmitForm = (e) => {
    e.preventDefault();
    const { email, password, errorsServer } = this.state;   

    let errors = {};
    const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/;
    const regex_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!regex_email.test(email)) errors.email = "Не правильний формат електронної пошти!";
    if (email === "") errors.email = "Поле не може бути пустим!";

    if (!regex_password.test(password)) errors.password = "Пароль повинен мати мінімум 6 символів на латиниці, нижній і верхній регістр, та цифри!";
    if (password === "") errors.password = "Поле не може бути пустим!";

    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      this.setState({ isLoading: true });
      const model = {
        email: email,
        password: password
        };

      this.props.login(model);      
    }
    else {
      this.setState({ errors });
    }
  }
  render() {
    const { errors, isLoading, profileUrl, visible, errorsServer,done } = this.state;
    const form = (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center pt-5 mt-5">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                  <Form onSubmit={this.onSubmitForm}>
                      {!!errorsServer.invalid ?
                          <div className="alert alert-danger">
                              {errorsServer.invalid}.
                          </div> : ""}
                      <h1>Вхід</h1>
                      <p className="text-muted">Увійдіть до свого облікового запису</p>
                      <InputGroup className="mb-3">
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
                            <i className="fa fa-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input className={classnames('form-control', { 'is-invalid': !!errors.password })}
                          type={classnames(visible ? "text" : "password")}
                          id="password"
                          name="password"
                          placeholder="Пароль"
                          autoComplete="current-password"
                          onChange={this.handleChange} />
                        {!!errors.password ?
                          <div className="invalid-feedback">
                            {errors.password}
                          </div> : ''}
                          {/* <InputGroupAddon addonType="append"> */}
                          {/* <Button onClick={this.passwordVisible}>
                            <i className={classnames( visible? 'fa fa-eye':'fa fa-eye-slash')}></i>
                          </Button> */}
                        {/* </InputGroupAddon> */}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="success" className="px-4">Вхід</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                        <Link to="/forgot_password">
                          <Button color="success" className="px-2">Забули пароль?</Button>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white py-5 d-md-down-none my-gradient" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h3>Знайдіть свою ідеальну пару</h3>
                      {/* <p>Знайдіть свою ідеальну пару.</p> */}
                      <Link to="/register">
                        <Button color="success" className="mt-3" active tabIndex={-1}>Зареєструватись</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
        {isLoading && <EclipseWidget />}
      </div>
    );
    return done ? <Redirect to="/forgot_password" /> : form;
  }
}

Login.propTypes =
  {
    login: PropTypes.func.isRequired
  }

function mapStateToProps(state) {
  return {
    loading: get(state, 'login.post.loading'),
    failed: get(state, 'login.post.failed'),
    success: get(state, 'login.post.success'),
    errors: get(state, 'login.post.errors')
  }
}

const mapDispatch = {
  login: (model, history) => {
      return loginActions.login(model, history);
  }
}

export default connect(mapStateToProps, mapDispatch)(Login);
