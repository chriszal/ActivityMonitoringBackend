import React from "react";
import ButtonCard from "../Card/ButtonCard";
import Cards from "../Cards/Cards";
import StudiesTable from "../Tables/StudiesTable";
import {UilPlus} from "@iconscout/react-unicons";
import "./MainDash.css";
const MainDash = ({ selectedTab }) => {
  const color = {
    backGround: "linear-gradient(#27ddda, #27ddda)",
    boxShadow: "0px 10px 20px 0px #27ddda",
  };
  return (
    <div className="MainDash">
      {/* <h1>Dashboard</h1> */}
      {selectedTab === "users" ? (
            <Cards  />
          ) :(
            <>
            <ButtonCard title="Add New Study" icon={UilPlus}
            color={color}/>
            <StudiesTable />
            </>
          )
        }
    </div>
  );
};

export default MainDash;
