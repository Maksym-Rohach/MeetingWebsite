import React from "react";
import { connect } from 'react-redux';
import get from "lodash.get";
import { push } from 'react-router-redux';
import * as getListActions from './reducer';
import EclipseWidget from '../eclipse';
import classnames from 'classnames';
import Select from 'react-select';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container,
  Button,
  Input,
  Form,
  InputGroup,
  Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";


class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    isLoading: true,
    errors: {},
    errorsServer:{},
    email: '',
    oldPass: '',
    newPass: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    return { errorsServer: nextProps.errors };
}
  handleChange = (name, selectValue) => {
    this.setState({ [name]: selectValue },this.filterSearchData);
  }

  filterSearchData = () => {
    const { email,oldPass,newPass} = this.state;
    this.props.getResetData({email,oldPass,newPass});
  }

  componentDidMount = () => {
    const { email,oldPass,newPass} = this.state;
    this.props.getResetData({email,oldPass,newPass});
  }

  Click(e)
  {
    e.preventDefault();
    const { email,oldPass,newPass} = this.state;
    let errors = {};
    const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/;
    const regex_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    if (!regex_email.test(email)) errors.email = "Не правильний формат електронної пошти!";
    if (email === "") errors.email = "Поле не може бути пустим!";

    if (!regex_password.test(oldPass)) errors.password = "Пароль повинен мати мінімум 6 символів на латиниці, нижній і верхній регістр, та цифри!";
    if (oldPass === "") errors.password = "Поле не може бути пустим!";
    const isValid = Object.keys(errors).length === 0

    if (isValid) { 
    this.props.getResetData({email,oldPass,newPass});
    }
    else {
      this.setState({ errors:errors });  
      console.log("---STATE2--------------------------------", this.state);
    }  
  
  }

  PostFilters = (name, selectValue) => {
    this.setState({ [name]: selectValue});
  }

  render() {
    const { errors,errorsServer } = this.state;
    const {isListLoading } = this.props;
    console.log("---state--------------------------------", this.state);
    console.log("---props--------------------------------", this.props);
    return (
      <>
      {isListLoading && <EclipseWidget />}
        <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center pt-5 mt-5">
            <Col md="8">
                <Card className="p-4">
                  <CardBody >
                
                  <Form>
                      {!!errorsServer ?
                          <div className="alert alert-danger">
                              {errorsServer}.
                          </div> : ""}
                  <Row>
                  <CardTitle tag="h4">Зміна паролю</CardTitle>
                  </Row>
                    <Row>
                      <Input
                      type="email" placeholder="Електронна пошта" autoComplete="on"
                        className={classnames("form-control", { "is-invalid": !!errors.email })}
                        onChange={(e) => this.PostFilters("email",`${e.target.value}`)}
                        placeholder="Пошта"/>
                         <div className="invalid-feedback">{errors.email}</div>
                    </Row>
                    <Row>
                      <Input
                       className={classnames('form-control', { 'is-invalid': !!errors.password })}
                        type="password"
                        onChange={(e) => this.PostFilters("oldPass",`${e.target.value}`)}
                        placeholder="Введіть ваш поточний пароль"/>
                         {!!errors.password ?
                          <div className="invalid-feedback">
                            {errors.password}
                          </div> : ''}
                    </Row>
                    <Row>
                      <Input
                       className={classnames('form-control', { 'is-invalid': !!errors.password })}
                        type="password"
                        onChange={(e) => this.PostFilters("newPass",`${e.target.value}`)}
                        placeholder="Введіть ваш новий пароль"/>
                         {!!errors.password ?
                          <div className="invalid-feedback">
                            {errors.password}
                          </div> : ''}
                    </Row>
                    <Row>
                       <Button onClick={(e)=>this.Click(e)} color='info'>
                        Підтвердити
                      </Button>
                    </Row>           
                    </Form>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log("State=======", state);
  return {
    //listUsers: get(state, "userTable.list.ok"),
    isListLoading: get(state, "resetPassword.list.loading"),  
    errorsServer: get(state, "resetPassword.list.data"), 
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getResetData: filter => {
      dispatch(getListActions.getResetData(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

