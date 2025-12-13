async function analyze() {
  const wallets = document
    .getElementById("wallets")
    .value.split("\n")
    .map(w => w.trim())
    .filter(Boolean);

  const result = await post("/analyze", { wallets });

  const tbody = document.querySelector("#analysisTable tbody");
  tbody.innerHTML = "";

  result.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.wallet}</td>
      <td>${r.sybil_score.toFixed(2)}</td>
      <td>${r.bucket}</td>
      <td>${r.explanation}</td>
    `;
    tbody.appendChild(row);
  });
}

async function runAirdrop() {
  const result = await get("/airdrop");

  const tbody = document.querySelector("#airdropTable tbody");
  tbody.innerHTML = "";

  result.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.wallet}</td>
      <td>${r.tokens}</td>
    `;
    tbody.appendChild(row);
  });
}
