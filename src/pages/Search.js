import React from "react";
import "../styles/Champions.css";
import TableBody from "../components/TableBody";
import TableHead from "../components/TableHead";
import "../styles/Table.css";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

const Search = () => {
  const [tableData, setTableData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [images, setImages] = useState({});

  const mockData =
    '"window": {' +
    '"title": "Sample Konfabulator Widget",' +
    '"name": "main_window",' +
    '"width": 500,' +
    '"height": 500}';

  const columns = [
    { label: "Champion", accessor: "window.title" },
    { label: "Win Ratio", accessor: "window.name" },
    // { label: "Ban Ratio", accessor: "championName.br" },
    // { label: "Pick Ratio", accessor: "championName.pr" },
    // { label: "Total Presence", accessor: "championName.presence" },
  ];

  useEffect(() => {
    console.log(mockData);
    const data = JSON.parse(mockData);
    console.log(data);
    setTableData(data.data);
    setInitialData(data.data);
    const importAll = (r) => {
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

export default Search;
