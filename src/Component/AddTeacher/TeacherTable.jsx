import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import activeLinkContext from "../context/activeLinkContext";
import { useForm } from "react-hook-form";
import {
  addTeacherProfile,
  deleteParticularTeacher,
  getAllTeachersOfParticularInstitute,
  getUser,
} from "../ApiCalling/api";
import { getTeacherList, getUserData } from "../Action";
import avatar from "../Assets/Images/profile.png";
import { iconsImgs } from "../../utils/images";
import ImgURL from "../Common/imageUrl";
import Title from "../Common/Title/Title";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  CardHeader,
  CardFooter,
  Card,
  CardBody,
  Button,
  ButtonGroup,
} from "reactstrap";
import "./AddTeacher.css";
import DataTable from "react-data-table-component";
import Search from "../Common/Search/Search";
import * as XLSX from 'xlsx';
// import TeacherTable from "./TeacherTable";

const data = [
  { id: 1, name: "John Doe", email: "Developer", phone: "2222222222" },
  { id: 2, name: "Jane Smith", email: "Designer", phone: "3333333333" },
  // Add more employee data as needed
];

const TeacherTable = () => {
  const teachers = useSelector(
    (state) => state?.getAllTeachersProfile?.teachersList
  );

  console.log("teachers",teachers);


  const [csvData, setCsvData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Assuming there is only one sheet in the CSV file
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Update the state with the CSV data
        setCsvData(jsonData);
      };

      reader.readAsBinaryString(file);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(teachers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'output.xlsx');
  };

  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.userId,
        sortable: true,
      },
      {
        name: "Name",
        selector: "trName",
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.trEmail,
        sortable: true,
      },
      {
        name: "Phone",
        selector: (row) => row.trPhoneNumber,
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <div>
            <button onClick={() => handleView(row)}>View</button>
            <button onClick={() => handleDelete(row)}>Delete</button>
            <button onClick={() => handleInactive(row)}>Inactive</button>
          </div>
        ),
      },
    ],
    []
  );

  const handleView = (row) => {
    // Implement the logic for viewing a teacher
    console.log("Viewing teacher:", row);
  };

  const handleDelete = (row) => {
    // Implement the logic for deleting a teacher
    console.log("Deleting teacher:", row);
  };

  const handleInactive = (row) => {
    // Implement the logic for making a teacher inactive
    console.log("Making teacher inactive:", row);
  };


  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-md-4 d-flex justify-content-around">
               <input id="csv-upload" type="file" accept=".csv" onChange={handleFileUpload} />

               <label htmlFor="csv-upload" className="button-common mb-0">
                 Import
               </label>
               
              <button onClick={exportToExcel} className="button-common">Export</button>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <Search />
        <CardBody>
          <DataTable
            columns={columns}
            data={teachers}
            pagination
          />
        </CardBody>
      </Card>
    </>
  );
};

export default TeacherTable;
