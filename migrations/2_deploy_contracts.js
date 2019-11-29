var Adoption = artifacts.require("Adoption");
var Commission = artifacts.require("Commission");

module.exports = function(deployer) {
  deployer.deploy(Adoption);
  deployer.deploy(Commission);
};