var FixedSupplyERC20 = artifacts.require("./FixedSupplyERC20.sol");

module.exports = function(deployer) {
  deployer.deploy(FixedSupplyERC20);
};
