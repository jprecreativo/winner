const { ethers } = require("hardhat"); // Import ethers from Hardhat
require('dotenv').config();

async function main() {
  // Hardhat automatically gets the signer and network configuration from your hardhat.config.js and the --network flag.
  // The first account in your `accounts` array in the config is used by default.
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with the account:", deployer.address);

  // Get the ContractFactory and deploy
  const Contract = await ethers.getContractFactory("Contract");
  const contract = await Contract.deploy();

  await contract.waitForDeployment();

  // In ethers v6, the address is a getter property
  console.log("Contract deployed to:", contract.target);

  // await contract.attempt();

  const Middleware = await ethers.getContractFactory("Middleware");
  const middleware = await Middleware.deploy();

  await middleware.waitForDeployment();

  console.log("Middleware deployed to:", middleware.target);

  await middleware.attempt(contract.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });