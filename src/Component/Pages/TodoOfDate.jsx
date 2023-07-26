import React from "react";
import { formatTimestamp } from "../Common/formatTimestamp";
import { AiOutlineDelete } from "react-icons/ai";

const TodoOfDate = (props) => {
  const {
    listByDate,
    handleBoxChange,
    removeHandler,
    scrollRef,
    setListByDate,
  } = props;

  function handleBoxChang(ID) {
    const newList = listByDate.filter((value) => {
      if (value.id == ID) {
        value.checked = !value.checked;
        value.time = Date.now();
      }
      return value;
    });
    setListByDate(newList);
    handleBoxChange(ID);
  }

  function removeHandle(ID) {
    const newList = listByDate.filter((value) => {
      if (value.id != ID) {
        return value;
      }
    });
    setListByDate(newList);
    removeHandler(ID);
  }

  return (
    <div className="row justify-content-center">
      <div className=" col-12 col-md-9 listDivStyle">
        {listByDate &&
          listByDate.length > 0 &&
          listByDate.map((value, index) => {
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
          })}
      </div>
    </div>
  );
};

export default TodoOfDate;
