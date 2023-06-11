import React from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import "../styles/Table.css";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const Table = (columns, data, searchQuery) => {
  const [tableData, setTableData] = useState([]);
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    const datas = JSON.parse(data);
    setTableData(datas.data);
    setInitialData(datas.data);
  }, [data]);

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
          data[searchQuery].toLowerCase().includes(query.toLowerCase())
        )
        .map((data) => data);
      setTableData(filtered);
    }
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
      <table className="table">
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody columns={columns} tableData={tableData} />
      </table>
    </>
  );
};

export default Table;
