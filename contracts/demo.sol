// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract demo{

    uint public product_count = 0;

    struct Product{
        uint p_id;
        string product_name;
        uint p_price;
        string owener;
        string mnfctr_date;
        string expr_date; 
        string mrp;
    }

    // who is the current user of the contract
    string user; 
    function set_cuurent_user(string memory _user) public{
        user = _user;
    }


    Product[] public products;

    function addProduct(string memory p_name , uint _p_price) public {
        
        product_count++;

        products.push(Product({
            p_id: product_count,
            product_name: p_name, 
            p_price: _p_price,
            owener: "farmer",
            mnfctr_date: "",
            expr_date: "",
            mrp: ""
        }));
        
    }

    function shiftProduct_toRetailer(uint ind , string memory f_date , string memory s_date , string memory _mrp) public {
        products[ind].owener = "retailer";
        products[ind].mnfctr_date = f_date;
        products[ind].expr_date = s_date; 
        products[ind].mrp = _mrp;
    }
    
}
