import React from 'react';
import axios from 'axios';
// import './App.css';

function App() {
  state = {
    data: ''
  }
  componentDidMount = () => {
    // Make sure to change the (localhost) on the line bellow 
    // to the public DNS of your EC2 instance
    // axios.get(`ec2-54-183-71-23.us-west-1.compute.amazonaws.com`)
    axios.get(`http://localhost:4000/sayHello`)
      .then(res => {
        const dataFromServer = res.data;
        this.setState({ data: dataFromServer });
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {this.state.data}
        </p>
      </header>
    </div>
  );
}

export default App;
