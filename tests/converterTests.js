const { convertMarkdownToHtml } = require('../src/converter');

function runTest(testName, testFunction, expected) {
    try {
        const actual = testFunction();
        if (expected === 'error') {
            console.error(`[FAILED] ${testName} - Expected error, but none was thrown`);
        } else if (String(actual).trim() === String(expected).trim()) {
            console.log(`[PASSED] ${testName}`);
        } else {
            console.error(`[FAILED] ${testName}\nExpected: '${expected}'\nActual: '${actual}'`);
        }
    } catch (error) {
        if (expected === 'error') {
            console.log(`[PASSED] ${testName} - Error detected as expected: ${error.message}`);
        } else {
            console.error(`[FAILED] ${testName} - Unexpected error: ${error.message}`);
        }
    }
}

runTest(
    'Converts bold markdown correctly',
    () => convertMarkdownToHtml('**bold**'),
    '<p><b>bold</b></p>'
);

runTest(
    'Converts italic markdown correctly',
    () => convertMarkdownToHtml('_italic fragment_'),
    '<p><i>italic fragment</i></p>'
);

runTest(
    'Converts code markdown correctly',
    () => convertMarkdownToHtml('`monospaced`'),
    '<p><code>monospaced</code></p>'
);

runTest(
    'Preformatted text test',
    () => convertMarkdownToHtml('```\n' +
        'This text is **preformatted**\n' +
        '```\n'),
    '<pre>This text is **preformatted**\n'+
    '</pre>'
);

runTest(
    'Paragraph test',
    () => convertMarkdownToHtml('Paragraph 1\n  \nParagraph 2'),
    '<p>Paragraph 1</p>\n<p>Paragraph 2</p>'
);

runTest(
    'Allows snake_case',
    () => convertMarkdownToHtml('test for snake_case'),
    '<p>test for snake_case</p>'
);

runTest(
    'Context of `_` test',
    () => convertMarkdownToHtml('_ - а це нижнє підкреслення'),
    '<p>_ - а це нижнє підкреслення</p>'
);

runTest(
    'Detects unmatched bold markers correctly',
    () => convertMarkdownToHtml('**bold'),
    'error'
);

runTest(
    'Detects unmatched italics markers correctly',
    () => convertMarkdownToHtml('_кінця-краю немає'),
    'error'
);

runTest(
    'Detects unmatched monospaced markers correctly',
    () => convertMarkdownToHtml('`invalid monospaced'),
    'error'
);

runTest(
    'Detects nesting of markdown markers',
    () => convertMarkdownToHtml('**`_this is invalid_`**'),
    'error'
);

runTest(
    'Allows non-nested markdown markers',
    () => convertMarkdownToHtml('‘_’ - теж ок'),
    '<p>‘_’ - теж ок</p>'
);