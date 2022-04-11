App = {

    contracts:{},

    load: async()=>{
         console.log("app loading...");
         await App.loadWeb3();
         await App.loadAccount();
         await App.loadContract();
         await render();
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


async function render() {

    const x = document.getElementById("retail_container");
    const len = await App.Demo.product_count.call();

    for(var i = 0 ; i<len ; i++){

        const product = await App.Demo.products(i);
        
        if(product[3] === "farmer")continue;

        var newDiv=  document.createElement("div");
        newDiv.className="div-container";
        newDiv.setAttribute("id" , i.toString());

        // Add product name
        var variable = document.createElement("h2");
        variable.innerHTML = product[1];
        variable.style.margin = "5px 5px 5px 5px";
        newDiv.appendChild(variable);

        // add menufectured date of the product
        // variable = document.createElement('p');
        // variable.innerHTML = "Men. Date: " + product[4].toString();
        // variable.style.margin = "0px 5px 5px 5px";
        // newDiv.appendChild(variable);
        
        // add expired date of the product
        // variable = document.createElement('p');
        // variable.innerHTML = "Expr Date: " + product[5].toString();
        // variable.style.margin = "0px 5px 5px 5px";
        // newDiv.appendChild(variable);



        // add price of the product
        // variable = document.createElement('p');
        // variable.innerHTML = "MRP: " + product[2].toString();
        // variable.style.margin = "0px 5px 5px 5px";
        // newDiv.appendChild(variable);

        variable = document.createElement('button');
        variable.innerHTML = "Check !";
        variable.style.position="relative";
        variable.onclick = function(){
            show_details(product);
        }
        newDiv.appendChild(variable);


        //styling the newDiv container
        newDiv.style.border = "solid #0000FF";
        newDiv.style.margin = "20px 20px 20px 20px";

        x.appendChild(newDiv);
    }
}

function show_details(product){
    // alert("Checked !");
    localStorage.setItem("product_details" , JSON.stringify(product) );
    window.open('qr.html');
}