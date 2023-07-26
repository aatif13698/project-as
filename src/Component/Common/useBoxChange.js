import { useDispatch, useSelector } from "react-redux";
import { checkedOneTask, getUserTask } from "../ApiCalling/api";
import { getUserTodo } from "../Action";




const useBoxChange = () => {

    const userId = useSelector(
        (state) => state?.getUserData?.userData?.user?._id
      );

    const store = useSelector((state)=> state)
         
  const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : null;


  const userId1 = persistedState?.getUserData?.userData?.user?._id ;

  console.log("userId1", userId1);
  console.log("userId", userId);
  console.log("store", store)

    const dispatch = useDispatch();




    function handleBoxChange(ID) {                                                                           
        const datas = {
          userId: userId || userId1 ,
          taskId: ID,
          time: Date.now(),
        };
        checkedOneTask(datas, checkedCallBack);
      }
    
      function checkedCallBack() {
        getUserTask(getlist);
      }


      function getlist(data) {
        dispatch(getUserTodo(data));
      }


      return [handleBoxChange]


}

export default  useBoxChange;
