import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import useFetchTimeReport from "../../components/useFetchTimereports";
import { formatTime } from "../../components/functions/timeFormatter";

const columns = [
  { id: "projectName", label: "Project", minWidth: 200 },
  { id: "time", label: "Time Logged", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 170 },
];

export default function TimeReportHistory() {
  const { timereports, isLoading, error } = useFetchTimeReport(undefined, true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hoveredRow, setHoveredRow] = useState(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const rows = timereports.map((timereport, index) => {
    const projectId = timereport.id;
    const time = formatTime(timereport.properties.Hours.number);
    const date = timereport.properties.Date.date.start;
    const projectName =
      timereport.properties["Project Name"].rollup.array[0].title[0].text
        .content;
    const category = timereport?.properties?.Category?.select?.name;
    const note =
      timereport.properties?.Note?.title[0]?.text.content ||
      "No note available";

    return { projectId, projectName, time, date, category, note };
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} style={{ height: "100px" }}>
                  <TableCell
                    component="th"
                    scope="row"
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      width: columns[0].minWidth,
                      minWidth: "100%",
                      height: "100px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}>
                    <strong>{row.projectName}</strong>
                    <br />
                    {hoveredRow === index ? (
                      <Link to={`../timereport/edit/${row.projectId}`}>
                        <EditIcon style={{ fontSize: 22 }} />
                      </Link>
                    ) : (
                      <span
                        style={{
                          fontSize: 12,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                        {row.note}
                      </span>
                    )}
                  </TableCell>

                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.category}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Fragment>
  );
}
