pragma solidity ^0.4.18;

import 'zeppelin/contracts/token/ERC721/ERC721Token.sol';

contract TravelTicket is ERC721Token {

  mapping (address => string) public addressValue;

  function TravelTicket() public {

  }

}
