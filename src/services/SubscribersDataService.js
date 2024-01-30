import http from "../http-common";

class SubscribersDataService {
  getAll() {
    return http.get("/subscribers");
  }

  create(data) {
    return http.post("/subscriber", data);
  }
}

export default new SubscribersDataService();
