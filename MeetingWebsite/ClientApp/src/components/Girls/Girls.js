import React, { Component } from 'react';
//  import Girl1 from "../img/Girl1.jpg";
 import Girl1 from "../../assets/img/Girl1.jpg"
 import Girl2 from "../../assets/img/Girl2.jpg"
 import Girl3 from "../../assets/img/Girl3.jpg"
 import Girl4 from "../../assets/img/Girl4.jpg"
 import Girl5 from "../../assets/img/Girl5.jpg"
 import Girl6 from "../../assets/img/Girl6.jpg"
 import Girl7 from "../../assets/img/Girl7.jpg"
 import Girl8 from "../../assets/img/Girl8.jpg"
 import Girl9 from "../../assets/img/Girl9.jpg"
 import Girl10 from "../../assets/img/Girl10.jpg"
 import Girl11 from "../../assets/img/Girl11.jpg"
 import Girl12 from "../../assets/img/Girl12.jpg"
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
                   
                    <Input  type="email" id="exampleInputEmail1" placeholder="Київська область, Київ                                            ▾" required />
                  </FormGroup>
                  <FormGroup className="pr-1">
                    
                    <Input type="email" id="exampleInputEmail2" placeholder="Вік(мін)" required />
                  </FormGroup>
                  
                  <FormGroup className="pr-1">
                    
                    <Input type="email" id="exampleInputEmail2" placeholder="Вік(макс)" required />
                  </FormGroup>
                  
                  
                  
                    
                  
                  <FormGroup className="pr-1">
                    
                    <Input type="email" id="exampleInputEmail2" placeholder="Знак зодіаку: Водолій" required />
                  </FormGroup>
                  
                </Form>
              </CardBody>
              
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
            <Label className="Name" >Ольга  22 роки</Label>
            <Label className="City">Україна, Житомир</Label>
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl3} id="Girl1" className="girlsimg"/> 
            <Label className="Name" >Дарья  24 роки</Label>
            <Label className="City">Україна, Тернопіль</Label>
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl4} id="Girl1" className="girlsimg"/> 
            <Label className="Name" >Ірина  19 років</Label>
            <Label className="City">Україна, Біла Цервка</Label>
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl5} id="Girl1" className="girlsimg"/> 
            <Label className="Name" >Євгенія  19 років</Label>
            <Label className="City">Україна, Харків</Label>
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl6} id="Girl1" className="girlsimg"/> 
            <Label className="Name" >Марго  29 років</Label>
            <Label className="City">Україна, Одеса</Label>
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl7} id="Girl1" className="girlsimg"/> 
            <Label className="Name" >Олександра  29 років</Label>
            <Label className="City">Україна, Київ</Label>
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl8} id="Girl1" className="girlsimg"/> 
            <Label className="Name" >Марія  37 років</Label>
            <Label className="City">Україна, Київ</Label>
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl9} id="Girl1" className="girlsimg"/> 
            <Label className="Name" >Мілана  25 років</Label>
            <Label className="City">Україна, Київ</Label>
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl10} id="Girl1" className="girlsimg"/> 
            <Label className="Name" >Ірина  23 роки</Label>
            <Label className="City">Україна, Київ</Label>
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl11} id="Girl1" className="girlsimg"/> 
            <Label className="Name" >Софія  26 років</Label>
            <Label className="City">Україна, Київ</Label>
          </div>  
          <div className="GirlsProfile"> 
            <img src = {Girl12} id="Girl1" className="girlsimg"/> 
            <Label className="Name" >Каріна  23 роки</Label>
            <Label className="City">Україна, Київ</Label>
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
