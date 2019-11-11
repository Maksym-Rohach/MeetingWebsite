// import React, { Component ,Redirect} from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Card, CardBody, CardFooter, CardGroup,
//          Col, Container, Form, Input, InputGroup,
//          InputGroupAddon, InputGroupText, Row } from 'reactstrap';
// import classnames from 'classnames';
// import PropTypes from 'prop-types';
// import { connect } from "react-redux";
// import * as forgot_passwordActions from './reducer';
// import get from "lodash.get";
// import EclipseWidget from '../../eclipse';
// import axios from "axios";
// import {serverUrl} from '../../../config';


// class Forgot_Password extends Component {
//   state = {
//     email: '',
//     errors: {},
//     done: false,
//     isLoading: false,
//     errorsServer: {}
//   }

//   static getDerivedStateFromProps(nextProps, prevState) {

//     return { isLoading: nextProps.loading, errorsServer: nextProps.errors };
// }

//   setStateByErrors = (name, value) => {
//     if (!!this.state.errors[name]) {
//       let errors = Object.assign({}, this.state.errors);
//       delete errors[name];
//       this.setState(
//         {
//           [name]: value,
//           errors
//         }
//       )
//     }
//     else {
//       this.setState(
//         { [name]: value })
//     }
//   }

//   handleChange = (e) => {
//     this.setStateByErrors(e.target.name, e.target.value);
//   }

//   onSubmitForm = e => {
//     e.preventDefault();
//     const { email } = this.state;
//     let errors = {};
//  console.log("eror",this.state)
//     const regex_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

//        if (!regex_email.test(email)) errors.email = "Не правильний формат електронної пошти!";
//        if (email === "") errors.email = "Поле не може бути пустим!";

//     const isValid = Object.keys(errors).length === 0;
//     if (isValid) {
//       this.setState({ isLoading: true, done: false });
//       var url = `${serverUrl}api/account/forgot_password`;
//       var data = { email };
//       axios
//         .post(url, data)
//         .then(res => {
//           console.log("eror2",res)
//           this.setState({ isLoading: false, done: true });
//         })
//         .catch(error => {
//           this.setState({
//             errors: error.response.data,
//             isLoading: false
//           });
//         });
//     } else {
//       this.setState({ errors });
//     }
//   };

//   render() {
//     const { errors, isLoading,done,errorsServer} = this.state;
//     console.log("dfdfdfd", errorsServer)
//     const form = (
//         <div className="app flex-row align-items-center">
//         <Container>
//           <Row className="justify-content-center pt-5 mt-5">
//             <Col md="8">
//               <CardGroup>
//                 <Card className="p-4">
//                   <CardBody>
//                   <Form onSubmit={this.onSubmitForm}>
//                     {!!errors.invalid ? <div className="alert alert-danger">{errors.invalid}.</div> : ""}
//                     <h3>Відновлення паролю</h3>
//                       <p className="text-muted">Вкажіть ваш емейл</p>
//                       <InputGroup className="mb-3">
//                         <InputGroupAddon addonType="prepend">
//                         <InputGroupText>
//                         <i className="fa fa-envelope"></i>
//                         </InputGroupText>
//                         </InputGroupAddon>                     
//                         <Input type="email" placeholder="Електронна пошта" autoComplete="on"
//                         className={classnames("form-control", { "is-invalid": !!errors.email })}
//                         id="email"
//                         name="email"
//                         value={this.state.email}
//                         onChange={this.handleChange} />
//                       {!!errors.email ? <div className="invalid-feedback">{errors.email}</div> : ""}
//                       </InputGroup>                  
//                       <Row>
//                         <Col xs="6">
//                           <Button color="success" className="px-4">Відновити</Button>
//                         </Col>
//                         <Col xs="6" className="text-right">
//                         <Link to="/login">
//                           <Button color="success" className="px-4"> Згадали пароль?</Button>
//                         </Link>
//                       </Col>
//                       </Row>
//                     </Form>
//                   </CardBody>
//                 </Card>
//               </CardGroup>
//             </Col>
//           </Row>
//         </Container>
//         {isLoading && <EclipseWidget />}
//       </div>
//     );
//     return done ? <Redirect to="/login" /> : form;
//   }
// }
// export default Forgot_Password;

// Forgot_Password.propTypes =
//   {
    
//     forgot_password: PropTypes.func.isRequired
//   }

// function mapStateToProps(state) {
//   return {
//     loading: get(state, 'forgot_password.post.loading'),
//     failed: get(state, 'forgot_password.post.failed'),
//     success: get(state, 'forgot_password.post.success'),
//     errors: get(state, 'forgot_password.post.errors')
//   }
// }

// const mapDispatch = {
//   forgot_password: (model, history) => {
//       return forgot_passwordActions.forgot_password(model, history);
//   }
// }

// // export default connect(mapStateToProps, mapDispatch)(Forgot_Password);




import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardGroup,Col, Container, Form, Input,
         InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../../config";
import EclipseWidget from "../../eclipse";
 
class Forgot_Password extends Component {
  state = {
    errors: {},
    email: "",
    isLoading: false,
    visible: false,
    errorsServer: {}
  }
 
  static getDerivedStateFromProps(nextProps, prevState) {

    return { isLoading: nextProps.loading, errorsServer: nextProps.errors };
}

   
  setStateByErrors = (name, value) => {
    if (!!this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState({
        [name]: value,
        errors
      });
    } else {
      this.setState({ [name]: value });
    }
  };
 
  handleChange = e => {
    this.setStateByErrors(e.target.name, e.target.value);
  };
 
  onSubmitForm = e => {
    e.preventDefault();
    const { email } = this.state;
    let errors = {};

    const regex_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!regex_email.test(email)) errors.email = "Не правильний формат електронної пошти!";
    if (email === "") errors.email = "Поле не може бути пустим!";

    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      this.setState({ isLoading: true, done: false });
      var url = `${serverUrl}api/account/forgot_password`;
      var data = { email };
      console.log("d1233123123123132222222");
      axios.post(url, data)
        .then(res => {
          this.setState({ isLoading: false, done: true });
        })
        .catch(error => {
          this.setState({
            errors: error.response.data,
            isLoading: false
          });
        });
    } else {
      this.setState({ errors });
    }
  };
 
  render() {
    const { errors, isLoading, done } = this.state;
    const form = (
              <div className="app flex-row align-items-center">
              <Container>
                <Row className="justify-content-center pt-5 mt-5">
                  <Col md="8">
                    <CardGroup>
                      <Card className="p-4">
                        <CardBody>
                        <Form onSubmit={this.onSubmitForm}>
                          {!!errors.invalid ? <div className="alert alert-danger">{errors.invalid}.</div> : ""}
                          <h3>Відновлення паролю</h3>
                            <p className="text-muted">Вкажіть ваш емейл</p>
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
                            <Row>
                              <Col xs="6">
                                <Button color="success" className="px-4">Відновити</Button>
                              </Col>
                              <Col xs="6" className="text-right">
                              <Link to="/login">
                                <Button color="success" className="px-4"> Згадали пароль?</Button>
                              </Link>
                            </Col>
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
          return done ? <Redirect to="/login" /> : form;
  }
}

export default Forgot_Password;