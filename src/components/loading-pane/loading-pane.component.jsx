import React from "react";
import "./loading-pane.css";
import { useState, useEffect } from "react";
import { PLACEHOLDER_LOADER_IMAGE } from "../../constants";

const LoadingPane = ({ loadingVisible, onLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoading();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`overlay ${loadingVisible ? "" : "hidden"}`}>
      <div className="loader">
        <img src={PLACEHOLDER_LOADER_IMAGE} alt="Loading" />
      </div>
    </div>
  );
};

export default LoadingPane;
