require("@nomicfoundation/hardhat-toolbox");
require('@dotenvx/dotenvx').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      chainId: 11155111,
      url: "https://eth-sepolia.g.alchemy.com/v2/9PFG-wkAzRM9ATYvxe8g1tb2-tJz67Yq",
      accounts: ["0x8bc77c4f96001d3077addb8c478772146618281f58e39c19e165fa75d793563d"],
    },
    local: {
      url: "http://127.0.01:8545",
    },
  },
  solidity: "0.8.24",
};
