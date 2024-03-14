const convertMarkdownToAnsi = require('../src/converters/ansiConverter');

const ANSI_BOLD = "\x1b[1m";
const ANSI_ITALIC = "\x1b[3m";
const ANSI_REVERSE = "\x1b[7m";
const ANSI_RESET = "\x1b[0m";

function runTest(testName, testFunction, expected) {
    try {
        const actual = testFunction();
        if (actual === expected) {
            console.log(`[PASSED] ${testName}`);
        } else {
            console.error(`[FAILED] ${testName}\nExpected: '${expected}'\nActual: '${actual}'`);
        }
    } catch (error) {
        console.error(`[FAILED] ${testName} - Unexpected error: ${error.message}`);
    }
}

runTest(
    'Converts bold markdown to ANSI correctly',
    () => convertMarkdownToAnsi('**bold**'),
    `${ANSI_BOLD}bold${ANSI_RESET}`
);

runTest(
    'Converts italic markdown to ANSI correctly',
    () => convertMarkdownToAnsi('_italic_'),
    `${ANSI_ITALIC}italic${ANSI_RESET}`
);

runTest(
    'Converts code markdown to ANSI correctly',
    () => convertMarkdownToAnsi('`code`'),
    `${ANSI_REVERSE}code${ANSI_RESET}`
);

runTest(
    'Converts preformatted text to ANSI correctly',
    () => convertMarkdownToAnsi('```\npreformatted\n```'),
    `${ANSI_REVERSE}preformatted\n${ANSI_RESET}`
);

runTest(
    'Handles paragraphs in ANSI correctly',
    () => convertMarkdownToAnsi('Paragraph 1\n\nParagraph 2'),
    `Paragraph 1\n\nParagraph 2`
);
