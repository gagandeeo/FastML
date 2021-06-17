import { userApi } from "./http-common";

class usersApiService {
  login(data) {
    return userApi.post("login", data);
  }
  signup(data) {
    return userApi.post("signup", data);
  }
  logout() {
    localStorage.removeItem("token_type");
    localStorage.removeItem("token");
  }
}

export default new usersApiService();
