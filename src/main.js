const fs = require('fs');
const { convertMarkdownToHtml } = require('./converter');

const inputFile = process.argv[2];
const outputFile = process.argv[4];

if (!inputFile) {
    console.error('Error: No input file specified');
    process.exit(1);
}

fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${inputFile}`, err);
        process.exit(1);
    }

    try {
        const html = convertMarkdownToHtml(data);
        if (outputFile) {
            fs.writeFile(outputFile, html, (writeErr) => {
                if (writeErr) {
                    console.error(`Error writing to file: ${outputFile}`, writeErr);
                    process.exit(1);
                }
                console.log(`HTML written to ${outputFile}`);
            });
        } else {
            console.log(html);
        }
    } catch (conversionErr) {
        console.error(conversionErr.message);
        process.exit(1);
    }
});
