// =========================
// Analyze Wallets
// =========================
async function analyze() {
  const wallets = document
    .getElementById("wallets")
    .value.split("\n")
    .map(w => w.trim())
    .filter(Boolean);

  console.log("Analyzing wallets:", wallets);

  if (wallets.length === 0) {
    alert("Please enter at least one wallet.");
    return;
  }

  const result = await post("/analyze", { wallets });
  console.log("Analyze result:", result);

  // 🔑 Backend returns { mode, wallets_analyzed, results: [...] }
  const data = result.results;

  if (!Array.isArray(data)) {
    console.error("Analyze data is not an array:", result);
    alert("Unexpected analyze response. Check console.");
    return;
  }

  const tbody = document.querySelector("#analysisTable tbody");
  tbody.innerHTML = "";

  data.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.wallet}</td>
      <td>${r.sybil_score}</td>
      <td>${r.bucket}</td>
      <td>${r.explanation}</td>
    `;
    tbody.appendChild(row);
  });
}

// =========================
// Run Airdrop
// =========================
async function runAirdrop() {
  console.log("Calling /airdrop");

  const result = await get("/airdrop");
  console.log("Raw airdrop result:", result);

  // 🔑 Backend returns { mode, results: [...] }
  const data = result.results;

  if (!Array.isArray(data)) {
    console.error("Airdrop data is not an array:", result);
    alert("Unexpected airdrop response. Check console.");
    return;
  }

  const tbody = document.querySelector("#airdropTable tbody");
  tbody.innerHTML = "";

  data.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.wallet}</td>
      <td>${r.bucket}</td>
      <td>${r.tokens}</td>
    `;
    tbody.appendChild(row);
  });
}
