pragma solidity ^0.5.0;

import "truffle/Assert.sol";   // ����Ķ���
import "truffle/DeployedAddresses.sol";  // ������ȡ�����Ժ�Լ�ĵ�ַ
import "../contracts/Commission.sol";      // �����Ժ�Լ

contract TestCommission {
    Commission commission = Commission(DeployedAddresses.Commission());

    // test "commit" method
    function testCommit() public {
        uint returnedLevel = commission.commit(1);
        uint expected = 1;
        Assert.equal(returnedLevel, expected, "Commission user level should be recorded.");
    }

    // test "getUser" method
    function testGetUser() public {
        address expected = address(this);
        address actual = commission.getUser();
        Assert.equal(actual, expected, "Commission user address should be recorded.");
    }
}
