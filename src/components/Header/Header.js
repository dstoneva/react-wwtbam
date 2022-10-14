import React from "react";
import classes from "./Header.module.css";
import Lifelines from "../Lifelines/Lifelines";

const Header = ({ lifelineProps }) => {
  const { setFiftyFiftyUsed, setAskTheAudienceUsed, setAskAfriendUsed } = lifelineProps;
  return (
    <>
      <div className={classes["heading-wrapper"]}>
        <Lifelines
          setFiftyFiftyUsed={setFiftyFiftyUsed}
          setAskTheAudienceUsed={setAskTheAudienceUsed}
          setAskAfriendUsed={setAskAfriendUsed}
        />
        <div className={classes["heading"]}>Who Wants To Be a Millionaire?</div>
      </div>
    </>
  );
};

export default Header;
