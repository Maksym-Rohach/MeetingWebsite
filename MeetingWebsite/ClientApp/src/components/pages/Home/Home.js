import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink, CarouselControl, CarouselIndicators, CarouselCaption, CarouselItem,  Col, Container, Carousel, Row, Navbar } from 'reactstrap';
import './instruments/scss/palette.scss';
import logo from './instruments/img/logo.jpg';
const items = [
{
  src: 'http://pngimg.com/uploads/alien/alien_PNG27.png',
  altText: 'Slide 1',
  caption: 'Марсіанин',
},
{
  src: 'https://i.pinimg.com/originals/d0/6a/e0/d06ae0849c47867d80afd8be7e0073a6.png',
  altText: 'Slide 2',
  caption: 'Віночок',
},
{
  src: 'https://bipbap.ru/wp-content/uploads/2018/01/579a4bc07d7bf15632b7e802.png',
  altText: 'Slide 3',
  caption: 'Пончик',
},
];

class Home extends Component {

constructor(props)
{
  super(props);
  this.state = {activeIndex: 0 };
  this.next = this.next.bind(this);
  this.previous = this.previous.bind(this);
  this.goToIndex = this.goToIndex.bind(this);
  this.onExiting = this.onExiting.bind(this);
  this.onExited = this.onExited.bind(this);
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
//const {activeIndex} = this.state;

// const slides = items.map((item)=> {
// return (
//   <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
//   <img className="d-block w-100" src={item.src} alt={item.altText} />
// </CarouselItem>
// );
// });

// const slides = items.map((item) => {
//   return (
//     <CarouselItem
//       onExiting={this.onExiting}
//       onExited={this.onExited}
//       key={item.src}
//     >
//       <img className="d-block w-100" src={item.src} alt={item.altText} />
//       <CarouselCaption 
//       // captionText={item.caption} 
//       captionHeader={item.caption} />
//     </CarouselItem>
//   );
// });

      return (
        <React.Fragment>


          <Nav pills className="navbar navbar-expand-lg  bg-black shadow fixed-top">
            <NavItem>
              <NavLink href ="#"><img alt="bobik" className="img-fluid" src={logo}  style={{width: 35, height: 35}}/> </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className="social-link rounded-circle text-white mr-3">GIRLS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className="social-link rounded-circle text-white mr-3"> BOYS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className="social-link rounded-circle text-white mr-3"> LOGIN</NavLink>
            </NavItem>
          </Nav>


          {/* <nav className="navbar navbar-expand-lg  bg-black shadow fixed-top">
            <div className="container ">
                <a className="navbar-brand" href=""><img alt="bobik" className="img-fluid" src={logo}  style={{width: 35, height: 35}}/> </a> 
              <div className="justify-content-center">         
              <ul className="list-inline my-auto">
                <li className="list-inline-item">
                  <a className="social-link rounded-circle text-white mr-3" href="#">
                    GIRLS
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="social-link rounded-circle text-white mr-3" href="#">
                    BOYS
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="social-link rounded-circle text-white" href="#">
                    LOGIN
                  </a>
                </li>
              </ul>
              </div> 
              </div>
          </nav> */}

          <nav id="sidebar-wrapper">
            <ul className="sidebar-nav">
              <li className="sidebar-brand mt-3">
                <a className="js-scroll-trigger" href="index.html">PALETTE</a>
              </li>
              <li className="sidebar-nav-item">
                <a className="js-scroll-trigger" href="index.html">Home</a>
              </li>
              <li className="sidebar-nav-item">
                <a className="js-scroll-trigger" href="about.html">About</a>
              </li>
              <li className="sidebar-nav-item">
                <a className="js-scroll-trigger" href="chef.html">Chef</a>
              </li>
              <li className="sidebar-nav-item">
                <a className="js-scroll-trigger" href="menu.html">Menu</a>
              </li>
              <li className="sidebar-nav-item">
                <a className="js-scroll-trigger" href="testimonials.html">Testimonials</a>
              </li>
              <li className="sidebar-nav-item">
                <a className="js-scroll-trigger" href="reservation.html">Reserve</a>
              </li>
            </ul>
          </nav>

          <header id="masthead" className="masthead d-flex pb-5 ">
            <div className="container text-center text-white my-auto">
              <h1 className="mb-1 text-white display-4 animated fadeInUp  delay-1s ">LOVE IS...</h1>
              <h3 className="mb-5">
                <p className="mb-5 wow fadeInUp  ">Найкращий сайт знайомств в Україні</p>
              </h3>
              <a className=" js-scroll-trigger text-white animated fadeInUp  delay-1s" href="#about"><i className="fas fa-chevron-down "></i></a>
            </div>
            <div className="overlay"></div>
          </header>

          <section className="content-section text-white    bg-primary" id="about">
            <div className="container">
              <div className="row p-3">

                <div className="row align-items-center ">
                  <div className="col-8 col-md-4 animated fadeInUp  delay-1s">
                    <img alt="image" className="img-fluid" src="./img/bread-4077812_1920.jpg" />
                  </div>

                  <div className="col-4 col-md-2 animated fadeInUp  delay-1s">
                    <div className="row">
                      <div className="col-12">
                        <img alt="image" className="img-fluid" src="./img/4.jpg" />
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-12">
                        <img alt="image" className="img-fluid" src="./img/3.jpg" />
                      </div>
                    </div>
                  </div>

                  <div className=" col-md-6 col-lg-5 ml-auto pt-5 pt-md-0 animated fadeInUp  delay-1s">

                    <h1><img alt="image" className="img-fluid" src="./img/pallete.svg" /> </h1>
                    <p className="mt-3">Aenean vitae dolor luctus, aliquet odio vitae, rhoncus enim. In hac habitasse platea dictumst. Integer non viverra ipsum. Pellentesque accumsan orci in molestie finibus. </p>
                    <p className="mt-3">Aenean vitae dolor luctus, aliquet odio vitae, rhoncus enim. In hac habitasse platea dictumst. Integer non viverra ipsum. Pellentesque accumsan orci in molestie finibus. </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className=" text-white content-section bg-about">
            <div className="container">
              <div className="row align-items-center">

                <div className="col-12 col-lg-6 col-xl-5 ml-sm-auto pt-lg-0 animated fadeInUp  delay-1s">
                  <h1 className="display-4 font-italic mb-2">We Offer</h1>

                  <div className="row ">
                    <div className="col-12 col-sm-6 col-xl-5">
                      <h4 className="my-3 display-5 font-italic">Pasta's</h4>
                      <p>Nam faucibus euismod velit, a accumsan metus. </p>
                    </div>
                    <div className="col-12 col-sm-6 col-xl-5 m-auto pt-3 pt-sm-0">
                      <h4 className="my-3 display-5 font-italic">Fresh Breads</h4>
                      <p> Morbi ipsum quam, aliquam vitae risus at, faucibus ultricies quam.</p>
                    </div>
                  </div>

                  <div className="row pt-3">
                    <div className="col-12 col-sm-6 col-xl-5">
                      <h4 className="my-3 display-5 font-italic">Pizza</h4>
                      <p>Nam faucibus euismod velit, a accumsan metus. </p>
                    </div>
                    <div className="col-12 col-sm-6 col-xl-5 m-auto pt-3 pt-sm-0">
                      <h4 className="my-3 display-5 font-italic">Farm to Table </h4>
                      <p> Morbi ipsum quam, aliquam vitae risus at, faucibus ultricies quam.</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-8 col-lg-6 m-md-auto ml-lg-0 mr-lg-auto  mt-2 animated fadeInUp  delay-1s">
                  <div id="featured-carousel" className="carousel slide carousel-fade" data-ride="carousel">

                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img className="d-block w-100" src="./img/spaghetti-863304_1280.jpg" alt="First slide" />
                      </div>
                      <div className="carousel-item">
                        <img className="d-block w-100" src="./img/bread-4077812_1920.jpg" alt="Second slide" />
                      </div>
                      <div className="carousel-item">
                        <img className="d-block w-100" src="./img/2.jpg" alt="Third slide" />
                      </div>
                      <div className="carousel-item">
                        <img className="d-block w-100" src="./img/pasta-1181189_1920.jpg" alt="Third slide" />
                      </div>
                    </div>
                    <a className="carousel-control-prev" href="#featured-carousel" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#featured-carousel" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section className=" content-section bg-primary" id="chef">
            <div className="container text-white  mt-5 mb-5">
              <div className="row">
                <div className="col-md-8 animated fadeInUp  delay-1s">
                  <img className="img-fluid" src="./img/chef-1245676_1920.jpg" alt="" />
                </div>
                <div className="col-md-4 animated fadeInUp  delay-1s">
                  <h2 className="my-3 display-4 font-italic"> Our Chef </h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et. </p>
                  <h3 className="my-3 display-5 font-italic">Resume</h3>
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Culinary Studies</a>
                      <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Work History</a>
                      <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Bio</a>
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section className="content-section  bg-light text-black ">
            <div className="container ">
              <div className="row text-center slws-heading mb-3 animated fadeInUp  delay-1s">
                <div className="col-md-8 offset-md-2 ">
                  <h2 className="display-4 font-italic">Testimonials</h2>
                  <p className="sub-heading ">Nam faucibus euismod velit, a accumsan metus. Morbi ipsum quam.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 pt-5 animated fadeInUp  delay-1s">

                  <div id="testimonials" className="carousel slide " data-ride="carousel">

                    <ol className="carousel-indicators ">
                      <li data-target="#testimonials" data-slide-to="0" className="active"></li>
                      <li data-target="#testimonials" data-slide-to="1"></li>
                      <li data-target="#testimonials" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner ">
                      <div className="item carousel-item active">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="media">
                              <div className="media-left d-flex mr-3">
                                <a href="#">
                                  <img src="img/testimonial1.jpg" alt="" />
                                </a>
                              </div>
                              <div className="media-body">
                                <div className="testimonial">
                                  <p>Lorem ipsum dolor sit amet, consec adipiscing elit. Nam eusem scelerisque tempor, varius quam luctus dui. Mauris magna metus nec.</p>
                                  <p className="overview "><b>Paula Wilson</b>, Media Analyst</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="media">
                              <div className="media-left d-flex mr-3">
                                <a href="#">
                                  <img src="img/testimonial2.jpg" alt="" />
                                </a>
                              </div>
                              <div className="media-body">
                                <div className="testimonial">
                                  <p>Vestibulum quis quam ut magna consequat faucibus. Pellentesque eget mi suscipit tincidunt. Utmtc tempus dictum. Pellentesque virra.</p>
                                  <p className="overview"><b>Antonio Moreno</b>, Web Developer</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item carousel-item">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="media">
                              <div className="media-left d-flex mr-3">
                                <a href="#">
                                  <img src="img/testimonial3.jpg" alt="" />
                                </a>
                              </div>
                              <div className="media-body">
                                <div className="testimonial">
                                  <p>Lorem ipsum dolor sit amet, consec adipiscing elit. Nam eusem scelerisque tempor, varius quam luctus dui. Mauris magna metus nec.</p>
                                  <p className="overview"><b>Michael Holz</b>, Seo Analyst</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="media">
                              <div className="media-left d-flex mr-3">
                                <a href="#">
                                  <img src="img/testimonial4.jpg" alt="" />
                                </a>
                              </div>
                              <div className="media-body">
                                <div className="testimonial">
                                  <p>Vestibulum quis quam ut magna consequat faucibus. Pellentesque eget mi suscipit tincidunt. Utmtc tempus dictum. Pellentesque virra.</p>
                                  <p className="overview"><b>Mary Saveley</b>, Web Designer</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item carousel-item">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="media">
                              <div className="media-left d-flex mr-3">
                                <a href="#">
                                  <img src="img/testimonial2.jpg" alt="" />
                                </a>
                              </div>
                              <div className="media-body">
                                <div className="testimonial">
                                  <p>Lorem ipsum dolor sit amet, consec adipiscing elit. Nam eusem scelerisque tempor, varius quam luctus dui. Mauris magna metus nec.</p>
                                  <p className="overview"><b>Martin Sommer</b>, UX Analyst</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="media">
                              <div className="media-left d-flex mr-3">
                                <a href="#">
                                  <img src="img/testimonial4.jpg" alt="" />
                                </a>
                              </div>
                              <div className="media-body">
                                <div className="testimonial">
                                  <p>Vestibulum quis quam ut magna consequat faucibus. Pellentesque eget mi suscipit tincidunt. Utmtc tempus dictum. Pellentesque virra.</p>
                                  <p className="overview"><b>John Williams</b>, Web Developer</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary text-white text-center" id="services">
            <div className="container-fluid p-0">
              <div className="row no-gutters">
                <div className="col-md-6">

                  <section className="callout">
                    <div className="container text-center text-white animated fadeInUp  delay-1s">
                      <h2 className="mx-auto mb-5 font-italic display-4">Need Catering?
                                <em></em>
                      </h2>
                      <a className="btn btn-dark js-scroll-trigger " href="reservation.html">Reserve Now!</a>
                    </div>
                  </section>
                </div>
                <div className="col-md-6 animated fadeInUp  delay-1s">

                  <section className="callout-1">
                    <div className="container text-center text-white ">
                      <h2 className="mx-auto mb-5 font-italic display-4">Event Reservations
                            </h2>
                      <a className="btn btn-dark js-scroll-trigger" href="reservation.html">Reserve Now!</a>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>


          <section id="reservation" className="description_content mt-3">
            <div className="text-content container">
              <div className="inner contact animated fadeInUp  delay-1s">
                <div className="contact-form">

                  <form id="contact-us" method="post" action="php/reserve.php">
                    <div className="container text-white">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 mt-3">
                          <h2>PALETTE </h2>
                          <h3>Reservations</h3>
                          <p>
                            Nam faucibus euismod velit, a accumsan metus. Morbi ipsum quam, aliquam vitae risus at, faucibus ultricies quam..
                                    </p>
                        </div>
                        <div className="col-lg-5 col-md-5 ">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                              <input type="text" name="first_name" id="first_name" required="required" className="form" placeholder="First Name" />
                              <input type="text" name="last_name" id="last_name" required="required" className="form" placeholder="Last Name" />
                              <input type="text" name="state" id="state" required="required" className="form" placeholder="State" />
                              <label type="text" className="sr-only">Date</label>
                              <input type="text" name="datepicker" id="datepicker" required="required" className="form" placeholder="Reservation Date" />
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-6">
                              <input type="text" name="phone" id="phone" required="required" className="form" placeholder="Phone" />
                              <input type="text" name="guest" id="guest" required="required" className="form" placeholder="Guest Number" />
                              <input type="email" name="email" id="email" required="required" className="form" placeholder="Email" />
                              <input type="text" name="subject" id="subject" required="required" className="form" placeholder="Subject" />
                            </div>

                            <div className="col-md-6 ">
                              <button type="submit" id="submit" name="submit" className="text-center btn btn-dark">Reserve</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12 text-white mt-3">
                          <div className="">
                            <h2>Hours</h2>
                            <hr />
                            <p>Monday to Friday: 7:30 AM - 11:30 AM</p>
                            <p>Saturday & Sunday: 8:00 AM - 9:00 AM</p>
                            <p>Monday to Friday: 12:00 PM - 5:00 PM</p>
                            <p>Monday to Saturday: 6:00 PM - 1:00 AM</p>
                            <p>Sunday to Monday: 5:30 PM - 12:00 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="clear"></div>
                  </form>
                </div>
              </div>
            </div>
          </section>

            
                
          <footer className="footer text-center p-4">
            <div className="container">
              <p className="text-muted small mb-0">Copyright &copy; <a href="https://sleakwebstore.com/">Sleak Web Store 2019 </a>| Designed By <a href="https://sleakdesign.com/"> Sleak Design INC</a></p>
            </div>
          </footer>         
        </React.Fragment>
    );
  }
}   
export default Home;

// {  
//            <div className="animated fadeIn">
//                <Container>
//                    <Row >
//                        <Col xs="12" xl="12" >
//  <Form>
//  <h1> Сайт знайомств </h1>  
//  <p className ="text">Привіт світ </p>
//  </Form> 
//  <Carousel  
// {    className="Carousel-fixed-top blur"
//   interval={false}
//   ride={true}
//   activeIndex={activeIndex}
//   next={this.next}
//   previous={this.previous}
//   onClickHandler={this.goToIndex}
//   ride="carousel">
          
//     <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
//     {slides}
//     <CarouselControl direction="prev" directionText="Попередній" onClickHandler={this.previous} />
//     <CarouselControl direction="next" directionText="Наступний" onClickHandler={this.next} />

// </Carousel>

//      </Col>
//      </Row>

//      </Container>
//      </div> 

//       );
//     }
//    } }