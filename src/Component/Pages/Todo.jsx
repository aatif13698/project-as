import React, { useContext, useEffect, useRef, useState } from "react";
import "./Todo.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserTAsk,
  checkedOneTask,
  deleteOneTask,
  getUser,
  getUserTask,
  updateOneTask,
} from "../ApiCalling/api";
import {
  deleteUserData,
  deleteUserTodo,
  getUserData,
  getUserDoneList,
  getUserNotDoneList,
  getUserTodo,
} from "../Action";
import { FiLogOut } from "react-icons/fi";
import { MdOutlinePendingActions, MdTrendingUp } from "react-icons/md";
import { IoIosCloudDone } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import { formatTimestamp } from "../Common/formatTimestamp";
import { toast } from "react-toastify";
import TodoOfDate from "./TodoOfDate";
import useDelete from "../Common/useDelete";
import useBoxChange from "../Common/useBoxChange";
import activeLinkContext from "../context/activeLinkContext";

const Todo = () => {
  const dispatch = useDispatch();

  const [removeHandler] = useDelete();
  const [handleBoxChange] = useBoxChange();

  const [togleEdit, setTogle] = useState(false);
  const [oldId, setOldId] = useState("");
  const [date, setDate] = useState("");
  const [listByDate, setListByDate] = useState([]);
  const [dateListTogle, setDateListTogle] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const taskRef = useRef();
  const scrollRef = useRef();
  const navigate = useNavigate();
  const userName = useSelector(
    (state) => state?.getUserData?.userData?.user?.name
  );

  const Store = useSelector((state) => state);
  const  { setActiveLink}  = useContext(activeLinkContext)

  // console.log("store", Store);

  const userId = useSelector(
    (state) => state?.getUserData?.userData?.user?._id
  );

  const list = useSelector((state) => state.getUserTodo.list);
  const doneList = useSelector((state) => state?.getDoneList?.doneList);
  const notDoneList = useSelector((state) => state?.getDoneList?.notDoneList);

  console.log("listttt", list);

  const handleKeyPress = (event) => {
    if (togleEdit) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    }
  };

  // addTask

  function addHandler(e) {
    e.preventDefault();

    if (taskRef.current.value.length > 2) {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      const taskData = {
        userId: userId,
        userName: userName,
        task: {
          task: taskRef.current.value,
          checked: false,
          time: "",
          update: false,
          id: Math.random(),
          taskDate: formattedDate,
        },
      };
      addUserTAsk(taskData, taskFnc);
    } else {
      toast.warning("Please Enter At Least 3 Character...", {
        autoClose: 1000,
      });
    }
  }

  function taskFnc() {
    getUserTask(getlist);
    taskRef.current.value = "";
  }

  // removetask

  // function removeHandler(ID) {
  //   const data = { userId: userId, taskId: ID };

  //   deleteOneTask(data, deleteCallBack);
  // }

  function deleteCallBack() {
    getUserTask(getlist);
  }

  // updateTask

  function updateHandler(ID) {
    console.log("ID", ID);
    setTogle(true);
    setOldId(ID);

    let task = list.find((val) => val.id == ID);

    taskRef.current.value = task.task;
  }

  function finalUpdate() {
    const datas = {
      newTask: taskRef.current.value,
      taskId: oldId,
      userId: userId,
    };

    updateOneTask(datas, updateCallBack);
  }

  function updateCallBack() {
    getUserTask(getlist);
    taskRef.current.value = "";
    setTogle(false);
  }

  // checkedTask

  // function handleBoxChange(ID) {
  //   setOldCheckedID(ID);
  //   const datas = {
  //     userId: userId,
  //     taskId: ID,
  //     time: Date.now(),
  //   };
  //   checkedOneTask(datas, checkedCallBack);
  // }

  function checkedCallBack() {
    getUserTask(getlist);
  }

  // dateChange handler

  const handleDateChange = (event) => {
    const dateValue = event.target.value;
    setDate(dateValue);
    const listWithDate = list.filter((val) => {
      if (val.taskDate === dateValue) {
        return val;
      }
    });

    if (listWithDate.length > 0) {
      setListByDate(listWithDate);
    } else {
      setListByDate([]);
    }

    setDateListTogle(true);
    setSelectedDate(dateValue);
    setDate("");
  };

  // findNotDoneList
  async function findNotDoneList() {
    const NotdoneList = await list.filter((value) => {
      if (value.time == "") {
        return value;
      }
    });

    dispatch(getUserNotDoneList(NotdoneList));
  }

  // findDoneList

  async function findDoneList() {
    const doneList = await list.filter((value) => {
      if (value.time) {
        return value;
      }
    });
    dispatch(getUserDoneList(doneList));
  }

  // getTaskList

  function getlist(data) {
    dispatch(getUserTodo(data));
  }

  // getUserData

  function getData(data) {
    dispatch(getUserData(data));
  }

  // logOut User

  function logoutFnc() {
    localStorage.setItem("token", null);
    dispatch(deleteUserData);
    dispatch(deleteUserTodo);
    navigate("/login");
  }

  // profile 

  function profileHnadler(){
    navigate("/CreatProfile")
  }

  // useEffects

  useEffect(() => {
    getUser(getData);
    getUserTask(getlist);
    setActiveLink(6)
  }, []);

 
  useEffect(() => {
    findDoneList();
    findNotDoneList();
  }, [list]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [list]);

  return (
    <div className="container-fluid">
      <div className="row"  >
        <div className="col-12" style={{position:"relative"}}>
          <h3
            className="text-center"
            style={{ color: "black", padding: "20px 0px 0px  0px" }}
          >
            Hey {userName} , Here is your work List{" "}
          </h3>
        </div>
        {/* <button className="btn btn-primary "  style={{position:"absolute",top:"10px", right:"10px", width:"10%" }} onClick={profileHnadler}>Profile</button> */}
      </div>
      <div className="row">
        <p className="text-center" style={{ color: "black" }}>
          Select Date And Get The Work List OF That Date.
        </p>
      </div>

      <div className="date-picker-container row flex-row justify-content-around align-items-center">
        <div className="col-6 col-md-3 d-flex justify-content-center">
          <input
            style={{
              color: "black",
              background: "transparent",
              border: "2px solid #3ce2ad",
              borderRadius: "5px",
              // width: "140px",
            }}
            type="date"
            id="datepicker"
            name="datepicker"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="col-4 col-md-4 d-flex justify-content-center">
          {dateListTogle ? (
            <button
              className="btn btn-success"
              onClick={() => setDateListTogle(false)}
            >
              {list.length == 0 ? "Start Adding Work" : " See All List"}
            </button>
          ) : (
            <div
              className="d-flex justify-content-around"
              style={{ width: "100%" }}
            >
              <span style={{ color: "black" }}>
                <IoIosCloudDone
                  onClick={() => navigate("/dashboard/todo/doneTodo")}
                  style={{ color: "rgb(35 235 70)", fontSize: "35px" }}
                />{" "}
                {doneList.length}
              </span>

              <span style={{ color: "black" }}>
                <MdOutlinePendingActions
                  onClick={() => navigate("/dashboard/todo/notdonetodo")}
                  style={{ color: "#3ce2ad", fontSize: "35px" }}
                />{" "}
                {notDoneList.length}
              </span>
            </div>
          )}
        </div>
        <div className="col-2 col-md-3 d-flex justify-content-center">
          <span style={{ color: "black" }}>
            <FiLogOut
              style={{ color: "red", fontSize: "1.5rem" }}
              onClick={logoutFnc}
            />{" "}
          </span>
        </div>
      </div>

      {}

      {dateListTogle ? (
        <div className="d-flex justify-content-center align-items-center my-4">
          {" "}
          {listByDate.length == 0 ? (
            <h3 style={{ color: "black" }}>
              No work Found On Date : {selectedDate}{" "}
            </h3>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h3 style={{ color: "black" }}>List Of Date: {selectedDate} </h3>
              <span style={{ color: "black" }}>
                Total : {listByDate.length} works
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="row justify-content-center my-4">
          <div className="col-12 text-center">
            <form onSubmit={addHandler}>
              <input
                className="todo-input"
                type="text"
                placeholder="Add the list.."
                ref={taskRef}
                style={{border:"2px solid #3ce2ad", color:"black", boxShadow:"2px 4px 10px rgba(0,0,0, 0.2"}}
                onKeyPress={handleKeyPress}
              />
              {togleEdit ? (
                <span>
                  <FiEdit
                    style={{
                      color: "rgb(35 235 70)",
                      fontSize: "2rem",
                      margin: "0px 4px",
                    }}
                    onClick={finalUpdate}
                  />
                </span>
              ) : (
                <button
                  type="submit"
                  className="btn  ms-3"
                  style={{ background: "#3ce2ad" }}
                  //  disabled={togleEdit ?  true : false}
                >
                  ADD
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {dateListTogle ? (
        <TodoOfDate
          setListByDate={setListByDate}
          listByDate={listByDate}
          handleBoxChange={handleBoxChange}
          removeHandler={removeHandler}
          // scrollRef={scrollRef}
        />
      ) : (
        <div className="row justify-content-center">
          <div className=" col-12 col-md-9 listDivStyle">
            {list &&
              list.length > 0 &&
              list.map((value, index) => {
                return (
                  <div
                    key={"todo" + index}
                    className=" row border  mb-4  py-3 "
                    style={{ margin: "0px 10px", borderRadius: "12px", background:"#5fb2b5" , boxShadow:" 2px 5px 13px rgba(0,0,0,0.2)"}}
                    ref={scrollRef}
                  >
                    <div
                      className={`d-flex col-10 d-flex  align-items-center ${
                        value.checked
                          ? "justify-content-start"
                          : "justify-content-start"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={value.checked}
                        onChange={() => handleBoxChange(value.id)}
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                          // Add more styles here
                          backgroundColor: value.checked
                            ? "#3ce2ad"
                            : "white", // Change box background color based on checked state
                          border: "2px solid rgb(57 190 25)", // Add border to the checkbox
                          borderRadius: "4px", // Round the corners
                          appearance: "none", // Hide the default checkbox appearance
                          outline: "none", // Remove the focus outline
                        }}
                      />
                      <h5
                        style={{
                          color: value.checked ? "#3ce2ad" : "black",
                          margin: "0px 5px",
                          fontSize: "22px",
                        }}
                      >
                        {value.task}
                      </h5>
                      {value.checked ? (
                        <span
                          style={{
                            color: "black",
                            margin: "0px 0px",
                            fontSize: "12px",
                          }}
                        >
                          {formatTimestamp(value?.time)}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className=" col-2 d-flex justify-content-around align-items-center">
                      <span>
                        <FiEdit
                          style={{
                            color: "#3ce2ad",
                            fontSize: "1.5rem",
                          }}
                          onClick={() => updateHandler(value.id)}
                        />
                      </span>
                      <span>
                        <AiOutlineDelete
                          style={{ color: "red", fontSize: "1.5rem" }}
                          onClick={() => removeHandler(value.id)}
                        />
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      <Outlet/>
    </div>
  );
};

export default Todo;
