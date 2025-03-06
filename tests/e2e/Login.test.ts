import { UsersAction } from "../playwright/action/UsersAction";
import { getTestData } from "../playwright/utilities/testData";
import { test } from "../playwright/fixtures/test-setup";
import { handleError } from "../playwright/utilities/errorUtils";

const loginTestData = getTestData("tests/playwright/test-data/login.yaml");

loginTestData.tests.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    try {
      const userActions = new UsersAction(page, request, testData.mode, testData.role);
      await userActions.performLogin(testData.username, testData.password);
      await userActions.verifyLoginSuccess(testData.role);
    }
    catch (error) {
      handleError(testData, error);
    }

  });
});
