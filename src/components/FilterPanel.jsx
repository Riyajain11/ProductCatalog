import { 
  Box, 
  Typography, 
  Slider, 
  FormGroup, 
  FormControlLabel, 
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Chip,
  Stack
} from '@mui/material';
import { 
  Clear as ClearIcon,
  TrendingUp as TrendingUpIcon,
  Category as CategoryIcon,
  LocalOffer as LocalOfferIcon,
  Star as StarIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';

export function FilterPanel({ 
  filterOptions, 
  onFilterChange, 
  sortOption, 
  onSortChange,
  categories,
  brands
}) {
  const handleCategoryChange = (category) => {
    const newCategories = filterOptions.category.includes(category)
      ? filterOptions.category.filter(c => c !== category)
      : [...filterOptions.category, category];
    onFilterChange({ ...filterOptions, category: newCategories });
  };

  const handleBrandChange = (brand) => {
    const newBrands = filterOptions.brand.includes(brand)
      ? filterOptions.brand.filter(b => b !== brand)
      : [...filterOptions.brand, brand];
    onFilterChange({ ...filterOptions, brand: newBrands });
  };

  const handlePriceRangeChange = (event, newValue) => {
    onFilterChange({ ...filterOptions, priceRange: newValue });
  };

  const handleRatingChange = (event, newValue) => {
    onFilterChange({ ...filterOptions, rating: newValue });
  };

  const handleResetFilters = () => {
    onFilterChange({
      category: [],
      priceRange: [0, 1000],
      brand: [],
      rating: 0
    });
  };

  const hasActiveFilters = 
    filterOptions.category.length > 0 ||
    filterOptions.brand.length > 0 ||
    filterOptions.priceRange[0] > 0 ||
    filterOptions.priceRange[1] < 1000 ||
    filterOptions.rating > 0;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ flex: 1 }}>
          Filters
        </Typography>
        {hasActiveFilters && (
          <Tooltip title="Reset filters">
            <IconButton onClick={handleResetFilters} size="small">
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Sort By
          </Typography>
        </Box>
        <FormControl fullWidth size="small">
          <Select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            displayEmpty
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            }}
          >
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
            <MenuItem value="name-asc">Name: A to Z</MenuItem>
            <MenuItem value="name-desc">Name: Z to A</MenuItem>
            <MenuItem value="rating-desc">Highest Rated</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Categories
          </Typography>
        </Box>
        <Stack spacing={1}>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={filterOptions.category.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  size="small"
                  sx={{
                    color: 'primary.main',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              }
              label={category}
              sx={{ 
                '& .MuiFormControlLabel-label': { 
                  fontSize: '0.875rem',
                  color: filterOptions.category.includes(category) ? 'primary.main' : 'text.secondary'
                }
              }}
            />
          ))}
        </Stack>
      </Paper>

      <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocalOfferIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Brands
          </Typography>
        </Box>
        <Stack spacing={1}>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  checked={filterOptions.brand.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  size="small"
                  sx={{
                    color: 'primary.main',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              }
              label={brand}
              sx={{ 
                '& .MuiFormControlLabel-label': { 
                  fontSize: '0.875rem',
                  color: filterOptions.brand.includes(brand) ? 'primary.main' : 'text.secondary'
                }
              }}
            />
          ))}
        </Stack>
      </Paper>

      <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocalOfferIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Price Range
          </Typography>
        </Box>
        <Slider
          value={filterOptions.priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
          marks={[
            { value: 0, label: '$0' },
            { value: 500, label: '$500' },
            { value: 1000, label: '$1000' }
          ]}
          sx={{
            '& .MuiSlider-thumb': {
              height: 24,
              width: 24,
              backgroundColor: '#fff',
              border: '2px solid currentColor',
              '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
              },
              '&:before': {
                display: 'none',
              },
            },
            '& .MuiSlider-valueLabel': {
              lineHeight: 1.2,
              fontSize: 12,
              background: 'unset',
              padding: 0,
              width: 32,
              height: 32,
              borderRadius: '50% 50% 50% 0',
              backgroundColor: 'primary.main',
              transformOrigin: 'bottom left',
              transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
              '&:before': { display: 'none' },
              '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
              },
              '& > *': {
                transform: 'rotate(45deg)',
              },
            },
          }}
        />
      </Paper>

      <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StarIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Minimum Rating
          </Typography>
        </Box>
        <Slider
          value={filterOptions.rating}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          min={0}
          max={5}
          step={0.5}
          marks={[
            { value: 0, label: '0' },
            { value: 2.5, label: '2.5' },
            { value: 5, label: '5' }
          ]}
          sx={{
            '& .MuiSlider-thumb': {
              height: 24,
              width: 24,
              backgroundColor: '#fff',
              border: '2px solid currentColor',
              '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
              },
              '&:before': {
                display: 'none',
              },
            },
            '& .MuiSlider-valueLabel': {
              lineHeight: 1.2,
              fontSize: 12,
              background: 'unset',
              padding: 0,
              width: 32,
              height: 32,
              borderRadius: '50% 50% 50% 0',
              backgroundColor: 'primary.main',
              transformOrigin: 'bottom left',
              transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
              '&:before': { display: 'none' },
              '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
              },
              '& > *': {
                transform: 'rotate(45deg)',
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
} 