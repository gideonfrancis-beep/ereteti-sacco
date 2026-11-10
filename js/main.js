// Ereteti Dairy Sacco — Lab 3 (Week 8/9 notes, Part A Blocks 0–2, Steps 3–5)
// Block 0: this file is loaded with defer on every page, after the stylesheet.

// Block 1 — litres, checked as typed
const litres = document.querySelector("#litres");
const litresMessage = document.querySelector("#litres-message");

function checkLitres() {
  const amount = Number(litres.value);
  if (litres.value === "") {
    litresMessage.textContent = "";
    litres.classList.remove("invalid");
    return false;
  }
  if (amount <= 0) {
    litresMessage.textContent = "Litres must be more than 0.";
    litres.classList.add("invalid");
    return false;
  }
  if (amount > 60) {
    litresMessage.textContent = "Over 60 litres in one session. Check the reading.";
    litres.classList.add("invalid");
    return false;
  }
  litresMessage.textContent = "";
  litres.classList.remove("invalid");
  return true;
}

if (litres) {
  litres.addEventListener("input", checkLitres);
}

// Block 2 — member number, checked on blur
const member = document.querySelector("#member");
const memberMessage = document.querySelector("#member-message");
const memberPattern = /^ER-[0-9]{4}$/;

function checkMember() {
  const typed = member.value.trim().toUpperCase();
  member.value = typed;
  if (memberPattern.test(typed)) {
    memberMessage.textContent = "";
    member.classList.remove("invalid");
    return true;
  }
  memberMessage.textContent = "A member number looks like ER-0001.";
  member.classList.add("invalid");
  return false;
}

if (member) {
  member.addEventListener("blur", checkMember);
}

// Step 3 — the delivery form, stopped before it is sent
const deliveryForm = document.querySelector("#delivery-form");
const formMessage = document.querySelector("#form-message");

if (deliveryForm) {
  deliveryForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formMessage.textContent = "";
    const memberOk = checkMember();
    const litresOk = checkLitres();
    if (!memberOk) {
      member.focus();
    } else if (!litresOk) {
      litres.focus();
    } else {
      formMessage.textContent = "Checked: " + member.value + ", " + litres.value + " litres. Nothing is sent yet: that needs a server.";
    }
  });
}

// Step 4 — the routes, filtered as you type
const routeSearch = document.querySelector("#route-search");
const routeCount = document.querySelector("#route-count");
const routeSections = document.querySelectorAll("main section");

if (routeSearch) {
  routeSearch.addEventListener("input", function () {
    const typed = routeSearch.value.trim().toLowerCase();
    let shown = 0;
    for (const section of routeSections) {
      const match = section.textContent.toLowerCase().includes(typed);
      section.hidden = !match;
      if (match) {
        shown++;
      }
    }
    routeCount.textContent = shown + " of " + routeSections.length + " routes";
  });
}

// Step 5 — the accepted total, added up by a loop
const totalCell = document.querySelector("#accepted-total");
if (totalCell) {
  let total = 0;
  const rows = document.querySelectorAll("tbody tr");
  for (const row of rows) {
    const cells = row.querySelectorAll("td");
    const litresText = cells[3].textContent;
    const accepted = cells[4].textContent.trim();
    if (accepted === "Yes") {
      total += Number(litresText);
    }
  }
  totalCell.textContent = total.toFixed(2);
}
