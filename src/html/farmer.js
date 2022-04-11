// const { default: Web3 } = require("web3");


App = {

    contracts:{},

    load: async()=>{
         console.log("app loading...");
         await App.loadWeb3();
         await App.loadAccount();
         await App.loadContract();
    },
    
    loadWeb3: async() => {
        
        // Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
            // Request account access
            await window.ethereum.request({ method: "eth_requestAccounts" });;
            } catch (error) {
            // User denied account access...
            console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        // web3 = new Web3(App.web3Provider);
        
    },

    loadAccount: async()=>{
        const accounts =await ethereum.request({ method: 'eth_requestAccounts' });
        App.account = accounts[0];
        console.log(App.account)
    },

    // create a javaScript versin of the "demo.sol" contract
    loadContract: async () => {
        const deMo = await $.getJSON('../demo.json');
        App.contracts.demo = TruffleContract(deMo);
        App.contracts.demo.setProvider(App.web3Provider);
        App.Demo = await App.contracts.demo.deployed();
        console.log("successfull");
    }
    
    
},

$(() => {
    $(window).load(() => {
        App.load()  
    })
})

async function farmerAddProduct() {
    App.load();
    const content = $('#farmer_p_name').val();
    const content_price = $('#farmer_price').val();
    console.log(content);
    await App.Demo.addProduct(content,content_price,{from:App.account});
}