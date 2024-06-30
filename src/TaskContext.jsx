import React, { createContext, useEffect, useState } from "react";

export const taskContext = createContext();

export const ContextProvider = ({ children }) => {
  const [taskgets, setTaskgets] = useState(false);
  const [deletmodalOpen, setDeletmodalOpen] = useState(false);
  const [delet, setDelet] = useState(false);
  const [todoModal, setTododModal] = useState(false);
  const [deletId, setDeletId] = useState("");
  const [editData, setEditdata] = useState({});
  const [isedit, setIsedit] = useState(false);
  const [addtogle, setAddtogle] = useState(false);
  return (
    <>
      <taskContext.Provider
        value={{
          taskgets,
          setTaskgets,
          deletmodalOpen,
          setDeletmodalOpen,
          delet,
          setDelet,
          deletId,
          setDeletId,
          todoModal,
          setTododModal,
          editData,
          setEditdata,
          isedit,
          setIsedit,
          addtogle,
          setAddtogle,
        }}
      >
        {children}
      </taskContext.Provider>
    </>
  );
};
