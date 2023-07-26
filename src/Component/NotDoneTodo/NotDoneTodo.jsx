import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useDelete from '../Common/useDelete';
import useBoxChange from '../Common/useBoxChange';
import { getUserData, getUserNotDoneList, getUserTodo } from '../Action';
import { formatTimestamp } from '../Common/formatTimestamp';
import { AiOutlineDelete } from "react-icons/ai";
import { getUser, getUserTask } from '../ApiCalling/api';
import BackButton from '../Common/Button/BackButton';
import './NotDoneTodo.css'


const NotDoneTodo = () => {
  
  const dispatch = useDispatch()
  const [removeHandler] = useDelete();
  const [handleBoxChange] = useBoxChange();

  const notDoneList = useSelector((state) => state?.getDoneList?.notDoneList);
  const list = useSelector((state) => state.getUserTodo.list);


  //### this is just for example of using the persistedState
  // const persistedState = localStorage.getItem('reduxState')
  // ? JSON.parse(localStorage.getItem('reduxState'))
  // : null;
  // const notDoneList1 = persistedState?.getDoneList?.notDoneList;



  console.log(notDoneList, "NotDoneList");

  function handleBoxChang(ID) {
   const newList = notDoneList.filter((value) => {
     if (value.id == ID) {
       value.checked = !value.checked;
       value.time = Date.now();
     }
     return value;
   });

   dispatch(getUserNotDoneList(newList))
   
  handleBoxChange(ID);
 }


  function removeHandle(ID) {
   const newList = notDoneList.filter((value) => {
     if (value.id != ID) {
       return value;
     }
   });

   dispatch(getUserNotDoneList(newList))
   removeHandler(ID);
 }


 async function findNotDoneList() {
  const NotdoneList = await list.filter((value) => {
    if (value.time == "") {
      return value;
    }
  });

  dispatch(getUserNotDoneList(NotdoneList));
}


 
   // getTaskList
   function getlist(data) {
    dispatch(getUserTodo(data));
  }

  // getUserData
  function getData(data) {
    dispatch(getUserData(data));
  }


  // useEffect
   useEffect(() => {
    getUser(getData);
    getUserTask(getlist);

  }, []);

  useEffect(()=>{
    findNotDoneList()
  },[list])

  return (
    <div className="container-fluid" style={{ color: "black" , position:"relative"}}>
      <div className="row my-3">
        <h3 className="text-center">YOur not Done Work List..</h3>
        <h4 className="text-center">Total Not Done Work Is : {notDoneList.length}</h4>
      </div>
      <BackButton/>

      <div className="row justify-content-center" style={{height:"74vh"}}>
        <div className=" col-12 col-md-9 notDoneTodo" style={{height:"74vh", overflowY:"auto"}}>
          {
            notDoneList.length > 0 &&
            notDoneList.map((value, index) => {
              return (
                <div
                  key={"todo" + index}
                  className=" row border  mb-4  py-3 "
                  style={{ margin: "0px 10px", borderRadius: "12px", background:"#5fb2b5" , boxShadow:"2px 5px 13px rgba(0,0,0,0.2)"  }}
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
                        margin: "0px",  fontSize:"22px"
                      }}
                    >
                      {value.task}
                    </h5>
                    {value.checked ? (
                      <span style={{ color: "black", margin: "0px 0px", fontSize:"12px" }}>
                        {formatTimestamp(value?.time)}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className=" col-2 d-flex justify-content-around align-items-center">
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
                notDoneList.length==0 ? 

                <div className="row">
                    <h3 className="text-center">Your Done List is Empty..</h3>
                </div>
                : ""
            }



        </div>
      </div>
    </div>
  )
}

export default NotDoneTodo
