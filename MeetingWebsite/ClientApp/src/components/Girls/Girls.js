import React, { Component } from 'react';
//  import Girl1 from "../img/Girl1.jpg";
 import Girl1 from "../../assets/img/Girl1.jpg"
 import Girl2 from "../../assets/img/Girl2.jpg"
 import Girl3 from "../../assets/img/Girl3.jpg"
 import Girl4 from "../../assets/img/Girl4.jpg"
 import Girl5 from "../../assets/img/Girl5.jpg"
import { Link } from 'react-router-dom';
import { Button, Card, CardBody,CardHeader, CardFooter, CardGroup,
         Col, Container,Label, Form,FormGroup,PaginationLink,Pagination,PaginationItem,PaginationItemProps, Input, InputGroup,
         InputGroupAddon, InputGroupText, Row,hr } from 'reactstrap';
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
         <div className="Poisk">
         <Card>
              <CardHeader>
                <strong>Пошук</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" inline>
                  <FormGroup className="pr-1">
                   
                    <Input type="text" id="exampleInputName2" placeholder="Шукаю друзів" required />
                  </FormGroup>
                  <FormGroup className="pr-1">
                   
                    <Input  type="email" id="exampleInputEmail1" placeholder="Київська область, Київ                                            ▾" required />
                  </FormGroup>
                  <FormGroup className="pr-1">
                    
                    <Input type="email" id="exampleInputEmail2" placeholder="Вік: 18 — 80" required />
                  </FormGroup>
                  
                  <FormGroup className="pr-1">
                    
                    <Input type="email" id="exampleInputEmail2" placeholder="Cтать: Чоловіча" required />
                  </FormGroup>
                  
                  
                    
                  <hr className="Line"></hr>
                  <FormGroup className="pr-1">
                    
                    <Input type="email" id="exampleInputEmail2" placeholder="Знак зодіаку: Водолій" required />
                  </FormGroup>
                  <FormGroup className="pr-1">
                    
                    <Input type="email" id="exampleInputEmail2" placeholder="Дружба та спілкування" required />
                  </FormGroup>
                  <FormGroup className="pr-1">
                    
                    <Input type="email" id="exampleInputEmail2" placeholder="Настрій" required />
                  </FormGroup>
                  <FormGroup className="pr-1">
                    
                    <Input type="email" id="exampleInputEmail2" placeholder="Ріст" required />
                  </FormGroup>
                  <FormGroup className="pr-1">
                    
                    <Input type="email" id="exampleInputEmail2" placeholder="Вага" required />
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Пошук</Button>
                
              </CardFooter>
            </Card>
         </div>
         <Container>
          <div className="GirlsProfile"> 
            <img src = {Girl1} id="Girl1" className="girlsimg"/> 
            <Label className="Name" >Ірина  23 роки</Label>
            <Label className="City">Україна, Київ</Label>
            
            
          </div>
          <div className="GirlsProfile"> 
            <img src = {Girl2} id="Girl1" className="girlsimg"/> 
            
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl3} id="Girl1" className="girlsimg"/> 
            
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl4} id="Girl1" className="girlsimg"/> 
            
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl5} id="Girl1" className="girlsimg"/> 
            
          </div>  
         </Container>
         <footer>
         <div className="Down">
         <Container>

         <Card id="Pagination">
          
          <CardBody>
            <Pagination size="lg" >
              <PaginationItem>
                <PaginationLink previous tag="button" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="d-none d-sm-block">
                <PaginationLink next tag="button" />
              </PaginationItem>
            </Pagination>
           
              </CardBody>
              </Card>
              
         </Container>
        
         </div>
         </footer>
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
