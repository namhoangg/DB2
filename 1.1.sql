-- DROP DATABASE Testing;
-- CREATE SCHEMA Testing;
-- Departments
CREATE TABLE Department (
    DCode CHAR(4) PRIMARY KEY NOT NULL,
    DTitle VARCHAR(50) NOT NULL,
    DeanCode CHAR(8)
);

-- Employees
CREATE TABLE Doctor (
    ECode CHAR(8) PRIMARY KEY,
    EFName VARCHAR(30) NOT NULL, 
    ELName  VARCHAR(30) NOT NULL,
    EDoBirth DATE,
    EAddress VARCHAR(100) NOT NULL,
    EStartDate DATE NOT NULL,
    EDegreeDate DATE NOT NULL,
    Speciality VARCHAR(15) NOT NULL,
    DCode CHAR(4) NOT NULL,
    Foreign Key (DCode) References Department (DCode)
);

-- update the table Departments
ALTER TABLE Department
ADD CONSTRAINT Deancode_ECode
FOREIGN KEY (DeanCode) REFERENCES Doctor(ECode);

-- Nurses
CREATE TABLE Nurse (
    ECode CHAR(8) PRIMARY KEY,
    EFName VARCHAR(30) NOT NULL, 
    ELName VARCHAR(30) NOT NULL,
    EDoBirth DATE,
    EAddress VARCHAR(100) NOT NULL,
    EStartDate DATE NOT NULL,
    EDegreeDate DATE NOT NULL,
    Speciality VARCHAR(15),
    DCode CHAR(4) NOT NULL,
    FOREIGN KEY (DCode) REFERENCES department(DCode)
);

-- Patients
CREATE TABLE Patient (
    PCode Char(9)  PRIMARY KEY,
    PFName VARCHAR(30),
    PLName VARCHAR(30),
    PDoB DATE,
    PGender VARCHAR(20),
    PAddress VARCHAR(255),
    PPhone CHAR(15),
    PTypeCode CHAR(2)
);
-- Providers
CREATE TABLE Provider (
    PVCode CHAR(6) PRIMARY KEY NOT NULL,
    PVName VARCHAR(20),
    PVAddress VARCHAR(255),
    PVPhone CHAR(15)
);
-- Medication Packages
CREATE TABLE MedicationPackage (
    MCode CHAR(13) PRIMARY KEY NOT NULL,
    MExpDate DATE,
    MName VARCHAR(50),
    MPrice BIGINT UNSIGNED,
    MEffect VARCHAR(100),
    MStatus VARCHAR(10),
    MCurrentQuantity INT UNSIGNED
);

-- InPatients
CREATE TABLE InPatient (
    PCode Char(9) NOT NULL,
    INPCode Char(11),
    AdmissionDate DATE,
    Infee INT UNSIGNED,
    Sickroom CHAR(10),
    InDiagnosis VARCHAR(255),
    NurseCode VARCHAR(8),
    PRIMARY KEY (PCode, INPCode, AdmissionDate),
    FOREIGN KEY (NurseCode) REFERENCES Nurse(ECode),
    FOREIGN KEY (PCode) REFERENCES Patient (PCode)
);

-- OutPatients
CREATE TABLE OutPatient (
    PCode Char(9),
    OutPCode Char(11),
    PRIMARY KEY (PCode, OutPCode),
    FOREIGN KEY (PCode) REFERENCES Patient (PCode)
);

-- Treatment Reports
CREATE TABLE TreatmentReport (
    TreatmentStartDate DATETIME,
    PCode Char(9),
    INPCode Char(11),
    AdmissionDate DATE,
    DrCode CHAR(8),
    InResult VARCHAR(10),
    DateOfDischarge DATE,
    TreatEndDate DATE,
    PRIMARY KEY (TreatmentStartDate, PCode, INPCode, AdmissionDate, DrCode),
    -- FOREIGN KEY (PCode) REFERENCES InPatient (PCode),
    -- FOREIGN KEY (INPCode) REFERENCES InPatient (INPCode),
    -- FOREIGN KEY (AdmissionDate) REFERENCES InPatient(AdmissionDate),
    -- error Error Code: 1822. Failed to add the foreign key constraint. Missing index for constraint 'treatmentreport_ibfk_2' in the referenced table 'inpatient'
    FOREIGN KEY (PCode, INPCode, AdmissionDate) REFERENCES InPatient(PCode, INPCode, AdmissionDate),
    FOREIGN KEY (DrCode) REFERENCES Doctor(ECode)
);

