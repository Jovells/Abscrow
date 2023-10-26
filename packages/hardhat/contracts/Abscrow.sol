// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./eCedi.sol";


contract Abscrow {
    address public owner;  // The owner of the contract

    address public ECEDI_ADDRESS;


    mapping(uint256 => Purchase) public purchases;

    uint256 public numPurchases;

    struct Purchase{
        uint256 purchaseId;
        address buyer;
        address seller;
        uint256 amount;
        bool isReleased;
        bool isShipped;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Only the Owner can perform this operation");
        _;
    }
    
    modifier onlyBuyer( uint256 purchaseId){
        require(msg.sender == purchases[purchaseId].buyer, "Only the Buyer can perform this operation");
        _;
        }
    
    modifier onlySeller(uint256 purchaseId){
        require(msg.sender == purchases[purchaseId].seller, "Only the Seller can perform this operation");
        _;
    }
    
    event Sale(
        address indexed buyer,
        uint256 purchaseId,
        uint256 totalAmount
    );
    event Refund(
        address indexed buyer,
        address indexed seller,
        uint256 purchaseId,
        uint256 totalAmount
    );

    event Release(
        address indexed buyer,
        uint256 purchaseId,
        uint256 totalAmount
    );

    event Shipped(
        address indexed buyer,
        uint256 purchaseId,
        uint256 totalAmount
    );


    constructor( address _ECEDI_ADDRESS) {
        owner = msg.sender;
        // set payment ERC20 token
        ECEDI_ADDRESS = _ECEDI_ADDRESS;
    }

    function getPurchases(uint start, uint end) public view returns (Purchase[] memory) {
        require(start <= end, "Invalid range");
        // if (end > numPurchases) {
        //     end = numPurchases;
        // }
        uint length = end - start + 1;
        Purchase[] memory _purchases = new Purchase[](length);
        uint j = 0;
        for (uint i = start; i <= end; i++) {
            _purchases[j] = purchases[i];
            j++;
        }
        return _purchases;
    }

    function getBuyerPurchases(address buyer, uint start, uint end) public view returns (Purchase[] memory) {
        require(start <= end, "Invalid range");

        uint length = end - start + 1;
        Purchase[] memory _purchases = new Purchase[](length);
        uint j = 0;
        for (uint i = start; i <= end; i++) {
            if (purchases[i].buyer == buyer) {
                _purchases[j] = purchases[i];
                j++;
            }
        }
        return _purchases;
    }

    function getSellerPurchases(address seller, uint start, uint end) public view returns (Purchase[] memory) {
        require(start <= end, "Invalid range");

        uint length = end - start + 1;
        Purchase[] memory _purchases = new Purchase[](length);
        uint j = 0;
        for (uint i = start; i <= end; i++) {
            if (purchases[i].seller == seller) {
                _purchases[j] = purchases[i];
                j++;
            }
        }
        return _purchases;
    }

    // Function to purchase a product
 function purchaseProduct(uint256 _totalAmount, address _seller) public {

       ECedi(ECEDI_ADDRESS).transferFrom(msg.sender, address(this), _totalAmount); 

        numPurchases++;

        purchases[numPurchases] = Purchase(numPurchases, msg.sender, _seller, _totalAmount, false, false);
        
        // Emit a purchase event
        emit Sale(msg.sender, numPurchases ,_totalAmount);
    }

    // Function to issue a refund
function release(uint256 _purchaseId) external onlyBuyer(_purchaseId){ 
        require(!purchases[_purchaseId].isReleased, "Funds are already released");
        ECedi(ECEDI_ADDRESS).transfer(purchases[_purchaseId].seller, purchases[_purchaseId].amount);
        purchases[_purchaseId].isReleased = true;
        emit Release(msg.sender, _purchaseId, purchases[_purchaseId].amount);
    }

    function releaseFor(uint256 _purchaseId) external onlyOwner{ 
        require(!purchases[_purchaseId].isReleased, "Funds are already released");
        ECedi(ECEDI_ADDRESS).transfer(purchases[_purchaseId].seller, purchases[_purchaseId].amount);
        purchases[_purchaseId].isReleased = true;
        emit Release(msg.sender, _purchaseId, purchases[_purchaseId].amount);
    }

    function refund(uint256 _purchaseId) external onlyOwner{ 
        require(!purchases[_purchaseId].isReleased, "Funds are already released");
        ECedi(ECEDI_ADDRESS).transfer(purchases[_purchaseId].buyer, purchases[_purchaseId].amount);
        emit Refund(msg.sender,  purchases[_purchaseId].seller,  _purchaseId, purchases[_purchaseId].amount);
        delete purchases[_purchaseId];
    }

    function markShipped(uint256 _purchaseId) external onlySeller(_purchaseId){ 
        require(!purchases[_purchaseId].isShipped, "Already shipped");
        purchases[_purchaseId].isShipped = true;
        emit Shipped(msg.sender, _purchaseId, purchases[_purchaseId].amount);
    }

}