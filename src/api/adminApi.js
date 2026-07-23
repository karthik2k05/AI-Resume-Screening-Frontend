import API from "./api";

const AdminAPI = {
  getCandidates: (page = 1, limit = 10) =>
    API.get(`/admin/candidates?page=${page}&limit=${limit}`),
};

export default AdminAPI;