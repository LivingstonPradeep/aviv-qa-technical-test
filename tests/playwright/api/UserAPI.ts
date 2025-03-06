import { APIRequestContext, APIResponse } from "@playwright/test";

export class UserAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(userData: object): Promise<APIResponse> {
    return this.request.post("/users", { data: userData });
  }
}
