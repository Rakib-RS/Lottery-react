const Web3 = require("web3");
// const ethEnabled = async () => {
//   if (window.ethereum) {
//     await window.ethereum.send('eth_requestAccounts');
//     window.web3 = new Web3(window.ethereum);
//     return true;
//   }
//   return false;
// }
const web3 = new Web3(window.ethereum)
  window.ethereum.enable().catch(error => {
    //user denied account access
    console.log(error);
  })
export default web3;