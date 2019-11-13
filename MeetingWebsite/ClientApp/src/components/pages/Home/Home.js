import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Row} from 'reactstrap';
import './instruments/css/palette.css';
import { connect } from 'react-redux';
import get from "lodash.get";
import * as getListActions from './reducer';
import EclipseWidget from '../../eclipse';
import Header from './NavBar';
import Footer from './Footer';
import { logout } from '../login/reducer';
import { serverUrl } from "../../../config";

//import { transform } from '@babel/core';
 const items = [
 {
 caption: '... це насамперед відповідальність, а потім уже насолода',
 },
 {
 caption: '... це виявити найкраще одне в одному',
 },
 {
 caption: '... покласти часточку лимона в її чай.',
 },
 ]; 

class Home extends Component {

constructor(props)
{
  super(props);
  this.state = {
    listUsers:[]
  };

}

componentDidMount = () => { 
  console.log("..... Prrrrr");
  this.props.getUserData();
}

signOut=(e)=> {
  e.preventDefault();
  this.props.logout();
}

 onExiting(){
   this.animathing = true;
 }

 onExited(){
   this.animathing = false;
 }

 next(){
   if(this.animathing) return;
   const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
   this.setState({ activeIndex: nextIndex });
 }

 previous(){
   if (this.animathing) return;
   const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
   this.setState({ activeIndex: nextIndex });
 }

 goToIndex(newIndex) {
   if (this.animating) return;
   this.setState({ activeIndex: newIndex });
 }

render() {
//const {activeIndex, listUsers, isListLoading} = this.state;
const {isListLoading, listUsers, login} = this.props; 
console.log("listUsers", listUsers);

return (
        <React.Fragment>


          {isListLoading && <EclipseWidget />}

          <Header onLogout={e => this.signOut(e)}
          login={login} />

          <header id="masthead" className="masthead d-flex pb-5 ">
            <div className="container text-center text-white my-auto">
              <h1 className="mb-1 text-white display-4 animated fadeInUp  delay-1s ">LOVE IS...</h1>
              <h3 className="mb-5">
                <p className="mb-5 wow fadeInUp ">Найкращий сайт знайомств в Україні</p>
              </h3>
              <a className=" js-scroll-trigger text-white animated fadeInUp  delay-1s" href="#about"><i className="fas fa-chevron-down "></i></a>
            </div>
            <div className="overlay"></div>
          </header>


          <section className="content-section bg-light text-black " id="about">
            <div className="container text-center text-black my-auto">
              <div className="align-items-center ">
                <h1 className="mx-auto mb-5 font-italic display-4" > Ніяк не виходить знайти свою другу половинку? </h1> 
                <p className="mb-5 wow fadeInUp font-italic" > Живучи в XXI столітті практично будь-яку проблему можна вирішити за допомогою інтернету. Досить просто зареєструватися на сайті знайомств і приступити до спілкування з іншими користувачами, чиї анкети ваc зацікавлять.</p>
                  <Link to = "/register">
                    <button className="btn btn-dark js-scroll-trigger display-6 font-italic text-white mb-5" >Зареєструватися</button>
                  </Link>
              </div>
            </div>
          </section>


          <section className=" text-white content-section bg-about">
            <div className="container" >
              <div className="row align-items-center">
                <Row className="container text-white mt-5 mb-5 pl-0 pr-0" >
                  {
                    listUsers.map(item => {
                      return (
                        <Col xs="12" sm="4" md="3" >
                          <Card className="border-primary">
                            <CardBody>
                              <div key={item.id}>
                                <img alt="photo" className="img-fluid"  src={`${serverUrl}${item.avatar}?t=${new Date().getTime()}`}/> 
                              </div>
                              <Row>
                                <strong className="ml-3 text-secondary">{item.name}</strong>
                                <p className="ml-2">   {item.age} років</p>
                              </Row>
                              <Row>
                                <p className="ml-3">{item.city}, Україна</p>
                              </Row>
                              <Row>
                                <p className="ml-3"> {item.zodiac}</p>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                      )
                    })
                  }

                  {/* <Col xs="12" sm="4" md="3" >
              <Card className="border-primary">
                <CardBody>
                <div><img alt ="photo" className ="img-fluid" src="https://i.pinimg.com/originals/1f/dd/28/1fdd287d6cc483f3630ad56e283a32ae.jpg" />
                  </div>
                  Місце для вашої реклами
                  <div className="text-center"><a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                  </div>
                </CardBody>
              </Card>
            </Col>  */}

                </Row>
              </div>
            </div>
          </section>


          <section className="content-section  bg-light text-black ">
            <div className="container ">
              <div className=" text-center slws-heading mb-3 animated fadeInUp  delay-1s">
                 <h2 className="display-4 font-italic">Love is</h2>
                  <p className="mb-5 wow fadeInUp font-italic" >Що таке любов?</p>
                  <p className="mb-5 wow fadeInUp font-italic" > Взаємна, чесна, вірна ... Та невидима есенція, що літає в повітрі, та невелика напруга між ледь знайомими людьми, та немов магнітне тяжіння до людини - це і є любов в її чистому вигляді?
                   Як же можна встигати знайомитися, коли нема часу і голову підняти, щоб оцінити чудеса природи: красу чистого неба або ранкову краплю роси на травинці? Насичений ритм нашого життя, коли один день летить за іншим, коли сотні, тисячі людей проносяться мимо і не помічають один одного ...
                   Складно зараз знайомитись, а вже тим більше зустріти «того самого», і перебуваючи щодня серед людей, можна продовжувати відчувати себе самотнім. </p>
              </div>
            </div>
          </section>


          <section className="bg-primary text-white text-center" id="services">
            <div className="container-fluid p-0">
              <div className="row no-gutters">
                <div className="col-md-6 animated fadeInUp  delay-1s">

                  <section className="callout">
                    <div className="container text-center text-white animated fadeInUp  delay-1s">
                      <h2 className="mx-auto mb-5 font-italic display-4">Хлопця або чоловіка
                      </h2>
                      <Link to = "/boys">
                        <button className="btn btn-dark js-scroll-trigger" >Знайти!</button>
                        </Link>
                    </div>
                  </section>

                </div>
                <div className="col-md-6 animated fadeInUp  delay-1s">

                  <section className="callout-1">
                    <div className="container text-center text-white ">
                      <h2 className="mx-auto mb-5 font-italic display-4">Дівчину або жінку
                      </h2>
                      <Link to = "/#">
                        <button className="btn btn-dark js-scroll-trigger" >Знайти!</button>
                        </Link>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>


          <Footer></Footer>


        </React.Fragment>
    );
  }
}  

const mapStateToProps = state => {
  console.log("mapStateToProps=======", state);
  return {
    login: state.login,
    listUsers: get(state, "home.post.data"),
    isListLoading: get(state, "home.post.loading"),  
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: filter => {
      dispatch(getListActions.getUserData(filter));
    },
    logout: filter => {
      dispatch(logout(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);