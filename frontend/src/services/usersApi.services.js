import http from "./http-common";

class usersApiService {
  login(data) {
    return http.post(
      "login",
      data /* {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0M0B0ZXN0LmNvbSIsImV4cCI6MTYyMjU1NDg2NX0.Es4OFzU4JA6w7R1BlbXlDHQwXQzPAhqlSp42cUEtiRY",
      },
    } */
    );
  }
  logout() {
    localStorage.removeItem("token_type");
    localStorage.removeItem("token");
  }
}

export default new usersApiService();
