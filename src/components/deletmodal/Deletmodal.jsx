import React, { useContext } from "react";
import Style from "./Deletmdal.module.css";
import { taskContext } from "../../TaskContext";
import { deletTasks } from "../../api/task";
const Deletmodal = () => {
  const { setDeletmodalOpen, delet, setDelet, deletId } =
    useContext(taskContext);
  const deletHandeler = async () => {
    await deletTasks(deletId);
    setDeletmodalOpen(false);
    setDelet(!delet);
  };
  return (
    <div className={Style.mainContainer}>
      <div className={Style.innerDiv}>
        <p>Are you sure you want to Delete?</p>
        <button
          onClick={deletHandeler}
          style={{
            color: "white",
            background: "rgba(23, 162, 184, 1)",
            marginBottom: "1rem",
          }}
        >
          yes, Delet
        </button>
        <button
          onClick={() => setDeletmodalOpen(false)}
          style={{
            color: "rgba(207, 54, 54, 1)",
            border: "1px solid rgba(207, 54, 54, 1)",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Deletmodal;
