import React from "react";
import classes from "./Header.module.css";
import Lifelines from "../Lifelines/Lifelines";

const Header = ({ lifelineProps }) => {
  const {
    setFiftyFiftyUsed,
    setAskTheAudienceUsed,
    askTheAudienceUsed,
    fiftyFifyUsed,
    askAfriendUsed,
    setAskAfriendUsed
  } = lifelineProps;
  return (
    <>
      <div className={classes["heading-wrapper"]}>
        <Lifelines
          setFiftyFiftyUsed={setFiftyFiftyUsed}
          setAskTheAudienceUsed={setAskTheAudienceUsed}
          askTheAudienceUsed={askTheAudienceUsed}
          fiftyFiftyUsed={fiftyFifyUsed}
          askAfriendUsed={askAfriendUsed}
          setAskAfriendUsed={setAskAfriendUsed}
        />
        <div className={classes["heading"]}>Who Wants To Be a Millionaire?</div>
      </div>
    </>
  );
};

export default Header;
