import React from 'react';
import './Compose.css';
import Picker from 'emoji-picker-react';
import { connect } from 'react-redux';
import get from "lodash.get";
import * as getListActions from '../../../containers/userLayout/reducer';
class Compose extends React.Component{
  constructor(props) {
    super(props);

    this.MessageField=React.createRef();
    console.log('state  '+this.state)
    console.log('props:  '+this.props)
    this.StickOpen=false;
    this.MouseInStick = this.MouseInStick.bind(this);
    this.MouseLeaveStick = this.MouseLeaveStick.bind(this);
    this.OnStickClick = this.OnStickClick.bind(this);
    this.Send = this.Send.bind(this);
    this.KeyUp = this.KeyUp.bind(this);
    this.Input=React.createRef();
    
  }
  scroll = (e)=>{
    var objDiv = document.getElementById("content");
    if(objDiv.scrollTop==0)
    {
      console.log("i am 0")
    }



}
  Send(){
    if(this.Input.current.value!="")
    {
    console.log("i send mess1")
    this.props.sendMessage({        
        "Text":this.Input.current.value,
        "RecipientId":this.props.ActiveRecipient,
        "SenderId":this.props.MyID
    })
    this.props.newMessageSended({
      text:this.Input.current.value,
      recipientId:this.props.ActiveRecipient,
      senderId:this.props.MyID,
      dateCreate:new Date().toString()

    });
    this.Input.current.value="";
  }
  }
  KeyUp(e){


    if (e.keyCode === 13&&this.Input.current.value!="") {
      console.log("i send mess")
      this.props.sendMessage({        
      "Text":this.Input.current.value,
      "SenderId":this.props.MyID,
      "RecipientId":this.props.ActiveRecipient

  })

      this.props.newMessageSended({
        text:this.Input.current.value,
        recipientId:this.props.ActiveRecipient,
        senderId:this.props.MyID,
        dateCreate:new Date().toString()

      });
      this.Input.current.value="";
  }
}
  MouseInStick(){
    if(!this.StickOpen)
    {
    console.log("hi")
    var element = document.getElementById("Smiles");
    element.classList.add("Display")
    }

  }
  MouseLeaveStick(){
    if(!this.StickOpen)
    {
      var element = document.getElementById("Smiles");
      element.classList.remove("Display")

    }

  }
  OnStickClick(){
    var element = document.getElementById("Smiles");
    if(!this.StickOpen)
    {
      element.classList.add("Display")
    }
    else{
      element.classList.remove("Display")

    }


    this.StickOpen=!this.StickOpen

  }
  onEmojiChoose(event, emojiObject){
    var input = document.getElementById("SendField");

    input.value+=emojiObject.emoji;

  }
  render() {
    //var x = jwt.decode(localStorage.jwttoken)
    //console.log(x)
    return (
      <div className="compose" id="content">
        <button className="SendMess" onClick={this.Send}><i className="fas fa-arrow-left"></i></button>
        <button className="StickName" onMouseEnter={this.MouseInStick} onMouseLeave={this.MouseLeaveStick} onClick={this.OnStickClick}><i className="far fa-smile"></i></button>
        <input
          ref={this.Input}
          onKeyUp={this.KeyUp}
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
          id="SendField"
          
        />

        {
          this.props.rightItems
        }
        <div className="Smiles" id= "Smiles">
        <Picker onEmojiClick={this.onEmojiChoose} />
        </div>
      </div>
    );
}




}
const mapStateToProps = state => {
  
  return {
    listMessages: get(state, "sendMessage.isSendSuccess.data")
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: filter => {
      dispatch(getListActions.sendMessage(filter));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Compose);