import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import activeLinkContext from "../context/activeLinkContext";
import { useForm, Controller } from "react-hook-form";
import avatar from "../Assets/Images/profile.png";
import {
  addBatchProfile,
  deleteParticularBatch,
  getAllBatchesOfParticularInstitute,
  getUser,
} from "../ApiCalling/api";
import { getBatchList, getUserData } from "../Action";
import { iconsImgs } from "../../utils/images";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Title from "../Common/Title/Title";


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

const AddBatches = () => {
  const [name, setName] = useState("");
  const [choseBatch, setChoseBatch] = useState(false);
  const [batchId, seTBatchId] = useState("");

  const scrollRef = useRef();

  const email = useSelector(
    (state) => state?.getUserData?.userData?.user?.email
  );

  const user = useSelector((state) => state?.getUserData?.userData?.user);

  const batches = useSelector((state) => state?.getBatchesProfile?.batchList);

  console.log("batches", batches);
  console.log("choseBatch", choseBatch);
  console.log("batchId", batchId);

  const { setActiveLink } = useContext(activeLinkContext);

  const dispatch = useDispatch();

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

  function onSubmit(data) {
    const { aboutBh, bhClass, bhDays, bhName, bhTime } = data;

    const arr = JSON.stringify(data.bhDays);


    let datas;

    if (choseBatch) {
      const batchEdit = "true";

      datas = { ...data, batchEdit: batchEdit, email: email, batchId: batchId , bhDays:arr};
    } else {
      const batchEdit = "false";
      datas = { ...data, batchEdit: batchEdit, email: email, batchId: "empty", bhDays : arr };
    }

    console.log(datas, "11");

    addBatchProfile(datas, addBatchProfilecallback);
  }

  function addBatchProfilecallback() {
    reset();
    getUser(getData);
    getAllBatchesOfParticularInstitute(getAllBatchesCallback);
    setChoseBatch(false);
  }

  function getData(data) {
    dispatch(getUserData(data));
  }

  function getAllBatchesCallback(data) {
    dispatch(getBatchList(data));
  }

  // edit Batch

  function editBatchProfile(ID) {
    seTBatchId(ID);
    const batch = batches?.find((val) => val._id == ID);

    setValue("aboutBh", batch?.aboutBh);
    setValue("bhClass", batch?.bhClass);
    setValue("bhDays", batch?.bhDays);
    setValue("bhName", batch?.bhName);
    setValue("bhTime", batch?.bhTime);

    setChoseBatch(true);
    scrollToSection("form");
  }

  // delete Batch

  function deleteBatchProfile(ID) {
    const data = { ID: ID, email: email };

    deleteParticularBatch(data, deleteParticularBatchCallback);
  }

  function deleteParticularBatchCallback() {
    // console.log("ho raha");

    getAllBatchesOfParticularInstitute(getAllBatchesCallback);
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
    setActiveLink(4);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [batches]);

  return (
    <div className="container-fluid " style={{ padding: "0px" }}>
      {/* <div
        className="row justify-content-center"
        data-aos="fade-left"
        data-aos-duration="500"
        data-aos-delay={200}
      >
        <div className="col-md-10 col-12">
          <h4 className="text-center">Hello {name}..</h4>
          <h6 className="text-center">
            Please Fill The Form To Batche Card For Students Available In your
            Institute. You Can Add Any Number Of Batches And Can Manage To Edit
            And Delete The Batch Card As Per The Requirement.
          </h6>
        </div>
      </div> */}

      <Title
          src={iconsImgs.batches}
          title={"Create Batches Card"}
          subTitle={
            "The Batch Card Will Vissible To EveryOne"
          }
        />

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
                  {...register("bhName", {
                    required: true,
                  })}
                />
                {errors.bhName && errors.bhName.type === "required" && (
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
                  {...register("bhClass", {
                    required: true,
                  })}
                />
                {errors.bhClass && errors.bhClass.type === "required" && (
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
                {/* <label id="login_label" htmlFor="firstName">
                  Batch Day
                </label>
                <input
                  type="day"
                  className="form-control login_input"
                  placeholder="Enter Days"
                  {...register("bhDays", {
                    required: true,
                  })}
                />
                {errors.bhDays && errors.bhDays.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )} */}

                <Controller
                  name="bhDays"
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

                      {errors.bhDays && (
                        <span className="text-danger">
                          {errors.bhDays.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="col">
                <Controller
                  name="bhTime"
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

                      {errors.bhTime && (
                        <span className="text-danger">
                          {errors.bhTime.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            <div className="row justify-content-around align-items-center mb-3 mt-4">
              <div className="col d-flex flex-column">
                <label htmlFor="about">About Batch :</label>
                <textarea
                  id="about"
                  name="about"
                  placeholder="Enter between 20 to 30 words...."
                  rows="4"
                  cols="45"
                  {...register("aboutBh", {
                    required: true,
                  })}
                ></textarea>
                {errors.aboutBh && errors.aboutBh.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>

            <div className="">
              <button type="submit"
              //  id="profile_btn"
                className=" button-common">
                {choseBatch ? "Edit" : "Creat"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {batches &&
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
                        <h3>Mr.{val.bhName}</h3>
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

export default AddBatches;
