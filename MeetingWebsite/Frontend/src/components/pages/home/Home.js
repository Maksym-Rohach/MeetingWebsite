import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CarouselControl, CarouselIndicators, CarouselCaption, CarouselItem,  Col, Container, Carousel, Row, Navbar } from 'reactstrap';
// import './css/bootstrap.css';
// import './css/slidefolio.css';
// import './font-awesome/css';
// import './font-awesome/fonts';

// import img1 from 'http://pngimg.com/uploads/alien/alien_PNG27.png';
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
const {activeIndex} = this.state;

// const slides = items.map((item)=> {
// return (
//   <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
//   <img className="d-block w-100" src={item.src} alt={item.altText} />
// </CarouselItem>
// );
// });

const slides = items.map((item) => {
  return (
    <CarouselItem
      onExiting={this.onExiting}
      onExited={this.onExited}
      key={item.src}
    >
      <img className="d-block w-100" src={item.src} alt={item.altText} />
      <CarouselCaption 
      // captionText={item.caption} 
      captionHeader={item.caption} />
    </CarouselItem>
  );
});

      return (
<React.Fragment>
        



  <div id="top" className="header">
    <div className="vert-text">
      <br />
      

    </div>
  </div>
  
  <div id="nav">
    <nav className="navbar navbar-new" role="navigation">
     <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#mobilemenu">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
     
  <Navbar >
    <div className="collapse navbar-collapse" id="mobilemenu">
  
      <ul className="nav navbar-nav navbar-right text-center">
        <li><a href="# " ><i className="fa fa-home"></i> Home</a></li>
        <li><a href="# " ><i className="fa fa-info"></i> About</a></li>
        <li><a href="# " ><i className="fa fa-laptop"></i> Services</a></li>
        <li><a href="# " ><i className="fa fa-camera"></i> Portfolio</a></li>
        <li><a href="# " ><i className="fa fa-envelope"></i> Contact</a></li>
      </ul>
    </div>

    </Navbar>
    </div>
    
    </div>
  </nav>
  </div>	
      <div id="about" className="about_us">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <h2>About Us</h2>
              <p className="lead">Lorem ipsum dolor sit amet, ei essent delenit sit, adipisci salutatus has eu. Quis tamquam cu nam. Sed esse deleniti et, ex rebum quaestio his. Audiam deseruisse sed cu, vix ex possim causae omittantur.</p>
            </div>
          </div>
      </div>
      </div>
      <div id="services" className="services">
        <div className="container">
          <div className="row">
                <div className="col-md-4 col-md-offset-4 text-center">
              <h2>Our Services</h2>
              <hr/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="service-item">
                <i className="service-icon fa fa-camera-retro fa-3x"></i>
                <h3>Portrait</h3>
                <p>Ad has dicat ridens consetetur, eos eu option persius. Mollis cotidieque conclusionemque per id, ne nam alienum liberavisse. </p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="service-item">
        <i className="service-icon fa fa-camera fa-3x"></i>
                <h3>Black & white</h3>
                <p>In mea similique vulputate, ea cum amet malorum dissentiunt. Qui deleniti aliquando cu, ullum soluta his an, id inani salutatus sit.</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="service-item">
                <i className="service-icon fa fa-globe fa-3x"></i>
                <h3>Web Design</h3>
                <p>Ad has dicat ridens consetetur, eos eu option persius. Mollis cotidieque conclusionemque per id, ne nam alienum liberavisse.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="portfolio" className="portfolio">
      <div className="container">
      <div className="row push50">
            <div className="col-md-4 col-md-offset-4 text-center">
              <h2>Our Work</h2>
        <h3>
        <span className="filter label label-default" data-filter="all">ALL</span>
    <span className="filter label label-default" data-filter="bw">B&amp;W</span>
    <span className="filter label label-default" data-filter="nature">Nature</span>
    <span className="filter label label-default" data-filter="portraits">Portraits</span>
    </h3>
              <hr/>
            </div>
          </div>
      
      <div className="row">
      
      <div className="gallery">
      
            <ul id="Grid" className="gcontainer">
              <li className="col-md-4 col-sm-4 col-xs-12 mix bw portraits" data-cat="graphics">
                <a data-toggle="modal" data-target="#portrait1" className="mix-cover">
                  <img className="horizontal" src="http://pngimg.com/uploads/alien/alien_PNG27.png" alt="placeholder"/>
                  <span className="overlay"><span className="valign"></span><span className="title">Portrait 1</span></span>
                </a>                
              </li>
              <li className="col-md-4 col-sm-4 col-xs-12 mix portraits" data-cat="graphics">
                  <a data-toggle="modal" data-target="#portrait2" className="mix-cover">
                    <img className="horizontal" src="http://pngimg.com/uploads/alien/alien_PNG27.png" alt="placeholder"/>
                    <span className="overlay"><span className="valign"></span><span className="title">Portrait 2</span></span>
                  </a>                
              </li>
          <li className="col-md-4 col-sm-4 col-xs-12 mix nature" data-cat="nature">
                  <a data-toggle="modal" data-target="#nature1" className="mix-cover">
                    <img className="horizontal" src="http://pngimg.com/uploads/alien/alien_PNG27.png" alt="placeholder"/>
                    <span className="overlay"><span className="valign"></span><span className="title">Nature 1</span></span>
                  </a>
              </li>
              <li className="col-md-4 col-sm-4 col-xs-12 mix portraits" data-cat="portraits">
                  <a data-toggle="modal" data-target="#portrait3" className="mix-cover">
                    <img className="horizontal" src="http://pngimg.com/uploads/alien/alien_PNG27.png" alt="placeholder"/>
                    <span className="overlay"><span className="valign"></span><span className="title">Portrait 3</span></span>
                  </a>
              </li>
          <li className="col-md-4 col-sm-4 col-xs-12 mix portraits" data-cat="portraits">
                  <a data-toggle="modal" data-target="#portrait5" className="mix-cover">
                    <img className="horizontal" src="http://pngimg.com/uploads/alien/alien_PNG27.png" alt="placeholder"/>
                     <span className="overlay"><span className="valign"></span><span className="title">Portrait 5</span></span>
                  </a>
              </li>
          <li className="col-md-4 col-sm-4 col-xs-12 mix nature" data-cat="nature">
                  <a data-toggle="modal" data-target="#nature" className="mix-cover">
                    <img className="horizontal" src="http://pngimg.com/uploads/alien/alien_PNG27.png" alt="placeholder"/>
                    <span className="overlay"><span className="valign"></span><span className="title">Nature</span></span>
                  </a>
              </li>
              <li className="col-md-4 col-sm-4 col-xs-12 mix portraits" data-cat="portrait">
                  <a data-toggle="modal" data-target="#portrait4" className="mix-cover green">
                    <img className="vertical" src="http://pngimg.com/uploads/alien/alien_PNG27.png" alt="portrait 4"/>
                    <span className="overlay"><span className="valign"></span><span className="title">Portrait 4</span></span>           
                  </a>
              </li>
          <li className="col-md-4 col-sm-4 col-xs-12 mix bw nature all" data-cat="portrait">
                  <a data-toggle="modal" data-target="#forest" className="mix-cover green">
                    <img className="vertical" src="http://pngimg.com/uploads/alien/alien_PNG27.png" alt="Forest"/>
                     <span className="overlay"><span className="valign"></span><span className="title">Forest</span></span>                    
                  </a>
              </li>
          <li className="col-md-4 col-sm-4 col-xs-12 mix bw nature all" data-cat="bw">
                  <a data-toggle="modal" data-target="#bw1" className="mix-cover green">
                    <img className="vertical" src="http://pngimg.com/uploads/alien/alien_PNG27.png" alt="Black and White"/>
                     <span className="overlay"><span className="valign"></span><span className="title">Black &amp; White</span></span>                  
                  </a>
              </li>
            </ul>   
     <div className="modal fade" id="portrait1" tabindex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 className="modal-title text-center">Portrait 1</h4>
        </div>
        <div className="modal-body">
         <img className="thumbnail" alt="Portrait1" src="img/portrait1.jpg"/>
        </div>
      </div>
    </div>
      </div>
  
    <div className="modal fade" id="portrait2" tabindex="-1" role="dialog"  aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 className="modal-title text-center">Portrait 2</h4>
        </div>
        <div className="modal-body">
         <img className="thumbnail" alt="Portrait1" src="img/portrait2.jpg"/>
        </div>
      </div>
    </div>
  </div>
  
  <div className="modal fade" id="portrait3" tabindex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 className="modal-title text-center">Portrait 3</h4>
        </div>
        <div className="modal-body">
         <img className="thumbnail" alt="Portrait1" src="img/portrait3.jpg"/>
        </div>
      </div>
    </div>
  </div>
  
  <div className="modal fade" id="portrait4" tabindex="-1" role="dialog"  aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 className="modal-title text-center">Portrait 4</h4>
        </div>
        <div className="modal-body">
         <img className="thumbnail" alt="Portrait1" src="img/portrait4.jpg"/>
        </div>
      </div>
    </div>
  </div>
  
  <div className="modal fade" id="portrait5" tabindex="-1" role="dialog"  aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 className="modal-title text-center">Portrait 5</h4>
        </div>
        <div className="modal-body">
         <img className="thumbnail" alt="Portrait1" src="img/portrait5.jpg"/>
        </div>
      </div>
    </div>
  </div>
  
  <div className="modal fade" id="nature" tabindex="-1" role="dialog"  aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 className="modal-title text-center">Nature</h4>
        </div>
        <div className="modal-body">
         <img className="thumbnail" alt="nature" src="img/nature.jpg"/>
        </div>
      </div>
    </div>
  </div>
  
  <div className="modal fade" id="nature1" tabindex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 className="modal-title text-center">Nature 1</h4>
        </div>
        <div className="modal-body">
         <img className="thumbnail" alt="nature" src="img/nature1.jpg"/>
        </div>
      </div>
    </div>
  </div>  
  
  <div className="modal fade" id="forest" tabindex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 className="modal-title text-center">Forest</h4>
        </div>
        <div className="modal-body">
         <img className="thumbnail" alt="forest" src="img/forest.jpg"/>
        </div>
      </div>
    </div>
  </div>
  
  <div className="modal fade" id="bw1" tabindex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 className="modal-title text-center">Black and White</h4>
        </div>
        <div className="modal-body">
         <img className="thumbnail" alt="forest" src="img/bw1.jpg"/>
        </div>
      </div>
    </div>
  </div>
  
    </div>	
        </div>
      </div>
        </div>
       <div id="contact">
        <div className="container">
          <div className="row">
      <div className="col-md-4 col-md-offset-4 text-center">
              <h2>Contact Us</h2>
        <hr/>
            </div>
            <div className="col-md-5 col-md-offset-3">
              <form action="contact" id="contact-form" className="form-horizontal">
        <fieldset>
                  <div className="form-group">
                    <label className="col-sm-4 control-label" for="name">Your Name</label>
                    <div className="col-sm-8">
                      <input type="text"  placeholder="Your Name" className="form-control" name="name" id="name"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label" for="email">Email Address</label>
                    <div className="col-sm-8">
                      <input type="text" placeholder="Enter Your Email Address" className="form-control" name="email" id="email"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label" for="subject">Subject</label>
                    <div className="col-sm-8">
                      <input type="text" placeholder="Subject" className="form-control" name="subject" id="subject"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label" for="message">Your Message</label>
                    <div className="col-sm-8">
                      <textarea placeholder="Please Type Your Message" className="form-control" name="message" id="message" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="col-sm-offset-4 col-sm-8">
                    <button type="submit" className="btn btn-success">Submit</button>
                    <button type="reset" className="btn btn-primary">Cancel</button>
                  </div>
              </fieldset>
              </form>
          
            </div>
          </div>
        </div>
      </div>
       <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 text-center">
             <h2>Thank You</h2>
             <em>Copyright &copy; Company 2013</em>
            </div>
          </div>
        </div>
      </footer>
       

      </React.Fragment>
/* 

 
//           <div className="animated fadeIn">
//               <Container>
//                   <Row >
//                       <Col xs="12" xl="12" >
// <Form>
// <h1> Сайт знайомств </h1>  
// <p className ="text">Привіт світ </p>
// </Form> 
// <Carousel 
//   className="Carousel-fixed-top blur"
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
//      </div> */

      );
    }
   }
  
  export default Home;
  