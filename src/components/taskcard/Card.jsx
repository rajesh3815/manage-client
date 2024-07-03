import React, { useContext, useEffect, useState } from "react";
import Style from "./Card.module.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import up from "../../assets/aup.svg";
import down from "../../assets/adw.svg";
import { taskContext } from "../../TaskContext";
import { editCheck, editTask } from "../../api/task";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Card = ({ task, collapseAll }) => {
  const {
    taskgets,
    setTaskgets,
    setDeletmodalOpen,
    setDeletId,
    setTododModal,
    setEditdata,
    isedit,
    setIsedit,
  } = useContext(taskContext);
  const [dotOpen, setDotOpen] = useState(false);
  const [arrowOpen, setArrowOpen] = useState(false);
  useEffect(() => {
    setArrowOpen(false);
  }, [collapseAll]);

  //formating date
  function formatDate(dateString) {
    if (!dateString) return;
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);

    const day = date.getDate();
    let suffix;

    if (day >= 11 && day <= 13) {
      suffix = "th";
    } else {
      switch (day % 10) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
        default:
          suffix = "th";
      }
    }

    return formattedDate.replace(/\d+/, day + suffix);
  }
  function dateColor(dateString) {
    const dewDate = new Date(dateString).getDate();
    const curDt = new Date().getDate();
    if (!dewDate) return false;
    return dewDate < curDt;
  }
  //---------------
  const clickHandeler = async (status, id) => {
    const data = await editTask(status, id);
    setTaskgets(!taskgets);
  };

  //handle delete
  const deletHandeler = (id) => {
    setDeletId(id);
    setDeletmodalOpen(true);
    setDotOpen(false);
  };

  const shareHandeler = async (id) => {
    const baseUrl = `${window.location.protocol}//${window.location.host}/task/${id}`;
    try {
      await navigator.clipboard.writeText(baseUrl);
      toast.success("link copied", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.log(baseUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const editHandeler = (task) => {
    setEditdata(task);
    setTododModal(true);
    setDotOpen(false);
  };
  const handleCheck = async (id, idx) => {
    
    await editCheck(idx, id);
    setIsedit(!isedit);
  };
  const checkedCount = task?.tasks?.filter((tasks) => tasks?.checked)?.length;
  return (
    <div className={Style.container}>
      <div className={Style.head}>
        <div className={Style.leftSpan}>
          <div className={Style.prioritys}>
            <div
              className={`${Style.circle} ${
                task?.priority === "HIGH PRIORITY"
                  ? Style.red
                  : task?.priority === "MODERATE PRIORITY"
                  ? Style.sky
                  : Style.green
              } ${Style.prioritySpan}`}
            ></div>
            <span>{task?.priority}</span>
          </div>
          {task?.assignto && (
            <span title={task?.assignto} className={Style.assignSpan}>
              {task?.assignto.slice(0, 2)}
            </span>
          )}
        </div>

        <span onClick={() => setDotOpen(!dotOpen)}>
          <HiOutlineDotsHorizontal />
        </span>
        {dotOpen ? (
          <div className={Style.popup}>
            <ul>
              <li onClick={() => editHandeler(task)}>Edit</li>
              <li onClick={() => shareHandeler(task._id)}>Share</li>
              <li
                onClick={() => deletHandeler(task._id)}
                style={{ color: "red" }}
              >
                Delete
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <p title={task.taskName} className={Style.taskTitle}>
        {task.taskName.slice(0, 30)}
        {task.taskName.length > 30 ? "..." : ""}
      </p>
      <div className={Style.checkList}>
        <div className={Style.checkListHero}>
          <p>
            Checklist ({checkedCount}/{task?.tasks?.length})
          </p>
          <span onClick={() => setArrowOpen(!arrowOpen)}>
            {arrowOpen ? <img src={up}></img> : <img src={down}></img>}
          </span>
        </div>
        {arrowOpen
          ? task?.tasks?.map((todo, index) => {
              return (
                <div key={todo.id} className={Style.task}>
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => handleCheck(task._id, index)}
                  />
                  <p>{todo.text}</p>
                </div>
              );
            })
          : ""}
        <div className={Style.bthDiv}>
          {task?.createdDt ? (
            <span
              style={{
                background: dateColor(task?.createdDt)
                  ? "rgba(207, 54, 54, 1)"
                  : "rgba(238, 236, 236, 1)",
                color: dateColor(task?.createdDt)
                  ? "white"
                  : "rgba(118, 117, 117, 1)",
              }}
            >
              {formatDate(task?.createdDt)}
            </span>
          ) : (
            <div></div>
          )}

          <div className={Style.btns}>
            <button onClick={() => clickHandeler("backlog", task._id)}>
              Backlog
            </button>
            <button onClick={() => clickHandeler("progress", task._id)}>
              progress
            </button>
            <button onClick={() => clickHandeler("done", task._id)}>
              Done
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Card;
