require("@nomicfoundation/hardhat-toolbox");
require('@dotenvx/dotenvx').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      chainId: 11155111,
      url: "https://sepolia.infura.io/v3/20618f70c06b447eaeb1ade6819c1ceb",
      accounts: [process.env.PRIVATE_KEY],
    },
    local: {
      url: "http://127.0.01:8545",
    },
  },
  solidity: "0.8.24",
};
