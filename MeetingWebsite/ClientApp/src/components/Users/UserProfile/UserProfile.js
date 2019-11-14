import React from "react";
import Select from 'react-select';
import * as getUserActions from './reducer';
import * as editUserActions from './reducer';
//import { ImagePicker } from 'react-file-picker'
import 'cropperjs/dist/cropper.css';
import { connect } from 'react-redux';
import get from "lodash.get";
import Cropper from "react-cropper";
import CropperPage from "../../Cropper/CropperPage";
import { serverUrl } from "../../../config";
 

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
const Avatar = "assets/img/emilyz.jpg";

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
                isLoadedPrevious: false,
                nickName: "",
                description: "",
                age: 18,
                city: "",
                gender: "",
                zodiac: "",
                email: "",
                avatar: Avatar,
                showCropper: false
            };
        this.Click = this.Click.bind(this);
    }

    componentDidUpdate = () => {
        if (this.props.user.email != null && this.props.user.email != "" && !this.state.isLoadedPrevious) {
            this.setState({ isLoadedPrevious: true, 
                nickName: this.props.user.nickName, 
                description: this.props.user.description, 
                age: this.props.user.age, 
                city: this.props.user.city, 
                gender: this.props.user.gender, 
                zodiac: this.props.user.zodiac, 
                email: this.props.user.email,
                avatar: this.props.user.avatar
             });
        }
    }

    componentWillReceiveProps =(nextProps)=>{
        console.log("AAAAAAAAAAAAAAAAAA", nextProps);
this.setState({avatar: nextProps.user.avatar});
    }

    componentDidMount = () => {
        console.log("componentDidMount==========================");
        this.props.getUserData();
    }

    // static getDerivedStateFromProps(nextProps, prevState){
    //     //console.log("ssssssssssssssssssssssssss",nextProps);
    //     return{
    //         nickName: this.props.user.nickName, 
    //         description: this.props.user.description, 
    //         age: this.props.user.age, 
    //         city: this.props.user.city, 
    //         gender: this.props.user.gender, 
    //         zodiac: this.props.user.zodiac, 
    //         email: this.props.user.email,
    //         avatar: this.props.user.avatar
    //     };
    // }

    PostChanges = (name, source) => {
        this.setState({ [name]: source }); 
    }

    Click(e) {
        e.preventDefault();
        const { nickName, description, age, city, gender, zodiac, email, avatar } = this.state;
        let NickName = nickName;
        let Description = description;
        let City = city;
        let Email = email;
        let Avatar = avatar;
        this.props.setUserData({ NickName, Description, City, Email, Avatar });
    }

    _crop() {
        // image in dataUrl
        // console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }
    
    getCroppedImage = img => {
        this.setState({
        //   avatar: img,
          showCropper: false
        });
        console.log("CROPER ==============", img);
        this.props.editPhoto(img);
    }

    render() {
        if (!this.props.user) {
            return (<div>хрень {this.props.user}</div>)
        }

        const { nickName, description, age, gender, zodiac, email, avatar } = this.state;
        const City = {value: 'w', label: this.state.city};
        const Cities = this.props.user.cities;
        
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
                                                
                                                    <img  style={{height: 200, width: 200}}
                                                        alt="..."
                                                        className="avatar"
                                                        src={`${serverUrl}${avatar}?t=${new Date().getTime()}`}/>
                                                    
                                                <CropperPage ref="cropperPage" getCroppedImage={this.getCroppedImage} /> 

                                                
                                            </FormGroup> 
                                        </Col>
                                        <Col md="8">
                                            <FormGroup style={{ maxHeight: 200, height: 200 }}>
                                                <label>Про мене</label>
                                                <Input name="descr" style={{ maxHeight: 160, height: 160 }}
                                                    cols="80"
                                                    value={description}
                                                    onChange={(e) => this.PostChanges('description', e.target.value)}
                                                    placeholder="Тут може бути ваший опис."
                                                    rows="8"
                                                    type="textarea"
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
                                                <Select
                                                    name="city"
                                                    value={City}
                                                    onChange={(e) => this.PostChanges('city', e.label)}
                                                    options={Cities}
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
    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQ", state);
    return {
        user: get(state, "userProf.list.data"),
        isListLoading: get(state, "userProf.list.loading"),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: filter => {
            dispatch(getUserActions.getUserData(filter));
        },
        setUserData: filter => {
            dispatch(editUserActions.setUserData(filter));
        },
        editPhoto: avatar => {
            dispatch(editUserActions.editPhoto(avatar));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);