import { useState, useRef } from "react";
import {
  Container,
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";

import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const [selectedCode, setSelectedCode] = useState(products[0].code);
  const [ppu, setPpu] = useState(products[0].price);
  const [qty, setQty] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [dataItems, setDataItems] = useState([]);

  const handleProductChange = (event) => {
    const code = event.target.value;
    setSelectedCode(code);
    const product = products.find((p) => p.code === code);
    setPpu(product.price);
  };

  const addItem = () => {
    const product = products.find((p) => p.code === selectedCode);

    const newItem = {
      item: product.name,
      ppu: parseFloat(ppu),
      qty: parseInt(qty),
      discount: parseFloat(discount) || 0,
    };

    const existingIndex = dataItems.findIndex(
      (v) => v.item === newItem.item && parseFloat(v.ppu) === parseFloat(newItem.ppu)
    );

    if (existingIndex !== -1) {
      const updatedItems = [...dataItems];
      updatedItems[existingIndex].qty += newItem.qty;
      updatedItems[existingIndex].discount += newItem.discount;
      setDataItems(updatedItems);
    } else {
      setDataItems([...dataItems, newItem]);
    }
  };

  const deleteByIndex = (index) => {
    const newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const clearAll = () => {
    setDataItems([]);
  };

  return (
    <Container maxWidth={false} sx={{
      mt: 4,
      bgcolor: "#fff",
      minHeight: "100vh",
      pb: 4,width: "100%",

    }}>
      <Grid container spacing={3}>
        <Grid item xs={6} md={4}>
          <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="product-select-label">Item</InputLabel>
              <Select
                labelId="product-select-label"
                value={selectedCode}
                label="Item"
                onChange={handleProductChange}
              >
                {products.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Price Per Unit"
              type="number"
              fullWidth
              value={ppu}
              onChange={(e) => setPpu(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              sx={{ mb: 2 }}
              inputProps={{ min: 1 }}
            />

            <TextField
              label="Discount"
              type="number"
              fullWidth
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              sx={{ mb: 3 }}
              inputProps={{ min: 0 }}
            />

            <Button variant="contained" color="primary" fullWidth onClick={addItem}>
              Add
            </Button>
          </Box>
        </Grid>

        <Grid item xs={6} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
