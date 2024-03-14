const fs = require('fs');
const convertMarkdownToHtml = require('./converters/htmlConverter');
const convertMarkdownToAnsi = require('./converters/ansiConverter');
const checkForUnmatchedMarkers = require('./validators/unmatchedMarkersValidator');
const checkForNesting = require('./validators/nestingValidator');

const inputFile = process.argv[2];
let outputFile;
let outputFormat;

process.argv.forEach((arg, index) => {
    if (arg === '--out') {
        outputFile = process.argv[index + 1];
        outputFormat = 'html';
    } else if (arg.startsWith('--format=')) {
        outputFormat = arg.split('=')[1];
    }
});

if (!inputFile) {
    console.error('Error: No input file specified');
    process.exit(1);
}

fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${inputFile}`, err);
        process.exit(1);
    }

    if (!checkForUnmatchedMarkers(data)) {
        throw new Error('Unmatched markdown markers found');
    }

    if (!checkForNesting(data)) {
        throw new Error('Nesting detected');
    }

    try {
        let output;
        if (!outputFormat || outputFormat === 'ansi') {
            output = convertMarkdownToAnsi(data);
        } else if (outputFormat === 'html') {
            output = convertMarkdownToHtml(data);
        }

        if (outputFile) {
            fs.writeFile(outputFile, output, (writeErr) => {
                if (writeErr) {
                    console.error(`Error writing to file: ${outputFile}`, writeErr);
                    process.exit(1);
                }
                console.log(`Output written to ${outputFile}`);
            });
        } else {
            console.log(output);
        }
    } catch (conversionErr) {
        console.error(conversionErr.message);
        process.exit(1);
    }
});
