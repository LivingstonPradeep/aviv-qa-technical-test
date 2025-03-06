import { UsersAction } from "../playwright/action/UsersAction";
import { getTestData } from "../playwright/utilities/testData";
import { test } from "../playwright/fixtures/test-setup";

const logoutTestData = getTestData("tests/playwright/test-data/logout.yaml");

logoutTestData.tests.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    try {
      const userActions = new UsersAction(page, request, testData.mode, testData.role);
      await userActions.performLogin(testData.username, testData.password);
      await userActions.verifyLoginSuccess(testData.role);
      await userActions.performLogout();
    }
    catch (error) {
      if (testData.mustFail && "errorMessage" in testData && error.message.includes(testData.errorMessage)) {
        console.debug('Expected error message:', error.message);
        return;
      }
      throw error;
    }

  });
});
