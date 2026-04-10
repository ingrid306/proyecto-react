import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TECH_CATEGORIES = ["smartphones", "laptops", "tablets", "mobile-accessories"];

const CATEGORY_MAP = {
  smartphones: "Smartphones",
  laptops: "Laptops",
  tablets: "Tablets",
  "mobile-accessories": "Accesorios",
};

const mapProduct = (p) => ({
  id: p.id,
  name: p.title,
  description: p.description,
  shortDescription: [p.brand, ...(p.tags?.slice(0, 2) || [])]
    .filter(Boolean)
    .join(" • "),
  price: parseFloat(p.price.toFixed(2)),
  rating: Math.round(p.rating * 10) / 10,
  reviews: p.reviews?.length || Math.max(10, Math.floor(p.rating * 55)),
  stock: p.stock,
  category: CATEGORY_MAP[p.category] || p.category,
  image: p.thumbnail,
  images: p.images?.length ? p.images : [p.thumbnail],
  brand: p.brand || "Generic",
  discount: parseFloat((p.discountPercentage || 0).toFixed(1)),
});

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const results = await Promise.all(
        TECH_CATEGORIES.map((cat) =>
          fetch(
            `https://dummyjson.com/products/category/${cat}?limit=10`
          )
            .then((r) => {
              if (!r.ok) throw new Error(`Error fetching ${cat}`);
              return r.json();
            })
            .then((d) => d.products || [])
        )
      );

      const all = results.flat().map(mapProduct);

      // Mark top 6 by rating as featured
      const sorted = [...all].sort((a, b) => b.rating - a.rating);
      const featuredIds = new Set(sorted.slice(0, 6).map((p) => p.id));

      return all.map((p) => ({ ...p, featured: featuredIds.has(p.id) }));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default productsSlice.reducer;
