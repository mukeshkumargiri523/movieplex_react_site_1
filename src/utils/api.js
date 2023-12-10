import axios from "axios";

const BASE_URL = "http://api.themoviedb.org/3";

//const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTQ4MmRiYzNkNzgyZTJlMDRiZWIxNjlmNThlN2YzOCIsInN1YiI6IjY0MzI0ZjhmMzEwMzI1MDBiZDU2OWJlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L6j02mCfh5qY1yfxsRNSkEHRxBlwCSI-MyBjIQL_GiA";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
  accept: "application/json",
};

export const fetchDataApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
