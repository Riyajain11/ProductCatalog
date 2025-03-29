import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Rating,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import { useState } from 'react';

export function ProductDetail({ product, open, onClose }) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return null;

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h6" component="div">
          Product Details
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 1,
                boxShadow: 1
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h4" color="primary" gutterBottom>
                ${product.price}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating 
                  value={product.rating} 
                  precision={0.1} 
                  readOnly 
                  sx={{ color: 'warning.main' }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.rating})
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip 
                label={product.category} 
                sx={{ bgcolor: 'primary.light', color: 'white' }}
              />
              <Chip 
                label={product.brand} 
                sx={{ bgcolor: 'secondary.light', color: 'white' }}
              />
              <Chip 
                label={product.stock > 0 ? 'In Stock' : 'Out of Stock'} 
                color={product.stock > 0 ? 'success' : 'error'} 
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Stock: {product.stock}
              </Typography>
              <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                <IconButton onClick={handleFavoriteClick}>
                  {isFavorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="contained"
          startIcon={<CartIcon />}
          disabled={product.stock === 0}
          sx={{
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 