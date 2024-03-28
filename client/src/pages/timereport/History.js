import { Fragment, useEffect, useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import useFetchTimeReport from "../../components/useFetchTimereports";
import { formatTime } from "../../components/functions/timeFormatter";
import { Stack, Typography } from "@mui/material";
import PageLoadingContext from "../../components/functions/PageLoadingContext";
import axios from "axios";
import AlertMessage from "../../components/AlertMessage";

export default function TimeReportHistory({ isAllHistory }) {
  const { timereports, isLoading, error } = useFetchTimeReport(
    undefined,
    isAllHistory ? false : true
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [updatedTimereports, setUpdatedTimereports] = useState(timereports);
  const [alertMessage, setAlertMessage] = useState({});

  useEffect(() => {
    setPage(0);
    setUpdatedTimereports(timereports);
  }, [isAllHistory, timereports]);

  if (isLoading) return <PageLoadingContext />;
  if (error) return <div>{error}</div>;

  let columns = [
    { id: "projectName", label: "Project", minWidth: 200 },
    { id: "time", label: "Time Logged", minWidth: 80 },
    { id: "category", label: "Category", minWidth: 120 },
    { id: "date", label: "Date", minWidth: 70 },
  ];

  if (isAllHistory) {
    columns = [
      { id: "projectName", label: "Project", minWidth: 200 },
      { id: "time", label: "Time Logged", minWidth: 80 },
      { id: "user", label: "By", minWidth: 150 },
      { id: "category", label: "Category", minWidth: 120 },
      { id: "date", label: "Date", minWidth: 70 },
    ];
  }

  const rows = updatedTimereports.map((timereport, index) => {
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

    const name = isAllHistory
      ? timereport.properties.Name.rollup.array[0].formula.string
      : "";

    return { projectId, projectName, time, date, category, note, name };
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function handleDelete(time_report_id) {
    try {
      const response = await axios.post("/api/timereport/delete", {
        time_report_id,
      });

      setUpdatedTimereports((prevTimereports) =>
        prevTimereports.filter((report) => report.id !== time_report_id)
      );
      const alertMessage = handleResponse(response.status);
      setAlertMessage(alertMessage);
    } catch (error) {}
  }

  const handleResponse = (status) => {
    if (status === 200) {
      return {
        severity: "success",
        message: "Your time report has been deleted!",
      };
    } else {
      return {
        severity: "error",
        message: "Oh no! Failed to delete time report!",
      };
    }
  };

  return (
    <Fragment>
      <AlertMessage
        open={!!alertMessage.message}
        message={alertMessage.message || ""}
        severity={alertMessage.severity || ""}
        onClose={() => setAlertMessage({})}
      />
      <Typography variant="h5" mb={2}>
        {isAllHistory ? "All Time Reports" : "Your Time Reports"}
      </Typography>
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
                    {!isAllHistory && hoveredRow === index ? (
                      <Stack direction="row">
                        <Link to={`../timereport/edit/${row.projectId}`}>
                          <EditIcon style={{ fontSize: 22 }} />
                        </Link>
                        <DeleteIcon
                          onClick={() => handleDelete(row.projectId)}
                          style={{ cursor: "pointer" }}></DeleteIcon>
                      </Stack>
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
                  {isAllHistory && <TableCell>{row.name}</TableCell>}
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.date}</TableCell>
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
