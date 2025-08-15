import React from 'react';
import { Card, CardContent, CardMedia, Chip, Grid, Typography, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const products = [
  {
    id: 1,
    name: 'Recycled Leather',
    description: 'High quality leather from industrial waste',
    price: '$45/kg',
    category: 'Material',
    image: 'https://example.com/leather.jpg'
  },
  {
    id: 2,
    name: 'Upcycled Furniture',
    description: 'Chair made from reclaimed wood',
    price: '$120',
    category: 'Product',
    image: 'https://example.com/furniture.jpg'
  }
];

const Marketplace = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recycled Marketplace</h2>
        <div className="flex space-x-2">
          <Button variant="outlined">Filter</Button>
          <Button variant="contained" startIcon={<ShoppingCart />}>
            My Cart
          </Button>
        </div>
      </div>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card className="h-full flex flex-col">
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent className="flex-grow">
                <div className="flex justify-between items-start">
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Chip label={product.category} color="primary" size="small" />
                </div>
                <Typography variant="body2" color="text.secondary" className="mb-3">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" className="mb-3">
                  {product.price}
                </Typography>
                <Button fullWidth variant="contained" size="small">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Marketplace;