import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const NGOFund = await hre.ethers.getContractFactory("NGOFund");
  const ngoFund = await NGOFund.deploy();

  await ngoFund.waitForDeployment();

  const address = await ngoFund.getAddress();
  console.log("NGOFund deployed to:", address);

  // Save the contract address to frontend
  const addressFilePath = path.join(__dirname, "../../frontend/src/utils/contractAddress.js");
  fs.mkdirSync(path.dirname(addressFilePath), { recursive: true });
  fs.writeFileSync(addressFilePath, `export const CONTRACT_ADDRESS = "${address}";\n`);
  console.log("Contract address saved to frontend utils.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
