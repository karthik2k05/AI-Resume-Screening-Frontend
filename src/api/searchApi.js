import API from "./authApi";

const SearchAPI = {
  search: (query) =>
    API.get(`/search?query=${encodeURIComponent(query)}`),
};

export default SearchAPI;