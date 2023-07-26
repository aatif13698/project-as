import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneTask, getUserTask } from "../ApiCalling/api";
import { getUserTodo } from "../Action";


const useDelete = () => {

    const dispatch = useDispatch();
    const userId = useSelector(
        (state) => state?.getUserData?.userData?.user?._id
      );

      
  const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : null;


  const userId1 = persistedState?.getUserData?.userData?.user?._id ;




    function removeHandler(ID) {
        const data = { userId: userId || userId1, taskId: ID };
    
        deleteOneTask(data, deleteCallBack);
      }
    
      function deleteCallBack() {
        getUserTask(getlist);
      }

      function getlist(data) {
        dispatch(getUserTodo(data));
      }

return [removeHandler]




}

export default useDelete;