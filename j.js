
document.querySelectorAll('.menu li').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.menu li.active').classList.remove('active');
        item.classList.add('active');
    });
});
const companySelect = document.getElementById("companySelect");
const accountSelect = document.getElementById("accountSelect");
const loadsTableBody = document.getElementById("loadsTableBody");
const balanceAmount = document.getElementById("balanceAmount");
const totalCredit = document.getElementById("totalCredit");

// Data for companies and accounts
const data = {
  A: {
    1: {
      balance: "₹ 3,45,500",
      loads: [
        ["07/05/2024 01:04 PM", "₹ 21,337", "₹ 3,45,500", "UTR100001", "AC0CF7RRUY407QHU"],
        ["04/05/2024 12:38 PM", "₹ 18,000", "₹ 3,24,163", "CMS1456374", "ACT861VM9RR6725C"],
        ["02/05/2024 03:50 PM", "₹ 12,500", "₹ 3,06,163", "CMS987654", "ACT859LM9RR6225K"],
        ["29/04/2024 10:10 AM", "₹ 5,000", "₹ 2,93,663", "CMS876543", "AC0CF7RRUY407QHU"],
        ["25/04/2024 05:22 PM", "₹ 9,200", "₹ 2,88,663", "UTR12345", "ACT861VM9RR6725C"]
      ]
    },
    2: {
      balance: "₹ 1,87,000",
      loads: [
        ["15/04/2024 10:00 AM", "₹ 10,000", "₹ 1,87,000", "UTR98765", "AC0CF7RRUY407QHU"],
        ["12/04/2024 02:30 PM", "₹ 12,500", "₹ 1,77,000", "CMS246810", "ACT861VM9RR6725C"],
        ["10/04/2024 09:00 AM", "₹ 15,500", "₹ 1,64,500", "CMS951753", "AC0CF7RRUY407QHU"],
        ["08/04/2024 06:15 PM", "₹ 9,000", "₹ 1,49,000", "CMS852369", "ACT861VM9RR6725C"]
      ]
    }
  },
  B: {
    1: {
      balance: "₹ 2,15,000",
      loads: [
        ["01/06/2024 09:45 AM", "₹ 15,000", "₹ 2,15,000", "UTR11111", "AC0CF7RRUY407QHU"],
        ["29/05/2024 05:12 PM", "₹ 7,500", "₹ 2,00,000", "CMS987321", "ACT861VM9RR6725C"],
        ["25/05/2024 11:33 AM", "₹ 8,000", "₹ 1,92,500", "CMS147258", "AC0CF7RRUY407QHU"],
        ["20/05/2024 04:21 PM", "₹ 9,000", "₹ 1,84,500", "UTR951236", "ACT861VM9RR6725C"]
      ]
    },
    2: {
      balance: "₹ 4,50,000",
      loads: [
        ["15/04/2024 08:15 PM", "₹ 25,000", "₹ 4,50,000", "UTR65432", "AC0CF7RRUY407QHU"],
        ["12/04/2024 10:22 AM", "₹ 30,000", "₹ 4,25,000", "CMS555888", "ACT861VM9RR6725C"],
        ["10/04/2024 03:45 PM", "₹ 20,000", "₹ 3,95,000", "CMS669933", "AC0CF7RRUY407QHU"]
      ]
    }
  },
  C: {
    1: {
      balance: "₹ 6,25,000",
      loads: [
        ["01/07/2024 09:10 AM", "₹ 45,000", "₹ 6,25,000", "UTR665544", "AC0CF7RRUY407QHU"],
        ["29/06/2024 11:40 AM", "₹ 30,000", "₹ 5,80,000", "CMS321456", "ACT861VM9RR6725C"],
        ["25/06/2024 04:10 PM", "₹ 20,000", "₹ 5,50,000", "UTR998877", "AC0CF7RRUY407QHU"]
      ]
    },
    2: {
      balance: "₹ 1,05,000",
      loads: [
        ["10/06/2024 10:15 AM", "₹ 20,000", "₹ 1,05,000", "UTR445566", "AC0CF7RRUY407QHU"],
        ["08/06/2024 05:22 PM", "₹ 10,000", "₹ 85,000", "CMS774411", "ACT861VM9RR6725C"],
        ["06/06/2024 03:00 PM", "₹ 8,000", "₹ 75,000", "UTR665544", "AC0CF7RRUY407QHU"]
      ]
    }
  }
};

// Update UI when selections change
function updateTable() {
  const company = companySelect.value;
  const account = accountSelect.value;

  if (company && account && data[company] && data[company][account]) {
    const selectedData = data[company][account];
    balanceAmount.textContent = selectedData.balance;

    loadsTableBody.innerHTML = selectedData.loads
      .map(
        (load) => `
      <tr>
        <td>${load[0]}</td>
        <td class="green">${load[1]}</td>
        <td>${load[2]}</td>
        <td>${load[3]}</td>
        <td>${load[4]}</td>
      </tr>`
      )
      .join("");

    // ✅ Calculate total credit
    const total = selectedData.loads.reduce((sum, load) => {
      const amount = parseFloat(load[1].replace(/[₹,\s]/g, ""));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    totalCredit.textContent = `Total Credit: ₹ ${total.toLocaleString("en-IN")}`;
  } else {
    balanceAmount.textContent = "₹ 0";
    loadsTableBody.innerHTML = `<tr><td colspan="5">No data available</td></tr>`;
    totalCredit.textContent = "Total Credit: ₹ 0";
  }
}

companySelect.addEventListener("change", updateTable);
accountSelect.addEventListener("change", updateTable);
