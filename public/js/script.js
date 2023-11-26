// import Swal from 'sweetalert2'
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
const printTreatmentReport = document.querySelectorAll(
  "[print-treatment-report]"
);
if (printTreatmentReport) {
  printTreatmentReport.forEach((button) => {
    button.addEventListener("click", () => {
      const treatmentReport = document.querySelector(".treatment-report");
      treatmentReport.style.display = "block";
      const printBackground = document.querySelector(".print-background");
      printBackground.style.display = "block";
      const header = document.querySelector("header");
      header.style.display = "none";
      const sider = document.querySelector(".sider");
      sider.style.display = "none";
      const mainLayout = document.querySelector(".main-layout2");
      mainLayout.style.display = "none";
      const printLayout = document.querySelector(".print-layout");
      printLayout.style.display = "block";

      const treatmentstartdate = document.querySelector("[treatmentstartdate]");
      const admissiondate = document.querySelector("[admissiondate]");
      const doctor = document.querySelector("[doctor]");
      const inresult = document.querySelector("[inresult]");
      const dateofdischarge = document.querySelector("[dateofdischarge]");
      const treatenddate = document.querySelector("[treatenddate]");
      const data = button.getAttribute("data-id");
      const dataArr = data.split(",");
      treatmentstartdate.innerHTML = dataArr[0];
      admissiondate.innerHTML = dataArr[1];
      doctor.innerHTML = dataArr[2];
      inresult.innerHTML = dataArr[3];
      dateofdischarge.innerHTML = dataArr[4];
      treatenddate.innerHTML = dataArr[5];
    });
  });
}
const printExaminationReport = document.querySelectorAll(
  "[print-examination-report]"
);
if (printExaminationReport) {
  printExaminationReport.forEach((button) => {
    button.addEventListener("click", () => {
      const examinationReport = document.querySelector(".examination-report");
      examinationReport.style.display = "block";
      const printBackground = document.querySelector(".print-background");
      printBackground.style.display = "block";
      const header = document.querySelector("header");
      header.style.display = "none";
      const sider = document.querySelector(".sider");
      sider.style.display = "none";
      const mainLayout = document.querySelector(".main-layout2");
      mainLayout.style.display = "none";
      const printLayout = document.querySelector(".print-layout");
      printLayout.style.display = "block";

      const examinationdate = document.querySelector("[examinationdate]");
      const doctor = document.querySelector("[doctor2]");
      const outdiagnosis = document.querySelector("[outdiagnosis]");
      const exmNextDate = document.querySelector("[exmNextDate]");
      const exmFee = document.querySelector("[exmFee]");
      const data = button.getAttribute("data-id");
      const dataArr = data.split(",");
      examinationdate.innerHTML = dataArr[0];
      doctor.innerHTML = dataArr[1];
      outdiagnosis.innerHTML = dataArr[2];
      exmNextDate.innerHTML = dataArr[3];
      exmFee.innerHTML = dataArr[4];
    });
  });
}
const printButton = document.querySelector(".print-button");
if (printButton) {
  printButton.addEventListener("click", () => {
    printButton.style.display = "none";
    window.print();
  });
}
const printButton2 = document.querySelector(".print-button2");
if (printButton2) {
  printButton2.addEventListener("click", () => {
    printButton2.style.display = "none";
    window.print();
  });
}
const patientEdit= document.querySelector("[patient-edit]");
if(patientEdit){
  patientEdit.addEventListener("click",()=>{
    window.location.href=`/manage/patient/edit/${patientEdit.getAttribute("data-id")}`
  })
}
function formatDate(inputDate) {
  const [day, month, year] = inputDate.split('/').map(part => parseInt(part, 10));

  // Create a new Date object with the given components
  const formattedDate = new Date(year, month - 1, day);
  
  // Get the individual components (year, month, day) in yyyy-mm-dd format
  // const formattedDateString = formattedDate.toISOString().split('T')[0];
  return formattedDate;
  // return formattedDateString;
}


const dob= document.querySelector("[dob]");
if(dob){
  const date= dob.getAttribute("data-value");
  const formattedDate=formatDate(date);
  // console.log(formattedDate);
  dob.value=formattedDate;
}