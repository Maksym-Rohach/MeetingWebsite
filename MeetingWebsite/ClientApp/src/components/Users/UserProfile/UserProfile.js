import React from "react";
import * as getUserActions from './reducer';
import Cropper from "react-cropper"
import { ImagePicker } from 'react-file-picker'
import 'cropperjs/dist/cropper.css';
import { connect } from 'react-redux';
import get from "lodash.get";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import { Z_BLOCK } from "zlib";

const cropper = React.createRef(null);

var Zodiacs = {};

Zodiacs['Овен'] = 'Овен ♈';
Zodiacs['Телець'] = 'Телець ♉';
Zodiacs['Близнюки'] = 'Близнюки ♊';
Zodiacs['Рак'] = 'Рак ♋';
Zodiacs['Лев'] = 'Лев ♌';
Zodiacs['Діва'] = 'Діва ♍';
Zodiacs['Терези'] = 'Терези ♎';
Zodiacs['Скорпіон'] = 'Скорпіон ♏';
Zodiacs['Стрілець'] = 'Стрілець ♐';
Zodiacs['Козеріг'] = 'Козеріг ♑';
Zodiacs['Водолій'] = 'Водолій ♒';
Zodiacs['Риби'] = 'Риби ♓';



//onChangeHandler = event => {

//    //console.log(event.target.files[0])

//}

class UserProfile extends React.Component {

   

    constructor(props) {
        super(props);
        this.state =
            {
                isLoading: true,
                nickName: "",
                description: "",
                age: 0,
                city: "",
                gender: "",
                zodiac: "",
                email: ""
            };
        this.Click = this.Click.bind(this);
    }

    componentDidMount = () => {
        this.props.getUserData();
        this.setState({ nickName: this.props.listUsers.nickName, description: this.props.listUsers.description, age: this.props.listUsers.age, city: this.props.listUsers.city, gender: this.props.listUsers.gender, zodiac: this.props.listUsers.zodiac, email: this.props.listUsers.email });
        console.log("---stateggggggggggggggg--------------------------------", this.state);

    }

    PostChanges = (name, source) => {
        this.setState({ [name]: source }); 
    }

    Click(e) {
        e.preventDefault();
        console.log("---state!!!!!!!!!!!!!!!!--------------------------------", this.state);
        const { nickName, description, age, city, gender, zodiac, email } = this.state;
        let NickName = nickName;
        let Description = description;
        let City = city;
        let Email = email
        this.props.setUserData({ NickName, Description, City, Email })
    }

    _crop() {
        // image in dataUrl
        // console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }
    

    render() {
        const { nickName, description, age, city, gender, zodiac, email } = this.props.listUsers ;
        console.log("---state--------------------------------", this.state);
        console.log("---props--------------------------------", this.props);
        
    return (
        <>
            <Modal isOpen={false}>
                <ModalBody>
                <Cropper
                    ref={cropper}
                        src='https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    style={{ height: 400, width: '100%' }}
                    // Cropper.js options
                    aspectRatio={1 / 1}
                    guides={false}
                        crop={this._crop.bind(this)} />
                </ModalBody>
            </Modal>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                              <h5 className="title">Редагувати профіль</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <a style={{ paddingLeft: '15%'  }} href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img  style={{height: 200, width: 200}}
                                                        alt="..."
                                                        className="avatar"
                                                        src={require("assets/img/emilyz.jpg")}
                                                    />
                                                </a>
                                            </FormGroup>
                                        </Col>
                                        <Col md="8">
                                            <FormGroup style={{ maxHeight: 200, height: 200 }}>
                                                <label>Про мене</label>
                                                <Input name="descr" style={{ maxHeight: 160, height: 160 }}
                                                    cols="80"
                                                    defaultValue={description}
                                                    
                                                    placeholder="Тут може бути ваший опис."
                                                    rows="8"
                                                    type="textarea"
                                                    onChange={(e) => this.PostChanges('description', e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                     <Row>
                                         <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Нікнейм</label>
                                                <Input
                                                    name="nick"
                                                    defaultValue={nickName}
                                                    placeholder="(Ваше ім'я або вигаданий нікнейм)"
                                                    type="text"
                                                    onChange={(e) => this.PostChanges('nickName', e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-md-1" md="2">
                                            <FormGroup>
                                                <label>Стать</label>
                                                <label style={{ fontSize: 20, display: 'block' }} className="title">{gender}</label>
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1"  md="5">
                                             <FormGroup>
                                                  <label htmlFor="exampleInputEmail1">
                                                      Ел. пошта
                                                  </label>
                                                <Input
                                                    name="email"
                                                    placeholder="mike@email.com"
                                                    type="email"
                                                   defaultValue={email}
                                                    onChange={(e) => this.PostChanges('email', e.target.value)}
                                                />
                                             </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    
                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>Місто</label>
                                                <Input
                                                    name="city"
                                                   defaultValue={city}
                                                    placeholder="(Необов'язково)вул. Центральна"
                                                    type="text"
                                                    onChange={(e) => this.PostChanges('city', e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                          <Col className="pr-md-1" md="4">
                                           <FormGroup>
                                                <label>Знак зодіаку</label>
                                                <label style={{ fontSize: 20, display: 'block' }} className="title">{Zodiacs[zodiac]}</label>
                                           </FormGroup>
                                         </Col> 
                                        
                                         <Col className="pl-md-1" md="2">
                                            <FormGroup>
                                                <label>Вік</label>
                                                <label className="form-control" style={{ fontSize: 20, display: 'block', border: 1, borderColor: '#2b3553', borderRadius: 25 }} className="title">{age}</label>
                                            </FormGroup>
                                         </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button className="btn-fill" color="primary" type="submit" onClick={this.Click}>
                                Зберегти
                              </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                  
                </Row>
           </div>
      </>
    );
  }
}
const mapStateToProps = state => {
    console.log("State=======", state);
    return {
        listUsers: get(state, "userProf.list.data"),
        isListLoading: get(state, "userProf.list.loading"),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: filter => {
            dispatch(getUserActions.getUserData(filter));
        },
        setUserData: filter => {
            dispatch(getUserActions.setUserData(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
