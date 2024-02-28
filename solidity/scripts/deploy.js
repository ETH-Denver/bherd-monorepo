// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.parseEther("0.001");

  const deployer = await hre.ethers.deployContract("Deployer");

  const address = await deployer.waitForDeployment();

<<<<<<< HEAD
  console.log('Deployer deployed at', address);
=======
  console.log('Deployer deployed', address);
>>>>>>> 5b71d1b01e973ee9d07062c7acb1e3fdb8113a64
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
