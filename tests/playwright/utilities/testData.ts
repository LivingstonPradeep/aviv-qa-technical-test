import fs from "fs";
import yaml from "js-yaml";

export function getTestData(file: string){
  const testData =  yaml.load(fs.readFileSync(file, 'utf8'));

  if (!testData || typeof testData !== 'object' || !Array.isArray(testData.tests)) {
    throw new Error("Invalid test data format: 'tests' key is missing or not an array");
  }
  return testData;
}
