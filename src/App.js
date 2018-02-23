import React, {Component} from "react";
import "./App.css";
import web3 from "./web3";
import celebs from "./lottery";
const Eth = require('ethjs-query')
// const EthContract = require('ethjs-contract')

class App extends Component {
    state = {
        manager: '',
        players: '',
        balance: '',
        price: '1',
        ownerOf: "",
        value: "hassan",
        ethAddress: "0xBD0Fa6D9962Aa6C63c5beFF163b0CA396b41B8F6"
    }

    async componentDidMount() {
        // const balance = await web3.eth.getBalance(celebs.options.address);
        console.log(celebs.methods)
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0])

        const x = await celebs.methods.ceoAddress().call();
        const y = await celebs.methods.cooAddress().call();
        console.log(x, y)

        const person = await celebs.methods.totalSupply().call({gas: '4712388', from: accounts[0]});
        console.log(person)
        // this.setState({ balance })
        // const sym = await celebs.methods.symbol().call();
        // console.log(celebs.methods)
        //
        // const am = await celebs.methods.ownerOf(0).call();
        // console.log(am)
    }

    async submit(evt) {
        // evt.preventDefault();
        // // console.log()
        // const accounts = await web3.eth.getAccounts();
        // var _owner = this.state.ethAddress;
        // var _name= this.state.value;
        // var _price= "abc";
        // console.log(celebs.methods.createPromoPerson(_owner, _name, _price));
        // const sym = await celebs.methods.createPromoPerson(_owner, _name, _price).call();
        // console.log(sym)
        //
        // const am = await celebs.methods.ownerOf(0).call();
        // console.log(am)

        // const accounts = await web3.eth.getAccounts();
        //
        // this.setState({ message: "WAIT!!!" })
        //
        // await celebs.methods.enter().send({
        //     from: accounts[0],
        //     value: web3.utils.toWei(this.state.value, 'ether')
        // })
        //
        // this.setState({ message: "Success" })
    }

    async createRadio() {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0])
        const sym = await celebs.methods.symbol().call({
            from: accounts[0]
        });
        console.log(sym, accounts[0])
        // console.log(this.state.ethAddress, this.state.value, web3.utils.toWei(this.state.price, 'ether'))
        const red = await celebs.methods.createPromoPerson("0x2e02eded04cfc8b1da8fdbc2437a4f2bfc6bbbe6", "abc", web3.utils.toWei(this.state.price, 'ether')).call({from: accounts[0]})
        console.log(red)
        // evt.preventDefault();
        //
        // const sym = await celebs.methods.purchase(0).send({
        //     from: "0x87703192d36A818FeB8fD334D1b593f358f0724C",
        //         amount: web3.utils.toWei('0.1', 'ether')
        // });
        //
        // console.log(sym)
        // const am = await celebs.methods.ownerOf(0).call();
        // console.log(am)
    }

    async checkOwner() {
        console.log(celebs, this.state.ownerOf);
        // const am = await celebs.methods.ownerOf(0).call();
        // console.log(am)
        const am = await celebs.methods.totalSupply().call();
        console.log(am)
    }
    async totalSupply() {
        const am = await celebs.methods.totalSupply().call();
        console.log(am)
    }



    render() {
        // web3.eth.getAccounts().then(console.log)
        return (
            <div>
                <h1>Lotter Contract</h1>
                <p>this is my contract manager address {this.state.manager}</p>
                <p>this is my contract manager address {this.state.players}</p>
                <p>this is my contract manager address {web3.utils.fromWei(this.state.balance, 'ether')}</p>
                <hr/>
                <p>Amount of ehter to enter: </p>
                <input placeholder="name" value={this.state.value} onChange={(evt) => {
                    this.setState({value: evt.target.value})
                }}/>
                <input placeholder="ethAddress" value={this.state.ethAddress} onChange={(evt) => {
                    this.setState({ethAddress: evt.target.value})
                }}/>
                <button onClick={this.submit.bind(this)}>Submit</button>
                <br/>
                <br/>
                <hr/>
                <br/>
                <br/>

                <p>Creaate radio station: </p>
                <input placeholder="name" value={this.state.value} onChange={(evt) => {
                    this.setState({value: evt.target.value})
                }}/>
                <input placeholder="ethAddress" value={this.state.ethAddress} onChange={(evt) => {
                    this.setState({ethAddress: evt.target.value})
                }}/>
                <input type="number" placeholder="price" value={this.state.price} onChange={(evt) => {
                    this.setState({price: evt.target.value})
                }}/>
                <button onClick={this.createRadio.bind(this)}>Create Radio</button>

                <br/>
                <hr/>
                <br/>

                <input value={this.state.ownerOf} onChange={(evt) => {
                    this.setState({ownerOf: evt.target.value})
                }}/>
                <button onClick={this.checkOwner.bind(this)}>Purchase</button>
                <button onClick={this.totalSupply.bind(this)}>Total Supply</button>


            </div>
        );
    }
}

export default App;
