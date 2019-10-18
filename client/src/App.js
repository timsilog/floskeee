import React from 'react';
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import './App.css';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

/* 



dataFromWs = {
  type: MessageType, 
  users: User[],
};
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      // names: ['gimmedafruitsnacks', 'floskeee', 'depato', 'gz_ne', 'slaughtrocks', 'stanthereaper', 'anotherguy', 'eightnine', '24guhggho2', 'username', 'eleventhname']
      // names: ['gimmedafruitsnacks', 'floskeee', 'depato']
      names: []
    }
  }
  componentDidMount = () => {
    // Make sure to change the (localhost) on the line bellow 
    // to the public DNS of your EC2 instance
    // axios.get(`ec2-54-183-71-23.us-west-1.compute.amazonaws.com`)
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log("*** MESSAGE: ***");
      console.log(message);
      const dataFromWs = JSON.parse(message.data);

      this.setState({ names: [...this.state.names, dataFromWs] });
    };

    axios.get(`http://localhost:4000/sayHello`)
      .then(res => {
        const dataFromServer = res.data;
        this.setState({ data: dataFromServer });
      });
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <p>
            {this.state.data}
          </p>
        </header>
        <div id="banner">
          <div id="list-title">
            List:
          </div>
          <div id="scroller-container">
            <div id="scroller">
              {this.state.names.map((name, i) => {
                let classString = "scroll-item";
                if (!i) {
                  classString += this.state.names.length < 10
                    ? " short"
                    : " long";
                }
                return <div className={classString}>{name.twitch}{i === this.state.names.length - 1 ? '' : ','}</div>
              })}
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              {this.state.names.map((name, i) => {
                let classString = "scroll-item";
                if (this.state.names.length < 6) {
                  classString += " hide";
                }
                return <div className={classString}>{name.twitch}{i === this.state.names.length - 1 ? '' : ','}</div>
              })}
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
