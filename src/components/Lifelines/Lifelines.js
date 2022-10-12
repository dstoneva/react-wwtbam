import React from "react";
import classes from "./Lifelines.module.css";
import Lifeline from "./Lifeline";
const Lifelines = ({
  fiftyFiftyUsed,
  setFiftyFiftyUsed,
  setAskTheAudienceUsed,
  askTheAudienceUsed,
  askAfriendUsed,
  setAskAfriendUsed
}) => {
  return (
    <div className={classes["lifelines"]}>
      <Lifeline setUsed={setFiftyFiftyUsed} used={fiftyFiftyUsed} name={"50/50"} />
      <Lifeline setUsed={setAskAfriendUsed} used={askAfriendUsed} name={"Call a friend"}/>
      <Lifeline setUsed={setAskTheAudienceUsed} used={askTheAudienceUsed} name={"Ask the audience"}></Lifeline>
    </div>
  );
};

export default Lifelines;
