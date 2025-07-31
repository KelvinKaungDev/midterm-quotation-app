import React from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  IconButton,
  Box,
} from "@mui/material";

import { Clear, ShoppingCart, Delete } from "@mui/icons-material";

function QuotationTable({ data, deleteByIndex, clearAll }) {
  const hasData = data && data.length > 0;

  const totalDiscount = hasData
    ? data.reduce((acc, v) => acc + (parseFloat(v.discount) || 0), 0)
    : 0;

  const totalAmount = hasData
    ? data.reduce((acc, v) => {
        const qty = parseFloat(v.qty) || 0;
        const ppu = parseFloat(v.ppu) || 0;
        const discount = parseFloat(v.discount) || 0;
        return acc + (qty * ppu - discount);
      }, 0)
    : 0;

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ color: "black" }}>
          Quotation
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Clear />}
          onClick={clearAll}
          sx={{
            color: "red",
            borderColor: "red",
            "&:hover": {
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              borderColor: "red",
            },
          }}
        >
          Clear
        </Button>
      </Box>

      {!hasData ? (
        <Box display="flex" alignItems="center" gap={1}>
          <ShoppingCart />
          <Typography>No items</Typography>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              const qty = parseFloat(v.qty) || 0;
              const ppu = parseFloat(v.ppu) || 0;
              const discount = parseFloat(v.discount) || 0;
              const amount = qty * ppu - discount;

              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <IconButton onClick={() => deleteByIndex(i)} color="error" size="small">
                      <Delete />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{ppu.toFixed(2)}</TableCell>
                  <TableCell align="center">{discount.toFixed(2)}</TableCell>
                  <TableCell align="right">{amount.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} align="right">
                Total Discount
              </TableCell>
              <TableCell align="right">{totalDiscount.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                Total
              </TableCell>
              <TableCell align="right">{totalAmount.toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </Container>
  );
}

export default QuotationTable;
