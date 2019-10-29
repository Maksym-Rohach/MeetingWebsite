import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink, Card, CardBody, CarouselControl, CarouselIndicators, CarouselCaption, CarouselItem,  Col, Container, Carousel, Row, Navbar } from 'reactstrap';
import './instruments/css/palette.css';
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
            <div className="container" >
              <div className="row align-items-center">

              <Row className="container text-white mt-5 mb-5 pl-0 pr-0" >
                <Col xs="12" sm="4" md="3" >
                  <Card className="border-primary">
                    <CardBody>
                      <div>
                        <img alt ="photo" className ="img-fluid" src="https://lh3.googleusercontent.com/1M3sCaOjMM9ddzzsDW2P-rlxBMA9VV7hjan_KGxSdvtU6_gHvhICx7OjGHy2Kv8S0kZuTXqdhYDOr-J8nNZqCooei78ioKP9XLpf4GntSzwf_NC4gjKrXZlgc-0OQI2lxJgxaoAmpJLiUGRVMN3X-Uu_eP_fQ6jJ5K-kcZ3BKj9pM05u7YDhW8bcwWhRiOYBNkvzMFZ_fVqA3Gt0tggMvEZ-wT1rt7YrLYlz8MFStGI8Z75CDLKA-24xVhnKhSFxoIvZ-iIMr858-zTiCk5xNObY0NbK1yFJnh_ERiiJ_rAOTGxICjI_L7Rb0NpGZCl0bRS2BAoh87MChO59Cp9XGsrgde7u_GFnsA0ywni3LeJSHAOFxGyAlvscbaCVvr_IkU0BznZcdLGjoJlodd5AP5N8OG7ggZjzKZbrKaIQ4GfmG9A9ia8YMocYIz9WzNIs8bHDYyrZcAu7oeKqx2K7wJ49nZ1nt1xs98l4iUi89hqTXOhpKnN2Yn8UHAMnji1rB4Sxqwpd8VKbcI5KDVTt1UMp4E-dD2zRDNTIVcBVT4yM8s3ZSaXpdNmtAyP_foVttfB1QCc5eH3tshuXhhfAmufyDjFSlg_GXwphpiYSlXVzdkVKPo6wOl_f6aBwiz8By_yEHeyyrF9zgd9PmSgk_jckIEoPWZXOChY6vSWxjzpjD4xEk35Tc7c=w495-h880-no" />
                     </div>
                       Місце для вашої реклами
                <div className="text-center">
                  <a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                </div>
                  </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="4" md="3" >
              <Card className="border-primary">
                <CardBody>
                <div><img alt ="photo" className ="img-fluid" src="https://scontent.fdnk1-1.fna.fbcdn.net/v/t1.0-9/66881561_357366474909197_3040427990451224576_n.jpg?_nc_cat=109&_nc_oc=AQnb8qdUjE2eSwdRcT5KlqyWc1hdFs9QMNRvFQ1Wlx8Ngaw1NXM6QK7GgQAR-2ALBJE&_nc_ht=scontent.fdnk1-1.fna&oh=4c829acd2cfeeef31dd28a2be8fec660&oe=5E234BEB" />
                  </div>
                  Місце для вашої реклами
                  <div className="text-center"><a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                  </div>
                </CardBody>
              </Card>
            </Col>       
            <Col xs="12" sm="4" md="3">
              <Card className="border-primary">
                <CardBody>
                <div><img alt ="photo" className ="img-fluid" src="https://i.pinimg.com/564x/00/97/1b/00971b1a4b0e1fd3b369cfc14b3f5a13.jpg" />
                  </div>
                  Місце для вашої реклами
                  <div className="text-center"><a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                  </div>
                </CardBody>
              </Card>
            </Col>     
            <Col xs="12" sm="4" md="3" >
              <Card className="border-primary">
                <CardBody>
                   <div><img alt ="photo" className ="img-fluid" src="https://i.pinimg.com/564x/9b/c7/ef/9bc7efbff02137d6048946634162b4b8.jpg" />
                  </div>
                  Місце для вашої реклами
                  <div className="text-center"><a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                  </div>
                </CardBody>
              </Card>
            </Col>     
            <Col xs="12" sm="4" md="3" >
              <Card className="border-primary">
                <CardBody>
                <div><img alt ="photo" className ="img-fluid" src="https://scontent.fdnk1-1.fna.fbcdn.net/v/t1.0-9/74440160_509691536279591_223344415425429504_n.jpg?_nc_cat=108&_nc_oc=AQn06gXeZzF4m1JpXFKhf0g6RzTrwuVihYmzC98nhufF1jZFsdP84_V_f8lZcz7U0OI&_nc_ht=scontent.fdnk1-1.fna&oh=25f228cfc9ea4fe5edb97511d6ca6cd4&oe=5E52F3AB" />
                  </div>
                  Місце для вашої реклами
                  <div className="text-center"><a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                  </div>
                </CardBody>
              </Card>
            </Col>    
            <Col xs="12" sm="4" md="3" >
              <Card className="border-primary">
                <CardBody>
                <div><img alt ="photo" className ="img-fluid" src="https://i.pinimg.com/originals/1f/dd/28/1fdd287d6cc483f3630ad56e283a32ae.jpg" />
                  </div>
                  Місце для вашої реклами
                  <div className="text-center"><a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="4" md="3" >
              <Card className="border-primary">
                <CardBody>
                <div>
                  <img alt ="photo" className ="img-fluid" src="https://i.pinimg.com/564x/00/97/1b/00971b1a4b0e1fd3b369cfc14b3f5a13.jpg" />
                </div>
                  Місце для вашої реклами
                <div className="text-center">
                  <a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                </div>
                  </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="4" md="3" >
              <Card className="border-primary">
                <CardBody>
                <div><img alt ="photo" className ="img-fluid" src="https://scontent.fdnk1-1.fna.fbcdn.net/v/t1.0-9/66881561_357366474909197_3040427990451224576_n.jpg?_nc_cat=109&_nc_oc=AQnb8qdUjE2eSwdRcT5KlqyWc1hdFs9QMNRvFQ1Wlx8Ngaw1NXM6QK7GgQAR-2ALBJE&_nc_ht=scontent.fdnk1-1.fna&oh=4c829acd2cfeeef31dd28a2be8fec660&oe=5E234BEB" />
                  </div>
                  Місце для вашої реклами
                  <div className="text-center"><a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                  </div>
                </CardBody>
              </Card>
            </Col>       
            <Col xs="12" sm="4" md="3">
              <Card className="border-primary">
                <CardBody>
                <div><img alt ="photo" className ="img-fluid" src="https://i.pinimg.com/564x/00/97/1b/00971b1a4b0e1fd3b369cfc14b3f5a13.jpg" />
                  </div>
                  Місце для вашої реклами
                  <div className="text-center"><a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                  </div>
                </CardBody>
              </Card>
            </Col>     
            <Col xs="12" sm="4" md="3" >
              <Card className="border-primary">
                <CardBody>
                   <div><img alt ="photo" className ="img-fluid" src="https://i.pinimg.com/564x/9b/c7/ef/9bc7efbff02137d6048946634162b4b8.jpg" />
                  </div>
                  Місце для вашої реклами
                  <div className="text-center"><a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                  </div>
                </CardBody>
              </Card>
            </Col>     
            <Col xs="12" sm="4" md="3" >
              <Card className="border-primary">
                <CardBody>
                <div><img alt ="photo" className ="img-fluid" src="https://scontent.fdnk1-1.fna.fbcdn.net/v/t1.0-9/74440160_509691536279591_223344415425429504_n.jpg?_nc_cat=108&_nc_oc=AQn06gXeZzF4m1JpXFKhf0g6RzTrwuVihYmzC98nhufF1jZFsdP84_V_f8lZcz7U0OI&_nc_ht=scontent.fdnk1-1.fna&oh=25f228cfc9ea4fe5edb97511d6ca6cd4&oe=5E52F3AB" />
                  </div>
                  Місце для вашої реклами
                  <div className="text-center"><a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                  </div>
                </CardBody>
              </Card>
            </Col>    
            <Col xs="12" sm="4" md="3" >
              <Card className="border-primary">
                <CardBody>
                <div><img alt ="photo" className ="img-fluid" src="https://i.pinimg.com/originals/1f/dd/28/1fdd287d6cc483f3630ad56e283a32ae.jpg" />
                  </div>
                  Місце для вашої реклами
                  <div className="text-center"><a href="#" className="social-link rounded-circle text-white mr-3">See Profile</a>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

{/* 

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
                </div> */}
              </div>
            </div>
          </section>

          {/* <section className=" content-section bg-primary" id="chef">
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
          </section> */}


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
                      <h2 className="mx-auto mb-5 font-italic display-4">Хлопця або чоловіка
                                <em></em>
                      </h2>
                      <a className="btn btn-dark js-scroll-trigger " href="reservation.html">Знайти!</a>
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