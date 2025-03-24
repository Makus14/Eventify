import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

const API_KEY = import.meta.env.VITE_API_KEY;

interface EventItem {
  id: string;
  name: string;
  address_name: string;
  address_comment?: string;
  external_content?: { main_photo_url: string }[];
  point?: { lat: number; lon: number };
  reviews?: { general_rating: string; general_review_count_with_stars: string };
}

interface EventState {
  events: EventItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentCategory: string;
  currentPage: number;
  total: number;
  selectedEvent: EventItem | null;
}

const initialState: EventState = {
  events: [],
  status: "idle",
  error: null,
  currentCategory: "Покушать",
  currentPage: 1,
  total: 0,
  selectedEvent: null,
};

export const fetchEvents = createAsyncThunk<
  { items: EventItem[]; total: number },
  { category: string; page: number },
  { state: { events: EventState }; rejectValue: string }
>("events/fetchEvents", async ({ category, page }, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("items", {
      params: {
        q: category,
        fields: "items.external_content,items.point,items.reviews",
        location: "27.561831,53.900601",
        key: API_KEY,
        page_size: 6,
        page,
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
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearEvents: (state) => {
      state.events = [];
    },
    setSelectedEvent: (state, action: PayloadAction<EventItem | null>) => {
      state.selectedEvent = action.payload;
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

export const { setCategory, setPage, clearEvents, setSelectedEvent } =
  eventSlice.actions;
export default eventSlice.reducer;
