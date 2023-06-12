const TableBody = ({ tableData, columns, images }) => {
  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }) => {
              const contains = (string) => {
                const str = string.split(".")[0];
                return str.includes(data[accessor]);
              };
              const tData = data[accessor];
              return (
                <>
                  {" "}
                  {accessor === "championName" || accessor === "team_name" ? (
                    <td key={accessor}>
                      <div className="icon-container">
                        <div
                          className="icon"
                          style={{
                            backgroundImage: `url(${
                              images[images.findIndex(contains)]
                            })`,
                          }}
                        ></div>
                        <div>{tData}</div>
                      </div>
                    </td>
                  ) : (
                    <td key={accessor}>{tData}</td>
                  )}
                </>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
