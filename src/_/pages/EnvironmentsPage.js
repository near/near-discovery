import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import PagesContainer from "../components/PagesContainer";
import { EditorContext } from "../context/EditorContext";
import { ThemeContext } from "../context/ThemeContext";
import camelToNormal from "../libs/camelToNormal";

export default function EnvironmentsPage(props) {
  const { NetworkId, Widgets } = useContext(EditorContext);
  const { theme } = useContext(ThemeContext);

  return (
    <PagesContainer {...props}>
      <Box sx={{ py: 0, px: 2 }}>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: theme.ui2,
            borderRadius: "4px",
            mt: 2,
            boxShadow: "none",
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 2 }}>
            <Typography
              variant="h4"
              fontWeight={500}
              sx={{ color: theme.textColor }}
            >
              {camelToNormal(NetworkId)}
            </Typography>
          </Box>

          <Divider />

          <Table sx={{ minWidth: 580 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: theme.textColor,
                    borderColor: theme.borderColor,
                  }}
                >
                  Widget
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: theme.textColor,
                    borderColor: theme.borderColor,
                  }}
                >
                  Link
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(Widgets)?.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      color: theme.textColor2,
                      borderColor: theme.borderColor,
                    }}
                  >
                    {camelToNormal(row[0] || "")}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      color: theme.textColor,
                      borderColor: theme.borderColor,
                    }}
                  >
                    {row[1]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </PagesContainer>
  );
}
