import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CarouselCaption, CarouselItem,  Col, Container, Carousel, Row } from 'reactstrap';
// import img1 from 'http://pngimg.com/uploads/alien/alien_PNG27.png';
const items = [
{
  src: 'http://pngimg.com/uploads/alien/alien_PNG27.png',
  altText: 'Slide 1',
  caption: 'Slide 1',
},
{
  src: 'https://i.pinimg.com/originals/d0/6a/e0/d06ae0849c47867d80afd8be7e0073a6.png',
  altText: 'Slide 2',
  caption: 'Slide 2',
},
{
  src: 'https://bipbap.ru/wp-content/uploads/2018/01/579a4bc07d7bf15632b7e802.png',
  altText: 'Slide 3',
  caption: 'Slide 3',
},

];


class Home extends Component {

constructor(props)
{
  super(props);
  this.state = {activeIndex: 0};
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
  if(this.animathing)return;
  const nextIndex = this.state.activeIndex === items.length -1 ? 0 :this.state.activeIndex + 1;
  this.setState({activeIndex: nextIndex});
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
const slides = items.map((item)=> {
return (
  <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
  <img className="d-block w-100" src={item.src} alt={item.altText} />
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
      <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
    </CarouselItem>
  );
});

      return (
          <div className="animated fadeIn">
              <Container>
                  <Row >
                      <Col >
 
     
{/* <Form>
<h1> Сайт знайомств </h1>  
<p className ="text">Привіт світ </p>
</Form> */}
<Carousel activeIndex = {activeIndex} next = {this.next} previous= {this.previous} ride= "carousel">
{slides}
</Carousel>

     </Col>
     </Row>
     </Container>
     </div>
      );
    }
  }
  
  export default Home;
  