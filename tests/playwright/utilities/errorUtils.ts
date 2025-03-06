export function handleError(testData: any, error: Error) {
    if (testData.negative) {
        if (!("errorMessages" in testData)) {
            console.warn('Negative test failed but no expected error message provided in test data');
            return;
        }
        else if ("errorMessages" in testData && error.message.includes(testData.errorMessages)) {
            console.debug('Negative test succeeded with expected message(s):', error.message);
            return;
        }
        else {
            console.error('Negative test failed with unexpected message(s):', error.message);
            throw error;
        }
    }
    throw error;
}