// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IContract {
    function attempt() external;
}

contract Middleware {
    function attempt(address contractAddress) external {
        IContract(contractAddress).attempt();
    }
}