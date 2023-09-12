import React, { Component } from 'react';
import Web3 from 'web3';
import LotteryContract from '../LottoryContract.json'
const web3 = new Web3(window.ethereum);
const lotteryContract = new web3.eth.Contract(LotteryContract.abi, 'contractAddress');

class CryptoLottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '', // The user's Ethereum account address
      balance: 0, // The user's Ethereum balance
    };
  }

  async componentDidMount() {
    // Check if the user has MetaMask or another Ethereum wallet extension installed
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Get the user's Ethereum account address
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        this.setState({ account });

        // Get the user's Ethereum balance
        const balance = await web3.eth.getBalance(account);
        this.setState({ balance: web3.utils.fromWei(balance, 'ether') });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Please install MetaMask or another Ethereum wallet extension.');
    }
  }

  handleBuyTicket = async () => {
    try {
      const { account } = this.state;
      const ticketPriceInCrypto = 1; // The price of one ticket in cryptocurrency
      const ticketPriceInWei = web3.utils.toWei(ticketPriceInCrypto.toString(), 'ether');

      // Check if the user has enough cryptocurrency balance
      const balanceInWei = await web3.eth.getBalance(account);
      if (balanceInWei < ticketPriceInWei) {
        console.error('Insufficient balance to buy a ticket.');
        return;
      }

      // Calculate the amount of points to grant based on the exchange rate
      const cryptoToPointsRatio = 2; // 1 crypto = 2 points
      const pointsToGrant = ticketPriceInCrypto * cryptoToPointsRatio;

      // Make a POST request to the server to handle the purchase and point granting
      const response = await fetch('/buy-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAddress: account,
          ticketPriceInCrypto,
          pointsToGrant,
        }),
      });

      if (response.ok) {
        console.log('Ticket bought successfully and points granted!');
        // You can update the user interface or take other actions as needed
      } else {
        console.error('Failed to buy a ticket or grant points.');
      }
    } catch (error) {
      console.error('Error buying a ticket:', error);
    }
  }

  render() {
    return (
      <div>
        <h1>Ethereum Lottery</h1>
        <p>Account: {this.state.account}</p>
        <p>Balance: {this.state.balance} ETH</p>
        <button onClick={this.handleBuyTicket}>Buy Ticket</button>
      </div>
    );
  }
}

export default CryptoLottery;
