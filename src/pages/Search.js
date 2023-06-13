import React from "react";
import "../styles/Main.css";
import TableBody from "../components/TableBody";
import TableHead from "../components/TableHead";
import "../styles/Table.css";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

const Search = () => {
  const [tableData, setTableData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [images, setImages] = useState({});

  // const mockData =
  //   // '{ "data" : [' +
  //   // '{ "championName":"Nongshim RedForce" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
  //   // '{ "championName":"Gen.G" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
  //   // '{ "championName":"T1" , "wr":"0", "br":"0", "pr":"0", "presence":"0"},' +
  //   // '{ "championName":"Liiv SANDBOX" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
  //   // '{ "championName":"DWG KIA" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
  //   // '{ "championName":"KT Rolster" , "wr":"0", "br":"0", "pr":"0", "presence":"0"},' +
  //   // '{ "championName":"DRX" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
  //   // '{ "championName":"Kwangdong Freecs" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
  //   // '{ "championName":"Hanwha Life Esports" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
  //   // '{ "championName":"Fredit BRION" , "wr":"0", "br":"0", "pr":"0", "presence":"0"}]}';
  //   '{ "data" : [' +
  //   '{ "championName":"Akali" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
  //   '{ "championName":"Bel\'veth" , "wr":"60", "br":"10", "pr":"2", "presence":"12"},' +
  //   '{ "championName":"Wukong" , "wr":"23", "br":"11", "pr":"23", "presence":"34"},' +
  //   '{ "championName":"Vel\'koz" , "wr":"0", "br":"0", "pr":"0", "presence":"0"}]}';
  const columns = [
    { label: "Date", accessor: "match_date" },
    { label: "Winner", accessor: "winner_team" },
    { label: "Blue Team", accessor: "blue_team_name" },
    { label: "Pick Top", accessor: "pick_blue1" },
    { label: "Pick Jgl", accessor: "pick_blue2" },
    { label: "Pick Mid", accessor: "pick_blue3" },
    { label: "Pick Bot", accessor: "pick_blue4" },
    { label: "Pick Sup", accessor: "pick_blue5" },
    { label: "Ban 1", accessor: "ban_blue1" },
    { label: "Ban 2", accessor: "ban_blue2" },
    { label: "Ban 3", accessor: "ban_blue3" },
    { label: "Ban 4", accessor: "ban_blue4" },
    { label: "Ban 5", accessor: "ban_blue5" },
    { label: "Red Team", accessor: "red_team_name" },
    { label: "Pick Top", accessor: "pick_red1" },
    { label: "Pick Jgl", accessor: "pick_red2" },
    { label: "Pick Mid", accessor: "pick_red3" },
    { label: "Pick Bot", accessor: "pick_red4" },
    { label: "Pick Sup", accessor: "pick_red5" },
    { label: "Ban 1", accessor: "ban_red1" },
    { label: "Ban 2", accessor: "ban_red2" },
    { label: "Ban 3", accessor: "ban_red3" },
    { label: "Ban 4", accessor: "ban_red4" },
    { label: "Ban 5", accessor: "ban_red5" },
  ];

  useEffect(() => {
    const getData = () => {
      fetch("http://127.0.0.1:5000/alldata")
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
      require.context("../imgs", true, /\.(png|jpe?g|svg)$/)
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
        .filter(
          (data) =>
            data["match_date"].toLowerCase().includes(query.toLowerCase()) ||
            data["winner_team"].toLowerCase().includes(query.toLowerCase()) ||
            data["blue_team_name"]
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            data["red_team_name"].toLowerCase().includes(query.toLowerCase()) ||
            data["pick_blue1"].toLowerCase().includes(query.toLowerCase()) ||
            data["pick_blue2"].toLowerCase().includes(query.toLowerCase()) ||
            data["pick_blue3"].toLowerCase().includes(query.toLowerCase()) ||
            data["pick_blue4"].toLowerCase().includes(query.toLowerCase()) ||
            data["pick_blue5"].toLowerCase().includes(query.toLowerCase()) ||
            data["pick_red1"].toLowerCase().includes(query.toLowerCase()) ||
            data["pick_red2"].toLowerCase().includes(query.toLowerCase()) ||
            data["pick_red3"].toLowerCase().includes(query.toLowerCase()) ||
            data["pick_red4"].toLowerCase().includes(query.toLowerCase()) ||
            data["pick_red5"].toLowerCase().includes(query.toLowerCase()) ||
            data["ban_blue1"].toLowerCase().includes(query.toLowerCase()) ||
            data["ban_blue2"].toLowerCase().includes(query.toLowerCase()) ||
            data["ban_blue3"].toLowerCase().includes(query.toLowerCase()) ||
            data["ban_blue4"].toLowerCase().includes(query.toLowerCase()) ||
            data["ban_blue5"].toLowerCase().includes(query.toLowerCase()) ||
            data["ban_red1"].toLowerCase().includes(query.toLowerCase()) ||
            data["ban_red2"].toLowerCase().includes(query.toLowerCase()) ||
            data["ban_red3"].toLowerCase().includes(query.toLowerCase()) ||
            data["ban_red4"].toLowerCase().includes(query.toLowerCase()) ||
            data["ban_red5"].toLowerCase().includes(query.toLowerCase())
        )
        .map((data) => data);
      setTableData(filtered);
    }
  };

  return (
    <div className="main">
      <SearchBar handleSearch={handleSearch} searchQuery="all" />
      <table className="table">
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody columns={columns} tableData={tableData} images={images} />
      </table>
    </div>
  );
};

export default Search;
