import React, { useEffect, useState } from "react";
import Style from "./Task.module.css";
import { getTaskbyid } from "../../api/task";
import { useParams } from "react-router-dom";
import logo from "../../assets/codesandbox.svg";
const Task = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  useEffect(() => {
    getTaskBy();
  }, []);
  const getTaskBy = async () => {
    const data = await getTaskbyid(id);
    setTask(data.task);
  };
  useEffect(() => {
    getTask();
  }, []);
  const getTask = async () => {
    const taskData = await getTaskbyid(id);
    setTask(taskData.task);
  };
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
  return (
    <div className={Style.main}>
      <div className={Style.header}>
        <img src={logo} alt="" />
        <p>Pro Manage</p>
      </div>
      <div className={Style.contenet}>
        <div className={Style.hero}>
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
          <p className={Style.taskNam}>{task.taskName}</p>
        </div>
        <p className={Style.checkListsp}>Checklist(1/12)</p>
        <div className={Style.checkLists}>
          {" "}
          <div className={Style.lists}>
            {task?.tasks?.map((todo, index) => {
              return (
                <div key={todo.id} className={Style.task}>
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    disabled
                    // onChange={() => handleCheck(task.id)}
                  />
                  <p>{todo.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className={Style.date}>
            {task?.createdDt ? (
              <>
                <span>Due Date</span>
                <span className={Style.dt}>{formatDate(task.createdDt)}</span>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
