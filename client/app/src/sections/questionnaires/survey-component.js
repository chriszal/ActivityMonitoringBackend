import React, { useState, useEffect } from "react";
import * as SurveyCreator from "survey-creator";
import "survey-creator/survey-creator.css";

const SurveyComponent = () => {
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const surveyCreator = new SurveyCreator.SurveyCreator();
    surveyCreator.saveSurveyFunc = (savedNo, callback) => {
      // Here you can save the survey JSON to your database or server
      console.log("Survey saved:", surveyCreator.text);
      callback(savedNo, true);
    };
    setCreator(surveyCreator);
  }, []);

  return (
    <div id="surveyCreatorContainer">
      {creator && creator.render("surveyCreatorContainer")}
    </div>
  );
};

export default SurveyComponent;
