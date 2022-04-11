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

var item_id ;

async function render() {

    const count =await App.Demo.product_count.call();
    console.log(count.toNumber());
            
    const x = document.getElementById("container");

    
    for(var i = 0 ; i<count.toNumber() ; i++){
        
        const product = await App.Demo.products(i);


        if(product[3] === "retailer" )continue;

        var newDiv=  document.createElement("div");
        newDiv.className="div-container";
        newDiv.setAttribute("id" , i.toString());

        // Add product name
        var variable = document.createElement("h2");
        variable.innerHTML = product[1];
        variable.style.margin = "5px 5px 5px 5px";
        newDiv.appendChild(variable);

        // add price of the product
        variable = document.createElement('p');
        variable.innerHTML = "Price: " + product[2].toString();
        variable.style.margin = "0px 5px 5px 5px";
        newDiv.appendChild(variable);

        //add buy_pop up to the cuurent elemet
        var pop_up = document.getElementById("form_container_id");
        newDiv.appendChild(pop_up);


        // add the "BUY" button
        variable = document.createElement("button");
        variable.innerHTML = "BUY !";
        variable.onclick = function(){
            
            const text = document.getElementById("form_container_id");
            text.classList.add('show');
            item_id = product[0].toNumber();

        };
        variable.style.margin = "0px 5px 5px 5px";
        newDiv.appendChild(variable);
        
        
            

        //styling the newDiv container
        newDiv.style.border = "solid #0000FF";
        newDiv.style.margin = "20px 20px 20px 20px";

        x.appendChild(newDiv);
    }

    // console.log(newDiv);

}


async function shift_button(){
    // alert(item_id);
    const f_date = $('#menufectured_date').val();
    const s_date = $('#expired_date').val();
    var _mrp = $('#mrp').val();

    if( f_date === "" || s_date === "" || _mrp === ""){
        alert("Fill up the form !");
        return;
    }

    // alert(_mrp);
    await App.Demo.shiftProduct_toRetailer(item_id-1, f_date, s_date, _mrp,{from:App.account});
    location.reload();


    console.log(_mrp);


    // localStorage.setItem("product_id" , item_id);
    // window.open('qr.html');
}