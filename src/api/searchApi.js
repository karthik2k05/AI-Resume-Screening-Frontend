import API from "./apiSearch";

const SearchAPI = {
  search: (query) =>
    API.get(`/search?query=${encodeURIComponent(query)}`),
};

export default SearchAPI;