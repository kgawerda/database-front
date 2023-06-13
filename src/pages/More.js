import React from "react";
import "../styles/Main.css";
import "../styles/Table.css";
import { useEffect, useState } from "react";

const More = () => {
  const [red, setRed] = useState(null);
  const [blue, setBlue] = useState(null);

  const mockData =
    // '{ "data" : [' +
    // '{ "championName":"Nongshim RedForce" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
    // '{ "championName":"Gen.G" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
    // '{ "championName":"T1" , "wr":"0", "br":"0", "pr":"0", "presence":"0"},' +
    // '{ "championName":"Liiv SANDBOX" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
    // '{ "championName":"DWG KIA" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
    // '{ "championName":"KT Rolster" , "wr":"0", "br":"0", "pr":"0", "presence":"0"},' +
    // '{ "championName":"DRX" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
    // '{ "championName":"Kwangdong Freecs" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
    // '{ "championName":"Hanwha Life Esports" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
    // '{ "championName":"Fredit BRION" , "wr":"0", "br":"0", "pr":"0", "presence":"0"}]}';
    `{ "data" : [{ "blue":"40" },{ "red":"60" }]}`;

  useEffect(() => {
    // const data = JSON.parse(mockData);
    // setRed(Object.values(data.data[1]));
    // setBlue(Object.values(data.data[0]));
    const getData = () => {
      fetch("http://127.0.0.1:5000/sidewinrate")
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setBlue(Object.values(myJson[0]));
          setRed(Object.values(myJson[1]));
        });
    };
    getData();
  }, []);

  return (
    <div className="main">
      <div className="wrapper">
        <div className="blue" style={{ width: `${blue}vw` }}>
          <span className="text-container">Blue Side Win Ratio: {blue}%</span>
        </div>
        <div className="red" style={{ width: `${red}vw` }}>
          <span className="text-container">Red Side Win Ratio: {red}%</span>
        </div>
      </div>
    </div>
  );
};

export default More;
