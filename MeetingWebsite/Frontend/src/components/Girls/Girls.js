import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardGroup,
         Col, Container, Form, Input, InputGroup,
         InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as loginActions from './reducer';
import get from "lodash.get";

//import EclipseWidget from '../../eclipse';
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
    const { errors, isLoading, profileUrl, visible, errorsServer } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
         <div>ffedfd</div>
        </Container>
      </div>
    );
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
