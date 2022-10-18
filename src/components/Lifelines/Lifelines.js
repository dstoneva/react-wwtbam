import React from "react";
import classes from "./Lifelines.module.css";
import Lifeline from "./Lifeline";
const Lifelines = ({ setFiftyFiftyUsed, setAskTheAudienceUsed, setAskAfriendUsed }) => {
  return (
    <div className={classes["lifelines"]}>
      <Lifeline setUsed={setAskAfriendUsed} name={"Call a friend"} />
      <Lifeline setUsed={setFiftyFiftyUsed} name={"50/50"} />
      <Lifeline setUsed={setAskTheAudienceUsed} name={"Ask the audience"}></Lifeline>
    </div>
  );
};

export default Lifelines;
