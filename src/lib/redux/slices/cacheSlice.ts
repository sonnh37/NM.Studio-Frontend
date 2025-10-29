import { userService } from "@/services/user-serice";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface UserCache {
  role?: string;
  theme?: string;
  sidebar?: boolean;
  
}

interface RoleState {
  cache: UserCache; // Thay vì chỉ lưu currentRole
  status: "idle" | "loading" | "failed";
}

const initialState: RoleState = {
  cache: {},
  status: "idle",
};

export const updateUserCache = createAsyncThunk(
  "cache/update",
  async (partialCache: Partial<UserCache>, { rejectWithValue }) => {
    try {
      // Truyền thẳng partialCache lên backend, backend sẽ tự merge
      const response = await userService.updateCache(partialCache);
      return partialCache;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

export const initializeCache = createAsyncThunk(
  "cache/initialize",
  async (userCache: string | null) => {
    try {
      return userCache ? JSON.parse(userCache) as UserCache : {};
    } catch (error) {
      console.error("Error parsing userCache:", error);
      return {};
    }
  }
);

const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    // Reducer để update cache locally (không gọi API)
    updateLocalCache: (state, action: PayloadAction<Partial<UserCache>>) => {
      state.cache = { ...state.cache, ...action.payload };
    },
    resetCache: (state) => {
      state.cache = {};
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserCache.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserCache.fulfilled, (state, action) => {
        state.status = "idle";
        // Merge partial cache vào state hiện tại
        state.cache = { ...state.cache, ...action.payload };
      })
      .addCase(updateUserCache.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(initializeCache.fulfilled, (state, action) => {
        state.cache = action.payload;
      });
  },
});

// Export actions và reducer
export const { updateLocalCache } = cacheSlice.actions;
export const { resetCache } = cacheSlice.actions;
export default cacheSlice.reducer;

// Selectors
export const selectCurrentRole = (state: { cache: RoleState }) => state.cache.cache.role;
export const selectTheme = (state: { cache: RoleState }) => state.cache.cache.theme;
export const selectSidebarState = (state: { cache: RoleState }) => state.cache.cache.sidebar;