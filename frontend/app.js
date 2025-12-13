async function analyze() {
  const wallets = document
    .getElementById("wallets")
    .value.split("\n")
    .map(w => w.trim())
    .filter(Boolean);

  console.log("Analyzing wallets:", wallets);

  const result = await post("/analyze", { wallets });

  console.log("Analyze result:", result);

  const tbody = document.querySelector("#analysisTable tbody");
  tbody.innerHTML = "";

  result.forEach(r => {
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

async function runAirdrop() {
  console.log("Calling /airdrop");

  const result = await get("/airdrop");
  console.log("Raw airdrop result:", result);

  // 🔑 FIX 1: extract the actual array
  const data = result.results;

  if (!Array.isArray(data)) {
    console.error("Airdrop data is not an array:", data);
    return;
  }

  // 🔑 FIX 2: get tbody (you were missing this)
  const tbody = document.querySelector("#airdropTable tbody");
  tbody.innerHTML = "";

  data.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.wallet}</td>
      <td>${r.tokens}</td>
    `;
    tbody.appendChild(row);
  });
}
