// const { default: Web3 } = require("web3");


App = {
    loading: false,
    contracts:{},

    load: async()=>{
         console.log("app loading...");
         await App.loadWeb3()
         await App.loadAccount()
         await App.loadContract()
        //  await App.render()
        await App.render_homePage()
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
        const deMo = await $.getJSON('demo.json');
        App.contracts.demo = TruffleContract(deMo);
        App.contracts.demo.setProvider(App.web3Provider);
        App.Demo = await App.contracts.demo.deployed();
    },

    render_homePage: async()=>{
        
        $('#account').html(App.account);

        $("#farmer").click(function(){
            console.log("farmer clicked !");
            window.location.href = "./html/farmer.html";
        });

        $("#menufacturer").click(function(){
            console.log("menufacturer clicked !!");
            window.location.href = "./html/menufecturer.html";
        });

        $("#retailer").click(function(){
            console.log("retailer clicked !");
            window.location.href = "./html/retailer.html";
        });

    },

    // render the page
    // render: async() => {

    //     var content_holder = document.getElementById("p_list");

    //     try{

    //         const count =await App.Demo.product_count.call();
            
    //         // console.log(count.toNumber());

    //         for(var i=0 ; i<count.toNumber() ; i++){
    //             const product = await App.Demo.products(i);
    //             // console.log(product);
    //             const p_id = product[0].toNumber();
    //             const p_name = product[1];
    //             console.log(p_id);

    //             var list = document.createElement("ol");
    //             list.innerText = p_name;
                
    //             content_holder.appendChild(list);

    //         }
    //     }
    //     catch(error){
    //         console.log("fucking error");
    //     }

    //     $("#account").html(App.account);

    // },

    // Add a new Product
    // farmerAddProduct: async() => {
    //     const content = $('#farmer_p_name').val();
    //     console.log(content);
    //     // await App.Demo.addProduct(content,{from:App.account});
    // }
    
}

$(() => {
    $(window).load(() => {
        App.load()  
    })
})