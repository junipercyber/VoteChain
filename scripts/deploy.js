const hre = require("hardhat");

async function main() {
  console.log("Deploying Voting contract...");

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  await voting.waitForDeployment();

  console.log("Voting contract deployed to:", await voting.getAddress());

  // Save the address for frontend use
  const fs = require('fs');
  const contractAddress = {
    voting: await voting.getAddress()
  };

  fs.writeFileSync(
    './src/contractAddress.json',
    JSON.stringify(contractAddress, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });