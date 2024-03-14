const convertMarkdownToHtml = require('../src/converters/htmlConverter');

function runTest(testName, testFunction, expected) {
    try {
        const actual = testFunction();
        if (String(actual).trim() === String(expected).trim()) {
            console.log(`[PASSED] ${testName}`);
        } else {
            console.error(`[FAILED] ${testName}\nExpected: '${expected}'\nActual: '${actual}'`);
        }
    } catch (error) {
        console.error(`[FAILED] ${testName} - Unexpected error: ${error.message}`);
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