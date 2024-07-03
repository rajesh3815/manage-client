import React, { useEffect, useState } from "react";
import Style from "./Analytics.module.css";
import { getAnalytics } from "../../api/task";
const Analytics = () => {
  const [analysis, setAnalysis] = useState({});
  useEffect(() => {
    getallAnalytics();
  }, []);
  const getallAnalytics = async () => {
    const analyticsData = await getAnalytics();
    setAnalysis(analyticsData.analytics);
  };

  return (
    <div className={Style.main}>
      <p>Analytics</p>
      <div className={Style.innerContent}>
        <div className={Style.leftDiv}>
          <ul>
            <div className={Style.listDiv}>
              <li>Backlog Tasks</li>
              <span>{analysis.backlog}</span>
            </div>

            <div className={Style.listDiv}>
              <li>To-do Tasks</li>
              <span>{analysis.todo}</span>
            </div>

            <div className={Style.listDiv}>
              <li>In-Progress Tasks</li>
              <span>{analysis.inProgress}</span>
            </div>
            <div className={Style.listDiv}>
              <li>Completed Tasks</li>
              <span>{analysis.done}</span>
            </div>
          </ul>
        </div>
        <div className={Style.rightDiv}>
          <ul>
            <div className={Style.listDiv}>
              <li>Low Priority</li>
              <span>{analysis.lowPriority}</span>
            </div>
            <div className={Style.listDiv}>
              <li>Moderate Priority</li>
              <span>{analysis.moderatePriority}</span>
            </div>
            <div className={Style.listDiv}>
              <li>High Priority</li>
              <span>{analysis.highPriority}</span>
            </div>
            <div className={Style.listDiv}>
              <li>Due Date Tasks</li>
              <span>{analysis.deuDat}</span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
