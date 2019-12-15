pragma solidity ^0.5.0;

contract Commission {

    address public user;

  function commit(uint recorderLevel) public returns (uint) {
    require(recorderLevel == 1);
    user = msg.sender;
    return recorderLevel;
  }

  function getUser() public view returns (address) {
      return user;
  }
}
