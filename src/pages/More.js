import React from "react";
import "../styles/Champions.css";
import TableBody from "../components/TableBody";
import TableHead from "../components/TableHead";
import "../styles/Table.css";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

const More = () => {
  const [tableData, setTableData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [images, setImages] = useState({});

  const mockData =
    '{ "data" : [' +
    '{ "championName":"Nongshim RedForce" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
    '{ "championName":"Gen.G" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
    '{ "championName":"T1" , "wr":"0", "br":"0", "pr":"0", "presence":"0"},' +
    '{ "championName":"Liiv SANDBOX" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
    '{ "championName":"DWG KIA" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
    '{ "championName":"KT Rolster" , "wr":"0", "br":"0", "pr":"0", "presence":"0"},' +
    '{ "championName":"DRX" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
    '{ "championName":"Kwangdong Freecs" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
    '{ "championName":"Hanwha Life Esports" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
    '{ "championName":"Fredit BRION" , "wr":"0", "br":"0", "pr":"0", "presence":"0"}]}';
  // '{ "data" : [' +
  // '{ "championName":"Akali" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
  // '{ "championName":"Bel\'veth" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
  // '{ "championName":"Wukong" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
  // '{ "championName":"Vel\'koz" , "wr":"0", "br":"0", "pr":"0", "presence":"0"}]}';
  const columns = [
    { label: "Champion", accessor: "championName" },
    { label: "Win Ratio", accessor: "wr" },
    { label: "Ban Ratio", accessor: "br" },
    { label: "Pick Ratio", accessor: "pr" },
    { label: "Total Presence", accessor: "presence" },
  ];

  useEffect(() => {
    console.log(mockData);
    const data = JSON.parse(mockData);
    setTableData(data.data);
    setInitialData(data.data);
    const importAll = (r) => {
      return r.keys().map(r);
    };
    const imgs = importAll(
      require.context("../imgs/teams", false, /\.(png|jpe?g|svg)$/)
    );
    setImages(imgs);
  }, [mockData]);

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  const handleSearch = (query) => {
    if (query === "") {
      setTableData(initialData);
    } else {
      const filtered = initialData
        .filter((data) =>
          data["championName"].toLowerCase().includes(query.toLowerCase())
        )
        .map((data) => data);
      setTableData(filtered);
    }
  };

  return (
    <div className="main">
      <SearchBar handleSearch={handleSearch} searchQuery="Champion" />
      <table className="table">
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody columns={columns} tableData={tableData} images={images} />
      </table>
    </div>
  );
};

export default More;
