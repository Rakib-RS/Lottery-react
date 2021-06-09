import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import { Component } from "react";
import lottery from "./lottery";
class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "waiting on transaction success.." });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });
    this.setState({ message: "you are entered into the lottery!" });
  };
  onClick = async() =>{
    const accounts = await web3.eth.getAccounts();
    this.setState({message:'waiting on transaction success..'})
    await lottery.methods.pickWinner().send({from:accounts[0]});
    this.setState({message:'A winner has been picked!'});
  }
  render() {
    web3.eth.getAccounts().then(console.log);
    console.log(lottery.options.address);
    const { manager, players, balance, value, message } = this.state;

    return (
      <div className="App">
        <h2>The lottery contract </h2>
        <p>
          This Contract is managed by {manager}. There are currently{" "}
          {players.length} people entered, competing to win{" "}
          {web3.utils.fromWei(balance, "ether")} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Try your luck!</h4>
          <label>Amount of ether</label>
          <input
            value={value}
            onChange={(event) => this.setState({ value: event.target.value })}
          />
          <button>Enter</button>
        </form>
        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a Winner!</button>
        <hr />
        <h1>{message}</h1>
      </div>
    );
  }
}

export default App;
