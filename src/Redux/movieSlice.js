import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";

const initialState = {
  movies: [],
  isLoading : false,
  movieDetails: [],
  detailsIsLoading : false,
  selectedTab: "1",
  selectedSegment: "Kanban",
  searchValue: "",
  paginationPage: 1,
};

export const getMovieNowPlaying = createAsyncThunk(
  "movie/getMovieNowPlaying",
  async (page) => {
    try {
      const data = await axiosClient.get("/movie/now_playing",{
        params: {
          page: page,
        },
      });
      return data.data;
    } catch (error) {
      throw error
    }
  }
);

export const getMovieTopRated = createAsyncThunk(
  "movie/getMovieTopRated",
  async (page) => {
    try {
      const data = await axiosClient.get("/movie/top_rated",{
        params: {
          page: page,
        },
      });
      return data.data;
    } catch (error) {
      throw error
    }
  }
);

export const getMovieDetails = createAsyncThunk(
  "movie/getMovieDetails",
  async (movieId) => {
    try {
      const data = await axiosClient.get(`/movie/${movieId}`);
      return data.data;
    } catch (error) {
      throw error
    }
  }
);


const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getSelectedTab: (state , {payload}) => {
      state.paginationPage = 1;
      state.selectedTab = payload;
    },
    getSelectedSegment: (state , {payload}) => {
      state.selectedSegment = payload;
    },
    getSearchMovie: (state , {payload}) => {
      state.searchValue = payload;
    },
    getPaginationPage: (state , {payload}) => {
      state.paginationPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovieNowPlaying.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovieNowPlaying.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.movies = payload.results;
    });
    builder.addCase(getMovieNowPlaying.rejected, (state, { error }) => {
      state.isLoading = true;
      state.movies = error;
    });

    builder.addCase(getMovieTopRated.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovieTopRated.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.movies = payload.results;
    });
    builder.addCase(getMovieTopRated.rejected, (state, { error }) => {
      state.isLoading = true;
      state.movies = error;
    });

    builder.addCase(getMovieDetails.pending, (state) => {
      state.detailsIsLoading = true;
    });
    builder.addCase(getMovieDetails.fulfilled, (state, { payload }) => {
      state.detailsIsLoading = false;
      state.movieDetails = payload;
    });
    builder.addCase(getMovieDetails.rejected, (state, { error }) => {
      state.detailsIsLoading = true;
      state.movieDetails = error;
    });

  },
});

// export actions
export const {getSelectedTab, getSelectedSegment, getSearchMovie, getPaginationPage} = movieSlice.actions;
// export reducer
export default movieSlice.reducer;