/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} category
 * @property {string} image
 * @property {number} rating
 * @property {number} stock
 * @property {string} brand
 */

/**
 * @typedef {'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc'} SortOption
 */

/**
 * @typedef {Object} FilterOptions
 * @property {string[]} category
 * @property {[number, number]} priceRange
 * @property {string[]} brand
 * @property {number} rating
 */

export const initialFilters = {
  category: [],
  priceRange: [0, 1000],
  brand: [],
  rating: 0
}; 