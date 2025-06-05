
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById('wallet').innerText = accounts[0];
    } catch (error) {
      alert('Wallet connection failed.');
    }
  }
}
function stake() { alert('Stake called'); }
function claimReward() { alert('Claim reward called'); }
function withdraw() { alert('Withdraw called'); }
