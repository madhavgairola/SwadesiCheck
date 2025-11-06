// script.js

// Fetch and render company data
fetch("companies.json")
  .then((response) => {
    if (!response.ok) throw new Error("Failed to load JSON");
    return response.json();
  })
  .then((data) => {
    renderTable(data);
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

// Function to render table rows
function renderTable(companies) {
  const tbody = document.querySelector("table tbody");

  companies.forEach((company) => {
    const row = document.createElement("tr");
    const percent = parseFloat(company.foreign_ownership);
    row.classList.add(getColorClass(percent));

    row.innerHTML = `
      <td>${company.name}</td>
      <td>${company.owner}</td>
      <td>${company.foreign_ownership}%</td>
      <td>${company.valuation}</td>
      <td><a href="${company.source}" target="_blank">Source</a></td>
    `;

    tbody.appendChild(row);
  });
}

// Color logic based on ownership %
function getColorClass(percent) {
  if (percent <= 20) return "dark-green";
  if (percent <= 40) return "light-green";
  if (percent <= 60) return "yellow";
  if (percent <= 80) return "light-red";
  return "dark-red";
}
