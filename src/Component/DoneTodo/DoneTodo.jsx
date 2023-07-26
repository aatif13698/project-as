import React, { useEffect } from "react";
import { formatTimestamp } from "../Common/formatTimestamp";
import { AiOutlineDelete } from "react-icons/ai";
import useDelete from "../Common/useDelete";
import useBoxChange from "../Common/useBoxChange";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, getUserDoneList, getUserTodo } from "../Action";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser, getUserTask } from "../ApiCalling/api";
import BackButton from "../Common/Button/BackButton";
import './DoneTodo.css'


const DoneTodo = () => {
   
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [removeHandler] = useDelete();
   const [handleBoxChange] = useBoxChange();

   const doneList = useSelector((state) => state?.getDoneList?.doneList);
   const list = useSelector((state) => state.getUserTodo.list);
   

   
  const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : null;


  const doneList1 = persistedState?.getDoneList?.doneList;

  // console.log(doneList1,"doneList1");



  // console.log(persistedState, "persistedState");


  //  console.log(doneList, "doneList");

   function handleBoxChang(ID) {
    const newList = doneList.filter((value) => {
      if (value.id == ID) {
        value.checked = !value.checked;
        value.time = Date.now();
      }
      return value;
    });

    dispatch(getUserDoneList(newList))
    
   handleBoxChange(ID);
  }


   function removeHandle(ID) {
    const newList = doneList.filter((value) => {
      if (value.id != ID) {
        return value;
      }
    });

    dispatch(getUserDoneList(newList))
   
    removeHandler(ID);
  }



  async  function findDoneList(){
    const doneList =  await  list.filter((value)=>{
      if(value.time){
        return value
      }
    })
    dispatch(getUserDoneList(doneList))
  }

   // getTaskList

   function getlist(data) {
    dispatch(getUserTodo(data));
  }

  // getUserData

  function getData(data) {
    dispatch(getUserData(data));
  }



   useEffect(() => {
    getUser(getData);
    getUserTask(getlist);

  }, []);

 

  useEffect(()=>{
    findDoneList()
  },[list])

  return (
    <div className="container-fluid" style={{ color: "black", position:"relative" }}>
      <div className="row my-3">
        <h3 className="text-center">Here is Your Done Work List</h3>
        <h4 className="text-center">Total Done Work Is : {doneList.length}</h4>
      </div>

      <BackButton/>
     

      <div className="row justify-content-center" style={{height:"74vh"}}>
        <div className=" col-12 col-md-9 todoDoneStyle" style={{height:"100%", overflowY:"auto"}}>
          {
            doneList.length > 0 ?
            doneList.map((value, index) => {
              return (
                <div
                  key={"todo" + index}
                  className=" row border  mb-4  py-3 "
                  style={{ margin: "0px 10px", borderRadius: "12px", background:"#5fb2b5", boxShadow:"2px 5px 13px rgba(0,0,0,0.2)" }}
                  // ref={scrollRef}
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
                      onChange={() => handleBoxChang(value.id)}
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
                        margin: "0px",  fontSize:"22px" ,  margin: "0px 5px",
                      }}
                    >
                      {value.task}
                    </h5>
                    {value.checked ? (
                      <span style={{ color: "black", margin: "0px 0px" , fontSize:"12px"}}>
                        {formatTimestamp(value?.time)}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className=" col-2 d-flex justify-content-end align-items-center">
                    <span>
                      <AiOutlineDelete
                        style={{ color: "red", fontSize: "1.5rem" }}
                        onClick={() => removeHandle(value.id)}
                      /> 
                    </span>
                  </div>
                </div>
              );
            })


            : 


            doneList1.map((value, index) => {
                return (
                  <div
                    key={"todo" + index}
                    className=" row border shadow-lg mb-4  py-3 "
                    style={{ margin: "0px 10px", borderRadius: "12px" }}
                    // ref={scrollRef}
                  >
                    <div
                      className={`d-flex col-9 d-flex  align-items-center ${
                        value.checked
                          ? "justify-content-between"
                          : "justify-content-start"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={value.checked}
                        onChange={() => handleBoxChang(value.id)}
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                          // Add more styles here
                          backgroundColor: value.checked
                            ? "rgb(35 235 70)"
                            : "white", // Change box background color based on checked state
                          border: "2px solid rgb(57 190 25)", // Add border to the checkbox
                          borderRadius: "4px", // Round the corners
                          appearance: "none", // Hide the default checkbox appearance
                          outline: "none", // Remove the focus outline
                        }}
                      />
                      <h5
                        style={{
                          color: value.checked ? "rgb(35 235 70)" : "white",
                          margin: "0px",
                        }}
                      >
                        {value.task}
                      </h5>
                      {value.checked ? (
                        <span style={{ color: "white", margin: "0px 8px" }}>
                          {formatTimestamp(value?.time)}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className=" col-3 d-flex justify-content-around align-items-center">
                      <span>
                        <AiOutlineDelete
                          style={{ color: "red", fontSize: "1.5rem" }}
                          onClick={() => removeHandle(value.id)}
                        />
                      </span>
                    </div>
                  </div>
                );
              })
  


        
        
        }


            {
                doneList.length==0  && doneList1.length == 0? 

                <div className="row">
                    <h3 className="text-center">Your Done List is Empty..</h3>
                </div>
                : ""
            }



        </div>
      </div>
      <Outlet/>
    </div>

  );
};

export default DoneTodo;
