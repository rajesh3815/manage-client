import React, { useContext, useEffect, useState } from "react";
import Style from "./Board.module.css";
import people from "../../assets/people.svg";
import collapse from "../../assets/codicon_collapse-all.svg";
import Addmodal from "../addpeoplemodal/Addmodal";
import Addtodo from "../addtodo/Addtodo";
import { getAlltasks, getFilterAlltasks } from "../../api/task";
import Card from "../taskcard/Card";
import Backcard from "../backlogcard/Backcard";
import Progcard from "../progresscard/Progcard";
import Donecard from "../donecard/Donecard";
import darrow from "../../assets/downarrow.svg";
import { taskContext } from "../../TaskContext";
const options = ["Today", "This week", "This month"];
const Board = () => {
  const { taskgets, delet, todoModal, setTododModal, isedit, addtogle } =
    useContext(taskContext);
  const [selectedOption, setSelectedOption] = useState("This week");
  const [isOpen, setIsOpen] = useState(false);
  const [addpplmodal, setAddpplmodal] = useState(false);
  const [addtodoform, setAddtodoform] = useState(false);
  const [collBacklog, setCollBacklog] = useState(false);
  const [colltodo, setColltodo] = useState(false);
  const [collProgress, setCollProgress] = useState(false);
  const [collDone, setCollDone] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTaskAll();
  }, [taskgets, selectedOption, delet, isedit, addtogle]);
  //getting all tasks through api call
  const getTaskAll = async () => {
    const data = await getFilterAlltasks(selectedOption);
    setTasks(data.tasks);
  };

  const formatDate = () => {
    const newDate = new Date();

    const day = newDate.getDate();
    const month = newDate.toLocaleString("en-US", { month: "short" });
    const year = newDate.getFullYear();

    const getDayWithSuffix = (day) => {
      if (day > 3 && day < 21) return `${day}th`;
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    const dayWithSuffix = getDayWithSuffix(day);

    return `${dayWithSuffix} ${month}, ${year}`;
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const collapseHandler = () => {
    setCollapseAll(!collapseAll);
  };
  return (
    <>
      <div className={Style.mainContainer}>
        <div className={Style.header}>
          <div className={Style.heroLeft}>
            <p>Welcome {localStorage.getItem("UserName")}</p>
            <div className={Style.addPpl}>
              <p>Board</p>{" "}
              <span onClick={() => setAddpplmodal(true)}>
                <img src={people} alt="" />
                Add People
              </span>
            </div>
          </div>
          <div className={Style.heroRight}>
            <p>{formatDate()}</p>
            <div className={Style.dropdown}>
              <div  className={Style.dropdownButton}>
                {selectedOption}{" "}
                <span
                  onClick={() => setIsOpen(!isOpen)}
                  className={Style.arrow}
                >
                  {isOpen ? (
                    <img src={darrow} alt="" />
                  ) : (
                    <img src={darrow} alt="" />
                  )}
                </span>
              </div>
              {isOpen && (
                <ul className={Style.dropdownMenu}>
                  {options.map((option) => (
                    <li key={option} onClick={() => handleOptionClick(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={Style.content}>
          {/* backlog section */}
          <div className={Style.backlogDiv}>
            <div style={{ marginBottom: "10px" }} className={Style.inner}>
              <p>Backlog</p>{" "}
              <span
                onClick={() => {
                  setCollBacklog(!collBacklog);
                }}
              >
                <img src={collapse} alt="" />
              </span>
            </div>
            <div className={Style.cardContainer}>
              {tasks?.map((task, index) => {
                return (
                  <div key={task._id}>
                    {task.todoStatus === "backlog" && (
                      <Backcard task={task} collapseAll={collBacklog} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* todoDiv section */}
          <div className={Style.todoDiv}>
            <div className={Style.inner}>
              <p>To do</p>{" "}
              <span style={{ display: "flex" }}>
                <span
                  onClick={() => setTododModal(true)}
                  className={Style.plus}
                >
                  +
                </span>
                <img
                  onClick={() => {
                    setColltodo(!colltodo);
                  }}
                  src={collapse}
                  alt=""
                />
              </span>
            </div>
            <div className={Style.cardContainer}>
              {tasks?.map((task, index) => {
                return (
                  <div key={task._id}>
                    {task.todoStatus === "todo" && (
                      <Card task={task} collapseAll={colltodo} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* progressDiv section */}
          <div className={Style.progressDiv}>
            <div style={{ marginBottom: "10px" }} className={Style.inner}>
              <p>In progress</p>{" "}
              <span
                onClick={() => {
                  setCollProgress(!collProgress);
                }}
              >
                <img src={collapse} alt="" />
              </span>
            </div>
            <div className={Style.cardContainer}>
              {tasks?.map((task, index) => {
                return (
                  <div key={task._id}>
                    {task.todoStatus === "progress" && (
                      <Progcard task={task} collapseAll={collProgress} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* done section */}
          <div className={Style.doneDiv}>
            <div style={{ marginBottom: "10px" }} className={Style.inner}>
              <p>Done</p>{" "}
              <span
                onClick={() => {
                  setCollDone(!collDone);
                }}
              >
                <img src={collapse} alt="" />
              </span>
            </div>
            <div className={Style.cardContainer}>
              {tasks?.map((task, index) => {
                return (
                  <div key={task._id}>
                    {task.todoStatus === "done" && (
                      <Donecard task={task} collapseAll={collDone} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {addpplmodal ? <Addmodal setAddpplmodal={setAddpplmodal} /> : ""}
      {todoModal ? <Addtodo /> : ""}
    </>
  );
};

export default Board;
