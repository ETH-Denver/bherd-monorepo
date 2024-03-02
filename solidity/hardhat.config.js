require("@nomicfoundation/hardhat-toolbox");
require('@dotenvx/dotenvx').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      chainId: 11155111,
      url: "https://eth-sepolia.g.alchemy.com/v2/9PFG-wkAzRM9ATYvxe8g1tb2-tJz67Yq",
      accounts: [process.env.PRIVATE_KEY],
    },
    local: {
      url: "http://127.0.01:8545",
    },
  },
  solidity: "0.8.24",
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    goerli: {
      chainId: 5,
      url: "https://eth-goerli.g.alchemy.com/v2/CJ0p2QdZRojuoMvpsiQmMKiRojJXSGvP",
      accounts: [process.env.PRIVATE_KEY],
    },
    local: {
      url: "http://127.0.01:8545",
    },
  },
  solidity: "0.8.24",
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    baseSepolia: {
      chainId: 84532,
      url: "https://sepolia.base.org",
      accounts: [process.env.PRIVATE_KEY],
    },
    local: {
      url: "http://127.0.01:8545",
    },
  },
  solidity: "0.8.24",
};
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    lineaTestnet: {
      chainId: 59140,
      url: "https://rpc.goerli.linea.build",
      accounts: [process.env.PRIVATE_KEY],
    },
    local: {
      url: "http://127.0.01:8545",
    },
  },
  solidity: "0.8.24",
};
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    xdcTestnet: {
      chainId: 51,
      url: "https://erpc.xinfin.network",
      accounts: [process.env.PRIVATE_KEY],
    },
    local: {
      url: "http://127.0.01:8545",
    },
  },
  solidity: "0.8.24",
};