const db = require("../configs/database");
const filterSearchHelper = require("../helpers/filter");
const paginateHelper = require("../helpers/pagination");
const getDateHelper = require("../helpers/getDate");
//[GET] /
module.exports.index = (req, res) => {
  res.render("pages/manage/index", {
    title: "Manage",
    info: [],
    errors: [],
  });
};
//[POST] /register
module.exports.register = async (req, res) => {
  const { PFname, PLname, PDoB, PGender, PAddress, PPhone, PTypeCode } =
    req.body;
  const sql = "SELECT * from patient";
  const totalPatient = await db.getRowCount(sql);
  const currentId = totalPatient + 1;
  const PCode = currentId.toString().padStart(9, "0");
  const sqlInsertPatient =
    "INSERT INTO patient(PCode,PFname,PLname,PDoB,PGender,PAddress,PPhone,PTypeCode) VALUES(?,?,?,?,?,?,?,?);";
  const data = [
    PCode,
    PFname,
    PLname,
    PDoB,
    PGender,
    PAddress,
    PPhone,
    PTypeCode,
  ];
  const result = await db.querySql(sqlInsertPatient, data);
  if (result.affectedRows === 1) {
    req.flash("success", "Register successfully");
    res.redirect("/manage");
  } else {
    req.flash("error", "Something went wrong");
    res.redirect("/manage");
  }
};
//[GET] /patient
module.exports.patient = async (req, res) => {
  const filter = filterSearchHelper.filterSearch(req.query);

  const sql = `SELECT * FROM patient ${filter}`;
  const totalPatient = await db.getRowCount(sql);
  const paginateObject = {
    page: 1,
    limit: 10,
    offset: 0,
    totalRow: totalPatient,
  };
  const paginate = paginateHelper.paginate(req.query, paginateObject);
  // { page: 1, limit: 10, offset: 0, totalPatient: 12, totalPage: 2 }
  const sqlPatient = `SELECT * FROM patient ${filter} LIMIT ${paginate.limit} OFFSET ${paginate.offset}`;
  patientList = await db.querySql(sqlPatient);
  //convert date to UTC GMT+7
  patientList.forEach((patient) => {
    const date = new Date(patient.PDoB);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    patient.PDoB = `${day}/${month}/${year}`;
  });
  res.render("pages/manage/patient", {
    title: "patient",
    patientList: patientList,
    paginate: paginate,
  });
};
//[GET] /patient/detail/:id
module.exports.patientDetail = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM patient WHERE PCode=?`;
  const data = [id];
  const patientDetail = await db.queryOne(sql, data);
  patientDetail.PDoB = getDateHelper.getDate(patientDetail.PDoB);
  const sqlTreatment = `SELECT * FROM treatmentreport WHERE PCode=?`;
  const treatmentList = await db.querySql(sqlTreatment, data);
  //   [
  //   {
  //     TreatmentStartDate: 2022-05-16T00:30:00.000Z,
  //     PCode: '000000001',
  //     INPCode: 'IP000000001',
  //     AdmissionDate: 2022-05-09T17:00:00.000Z,
  //     DrCode: 'Dr000001',
  //     InResult: 'recovered',
  //     DateOfDischarge: 2022-05-19T17:00:00.000Z,
  //     TreatEndDate: 2022-06-04T17:00:00.000Z
  //   }
  // ]
  for (const treatment of treatmentList) {
    treatment.TreatmentStartDate = getDateHelper.getDate(
      treatment.TreatmentStartDate
    );
    treatment.AdmissionDate = getDateHelper.getDate(treatment.AdmissionDate);
    treatment.DateOfDischarge = getDateHelper.getDate(
      treatment.DateOfDischarge
    );
    treatment.TreatEndDate = getDateHelper.getDate(treatment.TreatEndDate);
    treatment.doctor = await db.queryOne(
      `SELECT EFName,ELName FROM doctor WHERE ECode=?`,
      [treatment.DrCode]
    );
    treatment.doctorName = `${treatment.doctor.EFName} ${treatment.doctor.ELName}`;
  }
  const sqlExamination = `SELECT * FROM examinationreport WHERE PCode=?`;
  const examinationList = await db.querySql(sqlExamination, data);
  //   [
  //   {
  //     ExaminationDate: 2022-05-10T00:30:00.000Z,
  //     PCode: '000000001',
  //     OUTPCode: 'OP000000001',
  //     DrCode: 'Dr000001',
  //     OutDiagnosis: 'Routine checkup',
  //     ExmNextDate: 2022-06-09T17:00:00.000Z,
  //     ExmFee: 50
  //   }
  // ]
  for (const exam of examinationList) {
    exam.ExaminationDate = getDateHelper.getDate(exam.ExaminationDate);
    exam.ExmNextDate = getDateHelper.getDate(exam.ExmNextDate);
    exam.doctor = await db.queryOne(
      `SELECT EFName,ELName FROM doctor WHERE ECode=?`,
      [exam.DrCode]
    );
    exam.doctorName = `${exam.doctor.EFName} ${exam.doctor.ELName}`;
  }
  res.render("pages/manage/patient-detail", {
    title: "Patient Detail",
    patient: patientDetail,
    treatmentList: treatmentList,
    examinationList: examinationList,
  });
};
//[GET] /doctor
module.exports.doctor = async (req, res) => {
  const filter = filterSearchHelper.filterSearch(req.query);

  const sql = `SELECT * FROM doctor ${filter}`;
  const totalDoctor = await db.getRowCount(sql);
  const paginateObject = {
    page: 1,
    limit: 10,
    offset: 0,
    totalRow: totalDoctor,
  };
  const paginate = paginateHelper.paginate(req.query, paginateObject);
  // { page: 1, limit: 10, offset: 0, totalPatient: 12, totalPage: 2 }
  const sqlDoctor = `SELECT * FROM doctor ${filter} LIMIT ${paginate.limit} OFFSET ${paginate.offset}`;
  const doctorList = await db.querySql(sqlDoctor);
  for (doctor of doctorList) {
    doctor.EDoBirth = getDateHelper.getDate(doctor.EDoBirth);
    doctor.EStartDate = getDateHelper.getDate(doctor.EStartDate);
    doctor.EDegreeDate = getDateHelper.getDate(doctor.EDegreeDate);
  }
  //convert date to UTC GMT+7
  res.render("pages/manage/doctor", {
    title: "doctor",
    paginate: paginate,
    doctorList: doctorList,
  });
};
//[GET] /doctor/detail/:id
module.exports.doctorDetail = async (req, res) => {
  const id = req.params.id;
  const sqlDoctor = `SELECT * FROM doctor WHERE ECode=?`;
  const data = [id];
  const doctorDetail = await db.queryOne(sqlDoctor, data);
  doctorDetail.EDoBirth = getDateHelper.getDate(doctorDetail.EDoBirth);
  doctorDetail.EStartDate = getDateHelper.getDate(doctorDetail.EStartDate);
  doctorDetail.EDegreeDate = getDateHelper.getDate(doctorDetail.EDegreeDate);
  //Table of patient treat by doctor
  let filter = filterSearchHelper.filterSearch(req.query);
  if (filter) {
    filter += ` AND DrCode='${id}'`;
  } else {
    filter += ` WHERE DrCode='${id}'`;
  }
  const sqlPatient = `SELECT * FROM patient JOIN treatmentreport ON patient.PCode=treatmentreport.PCode ${filter}`;
  const totalPatient = await db.getRowCount(sqlPatient);
  const paginateObject = {
    page: 1,
    limit: 10,
    offset: 0,
    totalRow: totalPatient,
  };
  const paginate = paginateHelper.paginate(req.query, paginateObject);
  const sqlPatientList = `SELECT * FROM patient JOIN treatmentreport ON patient.PCode=treatmentreport.PCode ${filter} LIMIT ${paginate.limit} OFFSET ${paginate.offset}`;
  const patientList = await db.querySql(sqlPatientList);
  patientList.forEach((patient) => {
    patient.PDoB = getDateHelper.getDate(patient.PDoB);
    patient.TreatmentStartDate = getDateHelper.getDate(
      patient.TreatmentStartDate
    );
    patient.AdmissionDate = getDateHelper.getDate(patient.AdmissionDate);
    patient.DateOfDischarge = getDateHelper.getDate(patient.DateOfDischarge);
    patient.TreatEndDate = getDateHelper.getDate(patient.TreatEndDate);
  });
  res.render("pages/manage/doctor-detail", {
    title: "Doctor Detail",
    doctor: doctorDetail,
    patientList: patientList,
    paginate: paginate,
  });
};
