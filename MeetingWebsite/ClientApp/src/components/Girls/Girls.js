import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody,CardHeader, CardFooter, CardGroup,
         Col, Container,Label, Form,FormGroup, Input, InputGroup,
         InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as loginActions from './reducer';
import get from "lodash.get";
import './Girls.css';

//import EclipseWidget from '../../eclipse';
class Girls extends Component {
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
         <div>
         <Card>
              <CardHeader>
                <strong>Inline</strong> Form
              </CardHeader>
              <CardBody>
                <Form action="" method="post" inline>
                  <FormGroup className="pr-1">
                    <Label htmlFor="exampleInputName2" className="pr-1">Name</Label>
                    <Input type="text" id="exampleInputName2" placeholder="Jane Doe" required />
                  </FormGroup>
                  <FormGroup className="pr-1">
                    <Label htmlFor="exampleInputEmail2" className="pr-1">Email</Label>
                    <Input type="email" id="exampleInputEmail2" placeholder="jane.doe@example.com" required />
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
         </div>
        </Container>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
  //  loading: get(state, 'login.post.loading'),
  //  failed: get(state, 'login.post.failed'),
   // success: get(state, 'login.post.success'),
   // errors: get(state, 'login.post.errors')
  }
}

const mapDispatch = {
  //login: (model, history) => {
  //    return loginActions.login(model, history);
  //}
}

export default connect(mapStateToProps, mapDispatch)(Girls);
