import React, { Component } from 'react';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDEFGgk8MjGVFS3VOCWb9nb44Zk4nV0d8I",
    authDomain: "simplesurvey-a2fcc.firebaseapp.com",
    databaseURL: "https://simplesurvey-a2fcc.firebaseio.com",
    storageBucket: "simplesurvey-a2fcc.appspot.com",
    messagingSenderId: "600891864383"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
        id:uuid.v1(),
        name:'',
        answers: {
          q1:'',
          q2:'',
          q3:'',
          q4:''
        },
        submitted: false
      }

      this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleNameSubmit(event){
    var name = this.refs.name.value;
    this.setState({name:name}, function(){
      console.log(this.state);
    });
    event.preventDefault();
  }

  handleQuestionSubmit(event){
    firebase.database().ref('surveys/'+this.state.id).set({
      name: this.state.name,
      answers:this.state.answers
    });

    this.setState({submitted:true}, function(){
      console.log('Questions Submitted...');
    });
    event.preventDefault();
  }

  handleQuestionChange(event){
    var answers = this.state.answers;
    if(event.target.name === 'q1'){
      answers.q1 = event.target.value;
    } else if(event.target.name === 'q2'){
      answers.q2 = event.target.value;
    } else if(event.target.name === 'q3'){
      answers.q3 = event.target.value;
    } else if(event.target.name === 'q4'){
      answers.q4 = event.target.value;
    }

    this.setState({answers:answers},function(){
      console.log(this.state);
    });
  }

  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome {this.state.name}</h2>
      questions = <span>
        <h3>Survey Questions</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <div>
            <label>What is your favorite operating system?</label><br />
            <input type="radio" name="q1" value="Windows" onChange={this.handleQuestionChange} />Windows<br />
            <input type="radio" name="q1" value="OSX" onChange={this.handleQuestionChange} />OSX<br />
            <input type="radio" name="q1" value="Linux" onChange={this.handleQuestionChange} />Linux<br />
            <input type="radio" name="q1" value="Solaris" onChange={this.handleQuestionChange} />Solaris<br />
            <input type="radio" name="q1" value="Other" onChange={this.handleQuestionChange} />Other<br />
          </div>
          <div>
          <label>Who is your favorite Dragon Ball character?</label><br />
          <input type="radio" name="q2" value="Goku" onChange={this.handleQuestionChange} />Goku<br />
          <input type="radio" name="q2" value="Vegeta" onChange={this.handleQuestionChange} />Vegeta<br />
          <input type="radio" name="q2" value="Piccolo" onChange={this.handleQuestionChange} />Piccolo<br />
          <input type="radio" name="q2" value="Krillin" onChange={this.handleQuestionChange} />Krillin<br />
          <input type="radio" name="q2" value="Gohan" onChange={this.handleQuestionChange} />Gohan<br />
        </div>
        <div>
          <label>What is your favorite video game?</label><br />
          <input type="radio" name="q3" value="World of Warcraft" onChange={this.handleQuestionChange} />World of Warcraft<br />
          <input type="radio" name="q3" value="Xenoverse 2" onChange={this.handleQuestionChange} />Xenoverse 2<br />
          <input type="radio" name="q3" value="Diablo" onChange={this.handleQuestionChange} />Diablo<br />
          <input type="radio" name="q3" value="Call of Duty" onChange={this.handleQuestionChange} />Call of Duty<br />
          <input type="radio" name="q3" value="Other" onChange={this.handleQuestionChange} />Other<br />
        </div>
        <div>
          <label>What is your favorite food?</label><br />
          <input type="radio" name="q4" value="Pizza" onChange={this.handleQuestionChange} />Pizza<br />
          <input type="radio" name="q4" value="Pretzels" onChange={this.handleQuestionChange} />Pretzels<br />
          <input type="radio" name="q4" value="Pizza" onChange={this.handleQuestionChange} />Pizza<br />
          <input type="radio" name="q4" value="Burgers" onChange={this.handleQuestionChange} />Burgers<br />
          <input type="radio" name="q4" value="Other" onChange={this.handleQuestionChange} />Other<br />
        </div>
        <input type="submit" value="Submit" />
        </form>
      </span>
    } else if(!this.state.name && this.state.submitted === false){
      user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type="text" placeholder="Enter Name..." ref="name" />
        </form>
      </span>;
      questions = '';
    } else if(this.state.submitted === true){
      user = <h2>Thank You {this.state.name} for taking our survey!</h2>
    }
    return (
      <div className="App">
        <div className="App-header text-center">
          <h2>Simple Survey</h2>
        </div>
        <div className="text-center">
          {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>
    );
  }
}

export default App;
