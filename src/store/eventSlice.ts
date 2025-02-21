import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

const API_KEY = "59233ace-d83e-45af-96cb-7a39f78fc94d"; // Вынести в .env

interface EventItem {
  id: string;
  name: string;
  address_name: string;
  address_comment?: string;
  external_content?: { main_photo_url: string }[];
}

interface EventState {
  events: EventItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentCategory: string;
  currentPage: number;
  total: number;
}

const initialState: EventState = {
  events: [],
  status: "idle",
  error: null,
  currentCategory: "Общественное питание",
  currentPage: 1,
  total: 0,
};

export const fetchEvents = createAsyncThunk<
  { items: EventItem[]; total: number },
  void,
  { state: { events: EventState }; rejectValue: string }
>("events/fetchEvents", async (_, { getState, rejectWithValue }) => {
  try {
    const { currentCategory, currentPage } = getState().events;

    const response = await apiClient.get("items", {
      params: {
        q: currentCategory,
        fields: "items.external_content",
        location: "27.561831,53.900601",
        key: API_KEY,
        page_size: 6,
        page: currentPage,
        has_photos: true,
      },
    });

    return {
      items: response.data.result.items,
      total: response.data.result.total,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Ошибка загрузки";
      });
  },
});

export const { setCategory, setPage } = eventSlice.actions;
export default eventSlice.reducer;
