import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import { Component } from "react";
import lottery from './lottery';
class App extends Component {
  state ={
    manager:'',
  }
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    this.setState({manager});
  }
  render() {
    web3.eth.getAccounts().then(console.log)

    return (
      <div className="App">
        <h2>This Contract is managed by {this.state.manager} </h2>
      </div>
    );
  }
}

export default App;
