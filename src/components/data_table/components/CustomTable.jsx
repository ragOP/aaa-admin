import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const CustomTable = ({ tableSx, data, tableHeaderList, rowData, onClick }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        ...tableSx,
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ border: 0 }}>
            {tableHeaderList?.length > 0 &&
              tableHeaderList.map((header) => (
                <TableCell
                  sx={{
                    backgroundColor: "#fff",
                    border: 0,
                    padding: "1rem 1rem 0.5rem 1rem",
                  }}
                  key={header.value}
                  align={header.align}
                >
                  <Typography sx={{ color: "rgba(85, 87, 112, 0.80)" }}>
                    {header.label}
                  </Typography>
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 &&
            data.map((row, index) => (
              <TableRow
                key={index}
                onClick={(e) => onClick(e, row)}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  borderBottom: `1px solid "#f5f6f7"`,
                  cursor: "pointer",
                  transition: "0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f5f6f7",
                  },
                }}
              >
                {tableHeaderList?.length > 0 &&
                  tableHeaderList.map((header) => (
                    <TableCell
                      key={header.value}
                      component="th"
                      scope="row"
                      align={header.align}
                    >
                      {rowData?.[header?.value]
                        ? rowData[header?.value](row)
                        : null}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
