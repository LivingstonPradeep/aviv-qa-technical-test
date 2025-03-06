import { UsersAction } from "../playwright/action/UsersAction";
import { getTestData } from "../playwright/utilities/testData";
import { test } from "../playwright/fixtures/test-setup";
import { handleError } from "../playwright/utilities/errorUtils";

const loginTestData = getTestData("tests/playwright/test-data/profile.yaml");

loginTestData.tests.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    const userActions = new UsersAction(page, request, testData.mode, testData.role);
    try {
      await userActions.performLogin(testData.username, testData.password);
      await userActions.verifyLoginSuccess(testData.role);
      await userActions.performEditProfile(testData);
      await userActions.verifyEditProfile(testData);

    }
    catch (error) {
      handleError(testData, error);
    }

  });
});
