import React, { useState } from "react";
import Style from "./Addmodal.module.css";
import { addPeople } from "../../api/task";
const Addmodal = ({ setAddpplmodal }) => {
  const [people, setPeople] = useState("");
  const [isopen, setIsopen] = useState(false);
  const clickHandeler = async () => {
    if (!people) {
      return;
    }
    const data = await addPeople(people);
    if (data === 2) {
      console.log("Assign people already exist");
      return;
    }
    setIsopen(true);
  };
  const handeler = () => {
    setAddpplmodal(false);
  };
  return (
    <div className={Style.mainContainer}>
      <div className={Style.innerDiv}>
        {isopen ? (
          <div className={Style.innerfinal}>
            <p>{people} added to board</p>
            <button
              onClick={handeler}
              style={{
                color: "white",
                background: "rgba(23, 162, 184, 1)",
              }}
            >
              Okay,got it!
            </button>
          </div>
        ) : (
          <>
            <p>Add people to the board</p>
            <input
              value={people}
              type="text"
              placeholder="Enter the email"
              onChange={(e) => setPeople(e.target.value)}
            />
            <div className={Style.btnDiv}>
              <button
                onClick={() => setAddpplmodal(false)}
                style={{
                  color: "rgba(207, 54, 54, 1)",
                  border: "1px solid rgba(207, 54, 54, 1)",
                }}
              >
                cancel
              </button>
              <button
                onClick={clickHandeler}
                style={{
                  color: "white",
                  background: "rgba(23, 162, 184, 1)",
                }}
              >
                Add email
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Addmodal;
