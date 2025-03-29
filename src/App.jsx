import { useState, useMemo } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box,
  useTheme,
  useMediaQuery,
  Fade,
  CircularProgress
} from '@mui/material';
import { ProductCard } from './components/ProductCard';
import { FilterPanel } from './components/FilterPanel';
import { ProductDetail } from './components/ProductDetail';
import { Header } from './components/Header';
import { Cart } from './components/Cart';
import { products } from './data/products';
import { initialFilters } from './types/product';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterOptions, setFilterOptions] = useState(initialFilters);
  const [sortOption, setSortOption] = useState('price-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleFilterChange = (newFilters) => {
    setFilterOptions(newFilters);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleSortChange = (newSort) => {
    setSortOption(newSort);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleToggleWishlist = (product) => {
    setWishlistItems(prevItems => {
      const isInWishlist = prevItems.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevItems.filter(item => item.id !== product.id);
      }
      return [...prevItems, product];
    });
  };

  // Get unique categories and brands
  const categories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))),
    []
  );
  const brands = useMemo(() => 
    Array.from(new Set(products.map(p => p.brand))),
    []
  );

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filterOptions.category.length > 0) {
      result = result.filter(product =>
        filterOptions.category.includes(product.category)
      );
    }

    // Apply brand filter
    if (filterOptions.brand.length > 0) {
      result = result.filter(product =>
        filterOptions.brand.includes(product.brand)
      );
    }

    // Apply price range filter
    result = result.filter(product =>
      product.price >= filterOptions.priceRange[0] &&
      product.price <= filterOptions.priceRange[1]
    );

    // Apply rating filter
    if (filterOptions.rating > 0) {
      result = result.filter(product =>
        product.rating >= filterOptions.rating
      );
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [products, filterOptions, sortOption, searchQuery]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header 
        onSearch={handleSearch}
        cartItems={cartItems}
        wishlistItems={wishlistItems}
      />
      
      <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 4,
            display: { xs: 'none', sm: 'block' }
          }}
        >
          Product Catalog
        </Typography>

        <Grid container spacing={3}>
          {/* Filter Panel */}
          <Grid item xs={12} md={3}>
            <Box sx={{ 
              position: isMobile ? 'static' : 'sticky',
              top: 20,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1,
              height: 'fit-content',
              p: 2
            }}>
              <FilterPanel
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
                sortOption={sortOption}
                onSortChange={handleSortChange}
                categories={categories}
                brands={brands}
              />
            </Box>
          </Grid>

          {/* Product Grid */}
          <Grid item xs={12} md={9}>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Fade in={!isLoading}>
                <Box>
                  {showCart ? (
                    <Cart
                      items={cartItems}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveFromCart}
                    />
                  ) : (
                    <Grid container spacing={3}>
                      {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                          <ProductCard
                            product={product}
                            onSelect={() => setSelectedProduct(product)}
                            onAddToCart={() => handleAddToCart(product)}
                            isInWishlist={wishlistItems.some(item => item.id === product.id)}
                            onToggleWishlist={() => handleToggleWishlist(product)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </Fade>
            )}
          </Grid>
        </Grid>

        {/* Product Detail Dialog */}
        <ProductDetail
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </Container>
    </Box>
  );
}

export default App;
