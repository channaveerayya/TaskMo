import React from "react"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import moment from "moment"
import Button from "@material-ui/core/Button"
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
  btn: {
    ...theme.typography.btn1,
    fontSize: "0.9rem",
    height: 45,
    width: 145,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

export default function CustomizedTables({
  rowData,
  rowCell,
  onClick,
  profile = {},
  isAuthenticated,
}) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {rowCell.map((row, i) => (
              <StyledTableCell key={i}>{row}</StyledTableCell>
            ))}
            <StyledTableCell key="bb"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell>{row.description}</StyledTableCell>
              <StyledTableCell>{row.skills}</StyledTableCell>
              <StyledTableCell>
                {moment(row.expireDate).format("MMM Do YY")}
              </StyledTableCell>
              <StyledTableCell>{row.county}</StyledTableCell>
              <StyledTableCell>{row.city}</StyledTableCell>
              <StyledTableCell>{row.lat}</StyledTableCell>
              <StyledTableCell>{row.long}</StyledTableCell>
              <StyledTableCell>
                {isAuthenticated &&
                row.applied.filter((ap) => ap.user === (profile && profile._id))
                  .length ? (
                  <Button
                    onClick={(e) => {}}
                    variant="outlined"
                    className={classes.btn}
                    style={{ backgroundColor: "green" }}
                  >
                    <span style={{ marginRight: 10 }}>Applied </span>
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => {
                      onClick(row._id)
                    }}
                    disabled={!(Date.now() < new Date(row.expireDate))}
                    variant="outlined"
                    style={{
                      backgroundColor: !(Date.now() < new Date(row.expireDate))
                        ? "#E53A40"
                        : "inherit",
                    }}
                    className={classes.btn}
                  >
                    <span style={{ marginRight: 10 }}>
                      {Date.now() < new Date(row.expireDate)
                        ? "Apply"
                        : "Expired"}
                    </span>
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
