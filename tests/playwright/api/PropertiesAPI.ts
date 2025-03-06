import { APIRequestContext, APIResponse } from "@playwright/test";

export class PropertiesAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async searchProperties(userData: object): Promise<APIResponse> {
    return this.request.post("/users", { data: userData });
  }
}
