// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract demo{

    uint  product_count = 0;

    struct Product{
        uint p_id;
        string name;
    }

    Product[]  products;

    function addProduct(string memory p_name) public {
        
        product_count++;

        products.push(Product({
            p_id: product_count,
            name: p_name 
        }));
        
    }

    
}