-- Examination Reports
CREATE TABLE ExaminationReport (
    ExaminationDate DATETIME,
    PCode Char(9),
    OUTPCode Char(11),
    DrCode CHAR(8),
    OutDiagnosis VARCHAR(50),
    ExmNextDate DATE,
    ExmFee INT UNSIGNED,
    PRIMARY KEY (ExaminationDate, PCode, OUTPCode, DrCode),
    -- FOREIGN KEY (PCode) REFERENCES OutPatient (PCode),
    -- FOREIGN KEY (OUTPCode) REFERENCES OutPatient (OUTPCode),
    -- error Error Code: 1822. Failed to add the foreign key constraint. Missing index for constraint 'examinationreport_ibfk_2' in the referenced table 'outpatient'
    FOREIGN KEY (PCode, OUTPCode) REFERENCES OutPatient(PCode, OUTPCode),
    FOREIGN KEY (DrCode) REFERENCES Doctor(ECode)
);

-- Prescriptions for Outpatients
CREATE TABLE PrescriptionsOutpatient (
    MCode CHAR(13),
    ExaminationDate DATETIME,
    PCode Char(9),
    OUTPCode Char(11),
    DrCode CHAR(8),
    Amount INT UNSIGNED,
    PRIMARY KEY (MCode, ExaminationDate, PCode, OUTPCode, DrCode),
    FOREIGN KEY (ExaminationDate, PCode, OUTPCode, DrCode) REFERENCES ExaminationReport(ExaminationDate, PCode, OUTPCode, DrCode),
    FOREIGN KEY (MCode) REFERENCES Medicationpackage (MCode)
);

-- Provider-Medication
CREATE TABLE ProviderMedication (
    ImportedDate DATE,
    PVCode CHAR(6),
    MCode CHAR(13),
    ImportedPrice BIGINT UNSIGNED,
    ImportedQuantity INT UNSIGNED,
    PRIMARY KEY (ImportedDate, PVCode, MCode),
    FOREIGN KEY (PVCode) REFERENCES Provider(PVCode),
    FOREIGN KEY (MCode) REFERENCES Medicationpackage (MCode)
);

-- Prescriptions for Inpatients
CREATE TABLE PrescriptionsInpatient (
	DateWriten DATETIME,
    TreatmentStartDate DATETIME,
    PCode Char(9),
    INPCode Char(11),
    AdmissionDate DATE,
    DrCode CHAR(8),
    MCode CHAR(13),
    Amount INT UNSIGNED,
    PRIMARY KEY (DateWriten, TreatmentStartDate, PCode, INPCode, AdmissionDate, DrCode, MCode),
    -- FOREIGN KEY (TreatmentStartDate) REFERENCES TreatmentReport(TreatmentStartDate),
    -- FOREIGN KEY (PCode) REFERENCES TreatmentReport (PCode),
    -- FOREIGN KEY (INPCode) REFERENCES TreatmentReport (INPCode),
    -- FOREIGN KEY (AdmissionDate) REFERENCES TreatmentReport (AdmissionDate),
    -- FOREIGN KEY (DrCode) REFERENCES TreatmentReport (DrCode),
    -- error Error Code: 1822. Failed to add the foreign key constraint. Missing index for constraint 'prescriptionsinpatient_ibfk_5' in the referenced table 'treatmentreport'
    FOREIGN KEY (TreatmentStartDate, PCode, INPCode, AdmissionDate, DrCode) 
        REFERENCES TreatmentReport(TreatmentStartDate, PCode, INPCode, AdmissionDate, DrCode),
    FOREIGN KEY (MCode) REFERENCES Medicationpackage(MCode)
);

CREATE TABLE NursePhone(
	ECode Char(8),
    EPhone Char(15),
    PRIMARY KEY (ECode,EPhone),
    FOREIGN KEY (ECode) REFERENCES Nurse (ECode)
);

CREATE TABLE DoctorPhone(
	ECode Char(8),
    EPhone Char(15),
    PRIMARY KEY (ECode,EPhone),
    FOREIGN KEY (ECode) REFERENCES Doctor (ECode)
);

