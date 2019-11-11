import React from 'react';
import './Compose.css';
import Picker from 'emoji-picker-react';

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

  }
  scroll = (e)=>{
    var objDiv = document.getElementById("content");
    if(objDiv.scrollTop==0)
    {
      console.log("i am 0")
    }



}
  SendClick(){
    console.log(this.MessageField.Text);
    return;

    this.sendMessages({        
        "Text":this.MessageField.Text,
        "RecipientId":this.props.RecipID,
        "SenderId":this.props.MyID
    })


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
        <button className="SendMess"><i className="fas fa-arrow-left"></i></button>
        <button className="StickName" onMouseEnter={this.MouseInStick} onMouseLeave={this.MouseLeaveStick} onClick={this.OnStickClick}><i className="far fa-smile"></i></button>
        <input
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

export default Compose;