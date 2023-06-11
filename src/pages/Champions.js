import React from "react";
import "../styles/Champions.css";
import TableBody from "../components/TableBody";
import TableHead from "../components/TableHead";
import "../styles/Table.css";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

const Champions = () => {
  const [tableData, setTableData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [images, setImages] = useState({});

  const mockData =
    '{ "data" : [' +
    '{ "championName":"Akali" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
    '{ "championName":"Darius" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
    '{ "championName":"Mordekaiser" , "wr":"0", "br":"0", "pr":"0", "presence":"0"}]}';

  const columns = [
    { label: "Champion", accessor: "championName" },
    { label: "Win Ratio", accessor: "wr" },
    { label: "Ban Ratio", accessor: "br" },
    { label: "Pick Ratio", accessor: "pr" },
    { label: "Total Presence", accessor: "presence" },
  ];

  useEffect(() => {
    const data = JSON.parse(mockData);
    setTableData(data.data);
    setInitialData(data.data);
    const importAll = (r) => {
      // let imgs = {};
      // return r.keys().map((item, index) => {
      //   images[item.replace("./", "")] = r(item);
      // });
      // return imgs;
      return r.keys().map(r);
    };
    const imgs = importAll(
      require.context("../imgs/champions", false, /\.(png|jpe?g|svg)$/)
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

export default Champions;
