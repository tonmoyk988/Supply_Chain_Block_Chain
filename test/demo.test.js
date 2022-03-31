
const demoTest = artifacts.require('demo');
var demoInstance;

contract('demo' , ()=>{
    
    it('Should deply contract properly' , async() => {
        demoInstance = await demoTest.deployed();
        console.log(demoInstance.address);
        assert(demoInstance.address !== '');
    });

    it('Product Added' , async() => {
        const result = await demoInstance.addProduct("new product");
        await demoInstance.addProduct("new product adde 2");
        
        let cnt = await demoInstance.product_count.call();
        console.log(cnt.toNumber());
    });



})

// contract('Demo' , (accounts)=>{
//     BeforeUnloadEvent(async () =>{
//         this.demo = await Demo.deployed();
//     })

//     instanceof()
// })