
const contractAddress = "0x8cede102e2ce12aed631f51fcec30db6d4ad93f2";
let web3, contract, currentAccount;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    currentAccount = accounts[0];
    contract = new web3.eth.Contract(stakingAbi, contractAddress);
    document.getElementById("wallet").textContent = currentAccount;
    updateUI();
  } else {
    alert("MetaMask not detected!");
  }
}

async function updateUI() {
  const stakeInfo = await contract.methods.stakes(currentAccount).call();
  const reward = await contract.methods.calculateReward(currentAccount).call();
  document.getElementById("staked").textContent = stakeInfo.amount;
  document.getElementById("earned").textContent = web3.utils.fromWei(reward, "ether") + " LYDIA";
}

async function stake() {
  const amount = document.getElementById("amount").value;
  if (amount > 0) {
    const value = web3.utils.toWei(amount, "ether");
    await contract.methods.stake(value).send({ from: currentAccount });
    updateUI();
  }
}

async function claimRewards() {
  await contract.methods.claimReward().send({ from: currentAccount });
  updateUI();
}

async function withdraw() {
  await contract.methods.withdraw().send({ from: currentAccount });
  updateUI();
}
