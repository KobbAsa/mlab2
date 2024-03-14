const checkForUnmatchedMarkers = require('../src/validators/unmatchedMarkersValidator');
const checkForNesting = require('../src/validators/nestingValidator');

function runTest(testName, testFunction, input, expected) {
    const actual = testFunction(input);
    if (actual === expected) {
        console.log(`[PASSED] ${testName}`);
    } else {
        console.error(`[FAILED] ${testName} - Expected: '${expected}', Actual: '${actual}'`);
    }
}

// Tests for checkForUnmatchedMarkers
runTest('Detects unmatched bold markers', checkForUnmatchedMarkers, '**bold*', false);
runTest('Allows matched bold markers', checkForUnmatchedMarkers, '**bold**', true);

runTest('Detects unmatched italic markers', checkForUnmatchedMarkers, '_italic', false);
runTest('Allows matched italic markers', checkForUnmatchedMarkers, '_italic_', true);

runTest('Detects unmatched monospaced markers', checkForUnmatchedMarkers, '`monospaced', false);
runTest('Allows matched monospaced  markers', checkForUnmatchedMarkers, '`monospaced`', true);

runTest('Detects unmatched preformat markers', checkForUnmatchedMarkers, '```pre pre pre', false);

runTest('Allows snake_case', checkForUnmatchedMarkers, 'snake_case', true);

runTest('Context of `_` test', checkForUnmatchedMarkers, '_ - а це нижнє підкреслення', true)

// Tests for checkForNesting
runTest('Detects nesting of markers', checkForNesting, '**`_this is invalid_`**', false);
runTest('Allows non-nested markdown markers', checkForNesting, '**bold** and _italic_', true);
runTest('Allows non-nested markdown markers #2', checkForNesting, '‘_’ - теж ок', true);