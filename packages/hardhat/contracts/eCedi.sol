// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract ECedi is ERC20, Ownable, ERC20Permit {
    constructor() ERC20("eCedi", "ECD") ERC20Permit("MyToken") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mintTo(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    function mint() public onlyOwner {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}