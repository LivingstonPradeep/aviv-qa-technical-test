import { UsersAction } from "../playwright/action/UsersAction";
import { PropertiesAction } from "../playwright/action/PropertiesAction";
import { getTestData } from "../playwright/utilities/testData";
import { test } from "../playwright/fixtures/test-setup";
import { handleError } from "../playwright/utilities/errorUtils";

const propertiesTestData = getTestData("tests/playwright/test-data/search.yaml");

const propertyPageSearchTestData = propertiesTestData.tests.filter(obj => obj.description.includes("UI-Property-Page-Search"));
propertyPageSearchTestData.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    try {
      const usersAction = new UsersAction(page, request, testData.mode, testData.role);
      const propertiesAction = new PropertiesAction(page, request, testData.mode, testData.role);
      await usersAction.performLogin(testData.username, testData.password);
      await usersAction.verifyLoginSuccess(testData.role);
      await propertiesAction.searchInProperties(testData);
    }
    catch (error) {
      if (testData.negative && "errorMessages" in testData && error.message.includes(testData.errorMessages)) {
        console.debug('Expected error message:', error.message);
        return;
      }
      throw error;
    }
  });
});

const homePageSearchTestData = propertiesTestData.tests.filter(obj => obj.description.includes("UI-Home-Page-Search"));
homePageSearchTestData.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    try {
      const usersAction = new UsersAction(page, request, testData.mode, testData.role);
      const propertiesAction = new PropertiesAction(page, request, testData.mode, testData.role);
      await usersAction.performLogin(testData.username, testData.password);
      await usersAction.verifyLoginSuccess(testData.role);
      await propertiesAction.searchInHome(testData);
    }
    catch (error) {
      handleError(testData, error);
    }

  });
});

