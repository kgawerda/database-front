import React from "react";
import "../styles/Champions.css";
import TableBody from "../components/TableBody";
import TableHead from "../components/TableHead";
import "../styles/Table.css";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

const Teams = () => {
  const [tableData, setTableData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [images, setImages] = useState({});

  const columns = [
    { label: "Team", accessor: "team_name" },
    { label: "Win Ratio", accessor: "win_ratio" },
    { label: "Top", accessor: "player_top" },
    { label: "Jungle", accessor: "player_jungle" },
    { label: "Mid", accessor: "player_mid" },
    { label: "Bottom", accessor: "player_bot" },
    { label: "Support", accessor: "player_support" },
  ];

  useEffect(() => {
    const getData = () => {
      fetch("http://127.0.0.1:5000/teamstats")
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
      require.context("../imgs/teams", false, /\.(png|jpe?g|svg)$/)
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
      <SearchBar handleSearch={handleSearch} searchQuery="team_name" />
      <table className="table">
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody columns={columns} tableData={tableData} images={images} />
      </table>
    </div>
  );
};

export default Teams;
