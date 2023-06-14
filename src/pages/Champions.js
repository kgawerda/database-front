import React from "react";
import "../styles/Main.css";
import TableBody from "../components/TableBody";
import TableHead from "../components/TableHead";
import "../styles/Table.css";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

const Champions = () => {
  const [tableData, setTableData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [images, setImages] = useState({});

  const columns = [
    { label: "Champion", accessor: "championName" },
    { label: "wins", accessor: "wins" },
    { label: "losses", accessor: "losses" },
    { label: "Win Ratio", accessor: "wr" },
    { label: "Bans", accessor: "bans" },
    { label: "Ban Ratio", accessor: "br" },
    { label: "Pick Ratio", accessor: "pr" },
    { label: "Total Presence", accessor: "presence" },
  ];

  useEffect(() => {
    const getData = () => {
      fetch("http://127.0.0.1:5000/champstats")
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setTableData(myJson);
          setInitialData(myJson);
        });
    };
    getData();

    const importAll = (r) => {
      return r.keys().map(r);
    };
    const imgs = importAll(
      require.context("../imgs/champions", false, /\.(png|jpe?g|svg)$/)
    );
    setImages(imgs);
  }, []);

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
