import React, {Component} from "react";
import "./App.css";
import web3 from "./web3";
import celebs from "./lottery";
const Eth = require('ethjs-query')
// const EthContract = require('ethjs-contract')

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            manager: '',
            ceo: '',
            coo: '',
            totalRadios: '',
            name: '',
            symbol: '',
            currentMetaMaskAcc: '',
            players: '',
            balance: '',
            price: '1',
            newRadioName: '',
            newRadioAddress: '',
            newRadioPrice: '',
            radioInfo: [],
            ownerOf: "",
            purchaseRadioId: "",
            purchaseValue: "",
            value: "hassan",
            ethAddress: "0xBD0Fa6D9962Aa6C63c5beFF163b0CA396b41B8F6"
        }
        this.purchaseRadio = this.purchaseRadio.bind(this);
    }

    async componentDidMount() {
        // const balance = await web3.eth.getBalance(celebs.options.address);
        // console.log(celebs.methods.purchase)
        const accounts = await web3.eth.getAccounts();
        // console.log(accounts[0])

        const n = await celebs.methods.NAME().call();
        const s = await celebs.methods.SYMBOL().call();
        const x = await celebs.methods.ceoAddress().call();
        const y = await celebs.methods.cooAddress().call();
        const totalRadios = await celebs.methods.totalSupply().call();
        var radioInfo = [];
        for (var i=0; i<totalRadios; i++) {
            var radio = await celebs.methods.getPerson(i).call();
            radioInfo.push(radio);
        }
        this.setState({
            ceo: x,
            coo: y,
            name: n,
            symbol: s,
            currentMetaMaskAcc: accounts[0],
            totalRadios,
            radioInfo
        })
        // console.log(radioInfo)

        // const person = await celebs.methods.totalSupply().call({gas: '4712388', from: this.state.currentMetaMaskAcc});
        // console.log(person)
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

    async createRadio(evt) {
        evt.preventDefault();
        // console.log(this.state.ethAddress, this.state.value, web3.utils.toWei(this.state.price, 'ether'))
        const res = await celebs.methods.createPromoPerson(this.state.newRadioAddress, this.state.newRadioName, web3.utils.toWei(this.state.newRadioPrice, 'ether')).send({gas: '4712388', from: this.state.currentMetaMaskAcc})
        console.log(res)
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

    async changeCEO (){
        const res = await celebs.methods.setCEO(this.state.newCeo).send({gas: '4712388', from: this.state.currentMetaMaskAcc});
        console.log(res, 'change CEO')
    }

    async purchaseRadio(id, address, price) {
        console.log(id, price, address)
        const res = await celebs.methods.purchase(parseInt(id)).send({
            gas: '4712388',
            from: this.state.currentMetaMaskAcc,
            value: price
        })
        console.log(res)
    }

    render() {
        var self = this;
        // web3.eth.getAccounts().then(console.log)
        return (
            <div>
                <h1>RadioLit Contract</h1>
                <p>Contract <b>Name:</b> {this.state.name}</p>
                <p>Contract <b>Symbol:</b> {this.state.symbol}</p>

                <p>Contract <b>CEO:</b> {this.state.ceo}</p>
                <input value={this.state.newCeo} onChange={(evt) => {this.setState({newCeo: evt.target.value})}}/> <button onClick={this.changeCEO.bind(this)}>Change CEO</button>

                <p>Contract <b>COO:</b> {this.state.coo}</p>
                <p>Number of <b>Total Radios:</b> {this.state.totalRadios}</p>

                <p><i>Current <b>MetaMask</b> Account: </i> {this.state.currentMetaMaskAcc}</p>
                {/*<p>this is my contract manager address {web3.utils.fromWei(this.state.balance, 'ether')}</p>*/}
                {/*<hr/>*/}
                {/*<p>Amount of ehter to enter: </p>*/}
                {/*<input placeholder="name" value={this.state.value} onChange={(evt) => {*/}
                    {/*this.setState({value: evt.target.value})*/}
                {/*}}/>*/}
                {/*<input placeholder="ethAddress" value={this.state.ethAddress} onChange={(evt) => {*/}
                    {/*this.setState({ethAddress: evt.target.value})*/}
                {/*}}/>*/}
                {/*<button onClick={this.submit.bind(this)}>Submit</button>*/}
                <br/>
                <br/>
                <hr/>
                <br/>
                <br/>

                <h3>Create Radio Station: </h3>
                <input type="text" placeholder="Radio Name" value={this.state.newRadioName} onChange={(evt) => {
                    this.setState({newRadioName: evt.target.value})
                }}/>
                <input type="text" placeholder="Eth Address" value={this.state.newRadioAddress} onChange={(evt) => {
                    this.setState({newRadioAddress: evt.target.value})
                }}/>
                <input type="number" placeholder="Radio Price in ETH" value={this.state.newRadioPrice} onChange={(evt) => {
                    this.setState({newRadioPrice: evt.target.value})
                }}/>
                <button onClick={this.createRadio.bind(this)}>Create Radio</button>

                <br/>
                <hr/>
                <br/>

                {/*<input value={this.state.ownerOf} onChange={(evt) => {*/}
                    {/*this.setState({ownerOf: evt.target.value})*/}
                {/*}}/>*/}
                {/*<button onClick={this.checkOwner.bind(this)}>Purchase</button>*/}
                {/*<button onClick={this.totalSupply.bind(this)}>Total Supply</button>*/}

                <br/>
                <br/>
                {/*<hr/>*/}
                <br/>
                <br/>

                <h3>All Radios</h3>
                <br/>

                <table>
                    <tbody>
                        <tr>
                            <th>Radio ID</th>
                            <th>Radio Name</th>
                            <th>Selling Price</th>
                            <th>Owner</th>
                            <th>Purchase</th>
                        </tr>
                            {
                                this.state.radioInfo.map(function (radio, index) {
                                    return(
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{radio.personName}</td>
                                            <td>{web3.utils.fromWei(radio.sellingPrice, 'ether')}</td>
                                            <td>{radio.owner}</td>
                                            <td>
                                                <button onClick={self.purchaseRadio.bind(this, index, radio.owner, radio.sellingPrice)}>Purchase</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
                <hr/>
                <br/>
                <br/>

                {/*<h3>Purchase a Radio</h3>*/}
                {/*<br/>*/}
                {/*<input placeholder="Radio ID" value={this.state.purchaseRadioId} onChange={(evt) => {this.setState({purchaseRadioId: evt.target.value})}}/>*/}
                {/*<input placeholder="Price" value={this.state.purchaseValue} onChange={(evt) => {this.setState({purchaseValue: evt.target.value})}}/>*/}
                {/*<button onClick={this.purchaseRadio.bind(this)}>Purchase</button>*/}
            </div>
        );
    }
}

export default App;
