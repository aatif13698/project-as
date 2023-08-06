import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import activeLinkContext from "../context/activeLinkContext";
import { useForm, Controller } from "react-hook-form";
import {
  addUpcommingBatchProfile,
  deleteParticularUpcommingBatch,
  getAllUpcommingBatchesOfParticularInstitute,
  getUser,
} from "../ApiCalling/api";
import { getUpcommingBatchList, getUserData } from "../Action";
import { iconsImgs } from "../../utils/images";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./AddUpcommingBatch.css";
import dayjs from "dayjs";

// for material Ui select

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const AddUpcommingBatch = () => {
  const [dateValue, setDateValue] = React.useState(null);
  const [timeValue, setTimeValue] = useState(dayjs("2022-04-17T15:30"));
  const [name, setName] = useState("");
  const [choseBatch, setChoseBatch] = useState(false);
  const [batchId, seTBatchId] = useState("");

  const scrollRef = useRef();

  const email = useSelector(
    (state) => state?.getUserData?.userData?.user?.email
  );

  const user = useSelector((state) => state?.getUserData?.userData?.user);

  const batches = useSelector(
    (state) => state?.getUpcommingBatchesProfile?.UpcommingBatchList
  );

  console.log("batches", batches);
  // console.log("choseBatch", choseBatch);
  // console.log("batchId", batchId);
  // console.log("DateValue", dateValue);

  const { setActiveLink } = useContext(activeLinkContext);

  const dispatch = useDispatch();

  // for material ui select

  // for materail ui select

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    mode: "onChange",
  });

  function formatToDateString(date) {
    // Format the date as "dd/MM/yyyy"
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function formateToTimeString(dateString) {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime;
  }

  function onSubmit(data) {

    // const formatedTime = formateToTimeString(data.upBhTime.$d);
    // const formattedDate = formatToDateString(data.upBhStartingFrom.$d);
    // console.log("formattedDate", formattedDate);
    // console.log("formatedTime", formatedTime);

    // data.upBhStartingFrom = formattedDate;
    // data.upBhTime = formatedTime;

    const arr = JSON.stringify(data.upBhDays);

    data.upBhDays = arr

    let datas;

    if (choseBatch) {
      const batchEdit = "true";

      datas = { ...data, batchEdit: batchEdit, email: email, batchId: batchId };
    } else {
      const batchEdit = "false";
      datas = { ...data, batchEdit: batchEdit, email: email, batchId: "empty" };
    }

    console.log(datas, "11");

    addUpcommingBatchProfile(datas, addUpcommingBatchProfilecallback);
  }

  function addUpcommingBatchProfilecallback() {
    reset();
    getUser(getData);
    getAllUpcommingBatchesOfParticularInstitute(getAllUpcommingBatchesCallback);
    setChoseBatch(false);
  }

  function getData(data) {
    dispatch(getUserData(data));
  }

  function getAllUpcommingBatchesCallback(data) {
    dispatch(getUpcommingBatchList(data));
  }

  // edit Batch

  function editBatchProfile(ID) {
    seTBatchId(ID);
    const batch = batches?.find((val) => val._id == ID);
    console.log("seleted batch", batch);

    setValue("aboutUpBh", batch?.aboutUpBh);
    setValue("upBhClass", batch?.upBhClass);
    setValue("upBhDays", batch?.upBhDays);  
    setValue("upBhName", batch?.upBhName);
    setValue("upBhTime", batch?.upBhTime);
    setValue("upBhSubject", batch?.upBhSubject);
    setValue("upBhTeacher", batch?.upBhTeacher);
    // setValue("upBhStartingFrom", batch?.upBhStartingFrom);

    setChoseBatch(true);
    scrollToSection("form");
  }

  // delete Batch

  function deleteBatchProfile(ID) {
    const data = { ID: ID, email: email };

    deleteParticularUpcommingBatch(
      data,
      deleteParticularUpcommingBatchCallback
    );
  }

  function deleteParticularUpcommingBatchCallback() {
    // console.log("ho raha");

    getAllUpcommingBatchesOfParticularInstitute(getAllUpcommingBatchesCallback);
  }

  // function for scrolling

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  useEffect(() => {
    setName(user?.name);
  }, [user]);

  useEffect(() => {
    setActiveLink(6);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [batches]);

  return (
    <div className="container-fluid " style={{ padding: "0px" }}>
      <div
        className="row justify-content-center"
        data-aos="fade-left"
        data-aos-duration="500"
        data-aos-delay={200}
      >
        <div className="col-md-10 col-12">
          <h4 className="text-center">Hello {name}..</h4>
          <h6 className="text-center">
            Please Fill The Form To Creat Upcomming Batche Card For Students
            Available In your Institute. You Can Add Any Number Of Batches And
            Can Manage To Edit And Delete The Batch Card As Per The Requirement.
          </h6>
        </div>
      </div>

      <div
        className="row justify-content-center align-items-center mx-2"
        style={{ marginBottom: "40px " }}
        id="form"
      >
        <div
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-delay={400}
          className="col-12   col-md-8"
          id="creatProfile"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            data-aos="fade-left"
            data-aos-duration="700"
            data-aos-delay={800}
          >
            <h5>Batch Details</h5>

            <div
              // data-aos="fade-left"
              // data-aos-duration="500"
              // data-aos-delay={800}
              className="row flex-md-row flex-column mb-3"
            >
              <div className="col">
                <label id="login_label" htmlFor="firstName">
                  Batch Name
                </label>
                <input
                  type="text"
                  className="form-control login_input"
                  placeholder="Enter Batch Name"
                  {...register("upBhName", {
                    required: true,
                  })}
                />
                {errors.upBhName && errors.upBhName.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <div className="col">
                <label id="login_label" htmlFor="name">
                  Class Name
                </label>
                <input
                  type="text"
                  className="form-control login_input"
                  placeholder="Enter Batch class "
                  {...register("upBhClass", {
                    required: true,
                  })}
                />
                {errors.upBhClass && errors.upBhClass.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>

            <div
              // data-aos="fade-left"
              // data-aos-duration="500"
              // data-aos-delay={800}
              className="row flex-md-row flex-column mb-3"
            >
              <div className="col">
                <label id="login_label" htmlFor="firstName">
                  Subject Special
                </label>
                <input
                  type="text"
                  className="form-control login_input"
                  placeholder="Enter Subject"
                  {...register("upBhSubject", {
                    required: true,
                  })}
                />
                {errors.upBhSubject &&
                  errors.upBhSubject.type === "required" && (
                    <span className="text-danger">This field is required</span>
                  )}
              </div>
              <div className="col">
                <label id="login_label" htmlFor="name">
                  Teacher Name :
                </label>
                <input
                  type="text"
                  className="form-control login_input"
                  placeholder="Enter Teacher "
                  {...register("upBhTeacher", {
                    required: true,
                  })}
                />
                {errors.upBhTeacher &&
                  errors.upBhTeacher.type === "required" && (
                    <span className="text-danger">This field is required</span>
                  )}
              </div>
            </div>

            <div
              // data-aos="fade-left"
              // data-aos-duration="500"
              // data-aos-delay={800}
              className="row flex-md-row flex-column mb-3"
            >
              <div className="col">
                <Controller
                  name="upBhTime"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <>
                    <label htmlFor="">Batch Time</label>
                      <MobileTimePicker
                        // label="Controlled picker"
                        {...field}
                        // value={field.value}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        sx={{ width: "100%" }}
                      />

                      {errors.upBhTime && (
                        <span className="text-danger">
                          {errors.upBhTime.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="col">
                <label id="login_label" htmlFor="name">
                  Starting From :
                </label>

                <Controller
                  name="upBhStartingFrom"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <>
                      <DatePicker
                        {...field}
                        // value={field.value}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        sx={{ width: "100%" }}
                      />
                      {errors.upBhStartingFrom && (
                        <span className="text-danger">
                          {errors.upBhStartingFrom.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            <div>
              <Controller
                name="upBhDays"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Batch Days
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      {...field}
                      value={field.value || []} // Use field.value or empty array to ensure it's an array
                      onChange={(event) => field.onChange(event.target.value)} // Update field value on change
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          {/* <Checkbox checked={field.value && field.value.indexOf(name) > -1} /> */}
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>

                    {errors.upBhDays && (
                      <span className="text-danger">
                        {errors.upBhDays.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <div className="row flex-md-row flex-column justify-content-around align-items-center mb-3 mt-4">
              <div className="col d-flex flex-column">
                <label htmlFor="about">About Batch :</label>
                <textarea
                  id="about"
                  name="about"
                  placeholder="Enter between 20 to 30 words...."
                  rows="4"
                  cols="28"
                  {...register("aboutUpBh", {
                    required: true,
                  })}
                ></textarea>
                {errors.aboutUpBh && errors.aboutUpBh.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>

            <div className="text-center">
              <button type="submit" id="profile_btn" className="btn btn-block ">
                {choseBatch ? "Edit" : "Creat"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {batches && batches.length>0 &&
        batches.map((val) => {
          return (
            <div className="row  doctorRow" key={val._id} ref={scrollRef}>
              <div className=" col-12 col-md-8" style={{ height: "100%" }}>
                <div
                  className="row flex-md-row flex-reverse  docRow2 "
                  style={{
                    height: "100%",
                    borderRadius: "40px",
                    padding: "0px",
                  }}
                >
                  <div className=" docCol col-12 order-2 order-md-1  col-md-7 flex-column  d-flex  justify-content-center  ">
                    <div className="docText">
                      <div style={{ position: "relative" }}>
                        <h3>{val.upBhName}</h3>
                        {/* <h5>{val.subjectSpecialist}</h5> */}
                        <div
                          className="docLine"
                          style={{ position: "absolute", height: "4px" }}
                        ></div>
                      </div>

                      <div className=" docSpan">
                        <p>
                          <img
                            className="docIcon"
                            src={iconsImgs.phone}
                            alt=""
                          />
                          {/* <span> {val.trPhoneNumber}</span> */}
                        </p>
                        <p>
                          <img
                            className="docIcon"
                            src={iconsImgs.mail}
                            alt=""
                          />
                          {/* <span> {val.trEmail}</span> */}
                        </p>
                        <p>
                          <img
                            className="docIcon"
                            src={iconsImgs.location}
                            alt=""
                          />
                          <span>
                            {/* {val.street} {val.city} {val.state} {val.zipCode} */}
                          </span>
                        </p>
                      </div>

                      <div className="d-flex justify-content-start align-items-center mt-3">
                        <button
                          to="#form"
                          onClick={() => editBatchProfile(val._id)}
                          className="doc_btn"
                          style={{ marginTop: "5px" }}
                        >
                          Edit
                        </button>
                        <button
                          to="#form"
                          onClick={() => deleteBatchProfile(val._id)}
                          className="doc_btn"
                          style={{ marginTop: "5px" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 order-1 order-md-2 col-md-5 docCol2 d-flex justify-content-center align-items-center ">
                    <div>
                      <img
                        className="doctorImg"
                        src="https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AddUpcommingBatch;
