import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink, Card, CardBody, CarouselControl, CarouselIndicators, CarouselCaption, CarouselItem,  Col, Container, Carousel, Row, captionHeader, caption } from 'reactstrap';
import './instruments/css/palette.css';
import { connect } from 'react-redux';
import get from "lodash.get";
import * as getListActions from './reducer';
import EclipseWidget from '../../eclipse';
import Header from './NavBar';
import Footer from './Footer';
import { logout } from '../login/reducer';
import { withRouter } from 'react-router-dom';

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
    listUsers:[],
     activeIndex: 0 
  };
   this.next = this.next.bind(this);
   this.previous = this.previous.bind(this);
   this.goToIndex = this.goToIndex.bind(this);
   this.onExiting = this.onExiting.bind(this);
   this.onExited = this.onExited.bind(this);
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

  const slides = items.map((item)=> {
  return (
    <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
     <CarouselCaption captionText = {item.caption} />   
   </CarouselItem>
  
  );
  });

  const slides2 = items.map((item) => {
    return (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
      >
        <img className="d-block w-100" src={item.src} alt={item.altText} />
        <CarouselCaption 
        captionText={item.caption} 
        captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });
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


          <section className="content-section text-white    bg-light text-black " id="about">
            <div className="container text-center text-white my-auto">
              <h2 className="display-4 font-italic">Як все працює? </h2>
              <div className="align-items-center ">
                <a className="btn btn-dark display-4 font-italic" href="#/register">Знайдіть свою ідеальну пару</a>
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
                                <img alt="photo" className="img-fluid" src="https://scontent.fdnk1-1.fna.fbcdn.net/v/t1.0-9/66881561_357366474909197_3040427990451224576_n.jpg?_nc_cat=109&_nc_oc=AQnb8qdUjE2eSwdRcT5KlqyWc1hdFs9QMNRvFQ1Wlx8Ngaw1NXM6QK7GgQAR-2ALBJE&_nc_ht=scontent.fdnk1-1.fna&oh=4c829acd2cfeeef31dd28a2be8fec660&oe=5E234BEB" />
                              </div>
                              <Row>
                                <strong className="ml-3">{item.name}</strong>
                                <p className="ml-2">   {item.age}</p>
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
              <div className="row text-center slws-heading mb-3 animated fadeInUp  delay-1s">
                <div className="col-md-8 offset-md-2 ">
                  <h2 className="display-4 font-italic">Love is?</h2>
                  <p className="sub-heading ">Якщо ви перебуваєте в активному пошуку майбутнього обранця, користуйтеся послугами тільки нашого сайту))))</p>
                  <h3 className="display-4 font-italic">Любов - це ... </h3>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 pt-5 animated fadeInUp  delay-1s"></div>
              </div>
              {/* <div className="animated fadeIn">
                <Container>
                  <Row >
                    <Col xs="12" xl="12" >
                      <Carousel
                         className="Carousel-fixed-top blur"
                         interval={false}
                        ride={true}
                        activeIndex={activeIndex}
                        next={this.next}
                        previous={this.previous}
                         onClickHandler={this.goToIndex}
                        ride="carousel">
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        <CarouselItem>
                          <img
                            className="d-block w-100"
                            src="https://picsum.photos/800/400?text=First slide&bg=373940"
                            alt="First slide"
                          />
                          <CarouselCaption>
                            <h3>"... це насамперед відповідальність, а потім уже насолода"</h3>
                          </CarouselCaption>
                        </CarouselItem>

                        <CarouselItem>
                          <img
                            className="d-block w-100"
                            src="https://picsum.photos/800/400?text=Second slide&bg=282c34"
                            alt="Third slide"
                          />
                          <CarouselCaption>
                            <h3>"... це виявити найкраще одне в одному"</h3>
                          </CarouselCaption>
                        </CarouselItem>

                        <CarouselItem>
                          <img
                            className="d-block w-100"
                            src="https://picsum.photos/800/400?text=Third slide&bg=20232a"
                            alt="Third slide"
                          />
                          <CarouselCaption>
                            <h3>"... покласти часточку лимона в її чай."</h3>
                          </CarouselCaption>
                        </CarouselItem>

                        <CarouselControl direction="prev" directionText="Попередній" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Наступний" onClickHandler={this.next} />
                      </Carousel>
                    </Col>
                  </Row>
                </Container>
              </div> */}
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
                      <a className="btn btn-dark js-scroll-trigger " href="#/boys">Знайти!</a>
                    </div>
                  </section>

                </div>
                <div className="col-md-6 animated fadeInUp  delay-1s">

                  <section className="callout-1">
                    <div className="container text-center text-white ">
                      <h2 className="mx-auto mb-5 font-italic display-4">Дівчину або жінку
                      </h2>
                      <a className="btn btn-dark js-scroll-trigger" href="#">Знайти!</a>
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


//export default withRouter(connect(mapStateToProps, mapDispatchToProps, { logout })(Home));
export default connect(mapStateToProps, mapDispatchToProps)(Home);



