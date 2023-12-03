import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./DisCountMedicine.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addDiscountMedicine,
  deleteParticularDiscountMledicine,
  getAllDiscountCardOfMedical,
} from "../ApiCalling/api";
import { getMedicalDiscountCardList } from "../Action";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import DeleteModal from "../Common/DeleteModal/DeleteModal";

const DisCountMedicine = () => {
  const [name, setName] = useState("");
  const [choseCard, setChoseCard] = useState(false);
  const [cardId, setCardId] = useState("");
  // for common Modal
  // const [modalOpen, setModalOpen] = useState(false);
  // const [cardToDelete, setCardToDelete] = useState(null);

  const dispatch = useDispatch();

  const email = useSelector(
    (state) => state?.getUserData?.userData?.user?.email
  );

  const discountCards = useSelector(
    (state) => state?.getDiscountMedicine?.CardhList
  );

  const shopName = useSelector(
    (state) => state?.getShopDetailsM?.shopDataM?.shopName
  );

  console.log("cardList", discountCards);

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
    let datas;

    if (choseCard) {
      const cardEdit = "true";

      datas = { ...data, cardEdit: cardEdit, email: email, cardId: cardId };
    } else {
      const cardEdit = "false";
      datas = { ...data, cardEdit: cardEdit, email: email, cardId: "empty" };
    }

    console.log(datas, "11");

    addDiscountMedicine(datas, addDiscountMedicinecallback);

    reset();
  }

  function addDiscountMedicinecallback() {
    setChoseCard(false);
    getAllDiscountCardOfMedical(getAllMedicalCardCallback);
  }

  function getAllMedicalCardCallback(data) {
    dispatch(getMedicalDiscountCardList(data));
  }

  function editDiscountCard(ID) {
    console.log("edit working");
    setCardId(ID);
    const card = discountCards?.find((val) => val._id == ID);

    setValue("discountOn", card?.discountOn);
    setValue("discountPercent", card?.discountPercent);

    setChoseCard(true);
    scrollToSection("form");
  }

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  function deleteDiscountCard(ID) {
    const data = { ID: ID, email: email };

    deleteParticularDiscountMledicine(
      data,
      deleteParticularCardMedicineCallback
    );
  }

  function deleteParticularCardMedicineCallback() {
    getAllDiscountCardOfMedical(getAllMedicalCardCallback);
  }

  // for common modal

  // const openModal = (cardId) => {
  //   console.log("open");
  //   console.log("id", cardId);
  //   setCardToDelete(cardId);
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setCardToDelete(null);
  //   setModalOpen(false);
  // };

  // const handleDelete = () => {
  //   if (cardToDelete) {
  //     deleteDiscountCard(cardToDelete);
  //     closeModal();
  //   }
  // };

  return (
    <div className="container-fluid" style={{ position: "relative" }}>
      {/* for common modal */}
      {/* <DeleteModal 
                isOpen={modalOpen}
                onCancel={closeModal}
                onConfirm={handleDelete}
              /> */}

      <div className="row">
        <div className="docHead text-center ">
          <p>
            You can Create Discount Cards on Different Sections Like Medicine,
            Test etc. You Just Need to Fill The Below Form And We Will Create a
            Discount Card That Will be Vissible To The User On Your Pharmacy
            Webpage.
          </p>
        </div>
      </div>

      {/*  form */}

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
            <h5>Discount Details</h5>

            <div
              // data-aos="fade-left"
              // data-aos-duration="500"
              // data-aos-delay={800}
              className="row flex-md-row flex-column mb-3"
            >
              <div className="col">
                <label id="login_label" htmlFor="firstName">
                  Discount On
                </label>
                <input
                  type="text"
                  className="form-control login_input"
                  placeholder="Enter Discount Title"
                  {...register("discountOn", {
                    required: true,
                  })}
                />
                {errors.discountOn && errors.discountOn.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <div className="col">
                <label id="login_label" htmlFor="name">
                  Percentage Discount
                </label>
                <input
                  type="number"
                  className="form-control login_input"
                  placeholder="Enter Discount % "
                  {...register("discountPercent", {
                    required: true,
                  })}
                />
                {errors.discountPercent &&
                  errors.discountPercent.type === "required" && (
                    <span className="text-danger">This field is required</span>
                  )}
              </div>
            </div>

            <div className="text-center">
              <button type="submit" 
              // id="profile_btn" 
              className="button-common ">
                {/* {choseBatch ? "Edit" : "Creat"} */} Create
              </button>
            </div>
          </form>
        </div>
      </div>

      {discountCards &&
        discountCards.length > 0 &&
        discountCards.map((val) => {
          return (
            <>
              <div className="row justify-content-center align-items-center my-4 ">
                <div className="col-md-10 col-12">
                  <div className="row justify-content-around   gx-2 gy-5">
                    <div
                      className="col-md-5 col-12  "
                      style={{
                        position: "relative",
                        padding: "0px",
                        borderRadius: "12px",
                        boxShadow: "4px 3px 10px rgba(0,0,0, 0.2 )",
                      }}
                    >
                      <div className="disPercent"
                        style={{ position: "absolute", left: "8%", top: "20%" }}
                      >
                        <h6 style={{margin:"0px"}}>{val.discountPercent}% OFF</h6>
                      </div>
                      <div
                        className=" row  discountcard"
                        style={{
                          height: "35vh",
                          borderRadius: "20px",
                          position: "relative",
                        }}
                      >
                        <div
                          class="custom-shape-divider-top-1691572611"
                          style={{ padding: "0px", borderRadius: "12px" }}
                        >
                          <svg
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                          >
                            <path
                              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                              class="shape-fill"
                              fill="#3ce2ad"
                            ></path>
                          </svg>
                        </div>

                        <div
                          className="col-5  d-flex justify-content-center align-items-center"
                          style={{ position: "relative" }}
                        >
                          <h3 className="medicine">{val.discountOn}</h3>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "18px",
                              left: "25px",
                            }}
                          >
                            <RiDeleteBin6Fill
                              onClick={() => {
                                const shouldDelete = window.confirm(
                                  "Are you sure you want to delete?"
                                );
                                if (shouldDelete) {
                                  deleteDiscountCard(val._id);
                                }
                              }}
                              style={{ fontSize: "25px", color: "red" }}
                            />
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "18px",
                              left: "78px",
                            }}
                          >
                            <FiEdit
                              onClick={() => editDiscountCard(val._id)}
                              style={{
                                fontSize: "25px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </div>

                        <div
                          className="col-7  d-flex justify-content-center align-items-center"
                          style={{ position: "relative" }}
                        >
                          <div class="custom-shape-divider-bottom-1691574366">
                            <svg
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1200 120"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                                class="shape-fill"
                              ></path>
                            </svg>
                          </div>

                          <div>
                            <h4>{shopName && shopName}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete modal */}
            </>
          );
        })}

      {/*  */}
    </div>
  );
};

export default DisCountMedicine;
