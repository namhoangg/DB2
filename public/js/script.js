// Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert
//Enable InPatient Form when InPatient is selected
const PtypeCode = document.querySelector("#PtypeCode");
if (PtypeCode) {
  console.log(PtypeCode.value);
  if (PtypeCode.value == "IP") {
    const IPForm = document.querySelectorAll(".IP-form");
    if (IPForm) {
      //add disabled to all input,//IPForm is array of input
      IPForm.forEach((input) => {
        input.disabled = false;
      });
    }
  }
  PtypeCode.addEventListener("change", () => {
    if (PtypeCode.value == "OP") {
      const IPForm = document.querySelectorAll(".IP-form");
      if (IPForm) {
        //add disabled to all input,//IPForm is array of input
        IPForm.forEach((input) => {
          input.value = "";
          input.disabled = true;
        });
      }
    } else {
      const IPForm = document.querySelectorAll(".IP-form");
      if (IPForm) {
        //add disabled to all input,//IPForm is array of input
        IPForm.forEach((input) => {
          input.disabled = false;
        });
      }
    }
  });
}
//End Enable InPatient Form when InPatient is selected
//Submit Form
const submitForm = document.querySelector("[register-submit]");
if (submitForm) {
  submitForm.addEventListener("click", () => {
    const form = document.querySelector("[register-form]");
    if (form) {
      form.submit();
    }
  });
}
//End Submit Form
//For patient page
const tableLengthSelect = document.querySelector("#table-length-select");
if (tableLengthSelect) {
  tableLengthSelect.addEventListener("change", () => {
    let url = new URL(window.location.href);
    url.searchParams.set("limit", tableLengthSelect.value);
    window.location.href = url.href;
  });
}
const buttonPrev = document.querySelector("#table-pagination-prev");
if (buttonPrev) {
  buttonPrev.addEventListener("click", () => {
    let url = new URL(window.location.href);
    const page = parseInt(buttonPrev.getAttribute("data-page"));
    if (page == 1) {
      return;
    }
    url.searchParams.set("page", page - 1);
    window.location.href = url.href;
  });
}
const buttonNext = document.querySelector("#table-pagination-next");
if (buttonNext) {
  buttonNext.addEventListener("click", () => {
    let url = new URL(window.location.href);
    const page = parseInt(buttonNext.getAttribute("data-page"));
    const totalPage = parseInt(buttonNext.getAttribute("data-total-page"));
    if (page == totalPage) {
      return;
    }
    url.searchParams.set("page", page + 1);
    window.location.href = url.href;
  });
}
const pagePagination = document.querySelector(".page-pagination");
if (pagePagination) {
  pagePagination.addEventListener("change", () => {
    let url = new URL(window.location.href);
    url.searchParams.set("page", pagePagination.value);
    window.location.href = url.href;
  });
}
const tableSearchInput = document.querySelector("#table-search-input");
const tableSearchSelect = document.querySelector("#table-search-select");
const tableSearchButton = document.querySelector("#table-search-button");
if (tableSearchInput && tableSearchSelect && tableSearchButton) {
  tableSearchButton.addEventListener("click", () => {
    let url = new URL(window.location.href);
    url.searchParams.set("keyword", tableSearchInput.value);
    url.searchParams.set("type", tableSearchSelect.value);
    window.location.href = url.href;
  });
}
if (tableSearchInput) {
  if (window.location.href.includes("keyword")) {
    tableSearchInput.value = new URL(window.location.href).searchParams.get(
      "keyword"
    );
  }
}
if (tableSearchSelect) {
  if (window.location.href.includes("type")) {
    tableSearchSelect.value = new URL(window.location.href).searchParams.get(
      "type"
    );
  }
}
const patientRow = document.querySelectorAll("[patient-row]");
if (patientRow) {
  patientRow.forEach((row) => {
    row.addEventListener("click", () => {
      const id = row.getAttribute("data-id");
      window.location.href = `/manage/patient/detail/${id}`;
    });
  });
}
//End For patient page
//doctor
const doctorRow = document.querySelectorAll("[doctor-row]");
if (doctorRow) {
  doctorRow.forEach((row) => {
    row.addEventListener("click", () => {
      const id = row.getAttribute("data-id");
      window.location.href = `/manage/doctor/detail/${id}`;
    });
  });
}
//end doctor
