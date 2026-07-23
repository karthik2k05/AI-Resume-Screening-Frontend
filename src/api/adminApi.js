import API from "./authApi";

const AdminAPI = {
  getCandidates: (page = 1, limit = 10) =>
    API.get(`/admin/candidates?page=${page}&limit=${limit}`),
};

export default AdminAPI;