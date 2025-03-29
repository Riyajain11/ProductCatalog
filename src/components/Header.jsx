import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Container,
  Grid,
  Tooltip,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Category as CategoryIcon,
  LocalOffer as LocalOfferIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useState } from 'react';

export function Header({ onSearch, cartItems = [], wishlistItems = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box>
      <List>
        <ListItem button>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LocalOfferIcon />
          </ListItemIcon>
          <ListItemText primary="Deals" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar position="fixed" sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: '0.5px',
                mr: 4
              }}
            >
              Product Catalog
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, mr: 2 }}>
              <Button
                color="inherit"
                startIcon={<CategoryIcon />}
                sx={{ color: 'text.primary' }}
              >
                Categories
              </Button>
              <Button
                color="inherit"
                startIcon={<LocalOfferIcon />}
                sx={{ color: 'text.primary' }}
              >
                Deals
              </Button>
              <Button
                color="inherit"
                startIcon={<HelpIcon />}
                sx={{ color: 'text.primary' }}
              >
                Help
              </Button>
            </Box>

            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '100%', sm: '400px' },
                  bgcolor: 'background.default',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <InputBase
                  placeholder="Search products..."
                  onChange={(e) => onSearch(e.target.value)}
                  sx={{
                    color: 'text.primary',
                    width: '100%',
                    '& .MuiInputBase-input': {
                      padding: '12px 12px 12px 48px',
                    },
                  }}
                />
                <SearchIcon
                  sx={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'text.secondary',
                    pointerEvents: 'none',
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
              <Tooltip title="Wishlist">
                <IconButton color="inherit">
                  <Badge badgeContent={wishlistItems.length} color="secondary">
                    <FavoriteIcon sx={{ color: 'primary.main' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Shopping Cart">
                <IconButton color="inherit">
                  <Badge badgeContent={cartItems.length} color="secondary">
                    <CartIcon sx={{ color: 'primary.main' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Account">
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{ color: 'primary.main' }}
                >
                  <PersonIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: 2,
            boxShadow: 3,
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      <Box
        component="nav"
        sx={{
          width: { sm: 240 },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              bgcolor: 'background.paper'
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
          ml: { sm: `${240}px` },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mt: 8, mb: 4 }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Discover Amazing Products 
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ mb: 4, lineHeight: 1.6 }}
                >
                  Explore our curated collection of premium products. Find exactly what you're looking for with our advanced filtering and search capabilities.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    Shop Now
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        bgcolor: 'primary.light',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: 3,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1) 30%, rgba(236, 72, 153, 0.1) 90%)',
                    zIndex: 1,
                  },
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  alt="Shopping Experience"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
} 