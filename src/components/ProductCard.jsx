import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Tooltip,
  Chip,
  Rating
} from '@mui/material';
import { 
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import { useState } from 'react';

export function ProductCard({ product, onClick }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 3,
          '& .MuiCardMedia-root': {
            transform: 'scale(1.05)',
          },
          '& .MuiCardContent-root': {
            bgcolor: 'background.paper',
          }
        }
      }}
      onClick={() => onClick(product)}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
          }}
        />
        <Box sx={{ 
          position: 'absolute', 
          top: 8, 
          right: 8,
          display: 'flex',
          gap: 1
        }}>
          <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <IconButton
              onClick={handleFavoriteClick}
              sx={{
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'background.paper',
                }
              }}
            >
              {isFavorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
          <Chip 
            label={product.stock > 0 ? 'In Stock' : 'Out of Stock'} 
            color={product.stock > 0 ? 'success' : 'error'} 
            size="small"
            sx={{ 
              bgcolor: 'background.paper',
              fontWeight: 600
            }}
          />
        </Box>
      </Box>
      
      <CardContent sx={{ 
        flexGrow: 1, 
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{
            fontWeight: 600,
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          {product.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating 
            value={product.rating} 
            precision={0.1} 
            readOnly 
            size="small"
            sx={{ color: 'warning.main' }}
          />
          <Typography variant="body2" color="text.secondary">
            ({product.rating})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
            ${product.price}
          </Typography>
          <Chip 
            label={product.category} 
            size="small"
            sx={{ 
              bgcolor: 'primary.light',
              color: 'white',
              fontWeight: 500
            }}
          />
        </Box>

        <Button 
          variant="contained" 
          fullWidth
          disabled={product.stock === 0}
          startIcon={<CartIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              transform: 'translateY(-1px)'
            }
          }}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardContent>
    </Card>
  );
} 