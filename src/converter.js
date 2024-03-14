function convertMarkdownToHtml(markdown) {
    if (!checkForUnmatchedMarkers(markdown)) {
        throw new Error('Error: Unmatched markdown markers found');
    }

    if (!checkForNesting(markdown)) {
        throw new Error('Error: Nesting detected');
    }

    let html = ' ';
    const lines = markdown.split('\n');
    let inPreBlock = false;
    let newParagraph = true;

    lines.forEach((line, index) => {
        if (line.startsWith('```')) {
            inPreBlock = !inPreBlock;
            html += inPreBlock ? '<pre>' : '</pre>\n';
            newParagraph = true;
        } else if (inPreBlock) {
            html += `${line}\n`;
        } else {
            if (line.trim() !== '') {
                if (newParagraph && html !== '') {
                    html += '<p>';
                }
                newParagraph = false;

                line = line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                    .replace(/_(.*?)_/g, '<i>$1</i>')
                    .replace(/`(.*?)`/g, '<code>$1</code>');

                html += line;
                if ((lines[index + 1] && lines[index + 1].trim() === '') || index === lines.length - 1) {
                    html += '</p>\n';
                    newParagraph = true;
                }
            }
        }
    });
    return html;
}

const ANSI_BOLD = "\x1b[1m";
const ANSI_ITALIC = "\x1b[3m";
const ANSI_REVERSE = "\x1b[7m";
const ANSI_RESET = "\x1b[0m";

function convertMarkdownToAnsi(markdown) {
    if (!checkForUnmatchedMarkers(markdown)) {
        throw new Error('Error: Unmatched markdown markers found');
    }

    if (!checkForNesting(markdown)) {
        throw new Error('Error: Nesting detected');
    }

    let ansiText = '';
    const lines = markdown.split('\n');
    let inPreBlock = false;

    lines.forEach((line) => {
        if (line.startsWith('```')) {
            inPreBlock = !inPreBlock;
            ansiText += inPreBlock ? ANSI_REVERSE : ANSI_RESET + '\n';
        } else if (inPreBlock) {
            ansiText += line + '\n';
        } else {
            line = line.replace(/\*\*(.*?)\*\*/g, ANSI_BOLD + '$1' + ANSI_RESET)
                .replace(/_(.*?)_/g, ANSI_ITALIC + '$1' + ANSI_RESET)
                .replace(/`(.*?)`/g, ANSI_REVERSE + '$1' + ANSI_RESET);

            ansiText += line + '\n';
        }
    });

    return ansiText + ANSI_RESET;
}


function checkForUnmatchedMarkers(markdown) {
    let isBoldOpen = false;
    let isMonospaceOpen = false;
    let isItalicOpen = false;
    let preformattedCount = 0;

    for (let i = 0; i < markdown.length; i++) {
        if (markdown[i] === '*' && i + 1 < markdown.length && markdown[i + 1] === '*') {
            if (!(i > 0 && markdown[i - 1] === '\\')) {
                isBoldOpen = !isBoldOpen;
                i++;
            }
        } else if (markdown[i] === '`' && (i < 1 || markdown[i - 1] !== '`')) {
            if (!(i > 0 && markdown[i - 1] === '\\')) {
                isMonospaceOpen = !isMonospaceOpen;
            }
        } else if (markdown[i] === '_') {
            if (!(i > 0 && markdown[i - 1] === '\\')) {
                const hasSpaceAround = (i > 0 && markdown[i - 1] === ' ') || (i < markdown.length - 1 && markdown[i + 1] === ' ');
                const hasQuoteAround = (i > 0 && markdown[i - 1] === '‘') || (i < markdown.length - 1 && markdown[i + 1] === '’');
                const isPartOfWord = (i > 0 && markdown[i - 1].match(/\w/)) && (i < markdown.length - 1 && markdown[i + 1].match(/\w/));

                if (!hasSpaceAround && !hasQuoteAround && !isPartOfWord) {
                    isItalicOpen = !isItalicOpen;
                }
            }
        } else if (markdown[i] === '`' && i + 2 < markdown.length && markdown[i + 1] === '`' && markdown[i + 2] === '`') {
            preformattedCount++;
            i += 2;
        }
    }

    return !(isBoldOpen || isMonospaceOpen || isItalicOpen || preformattedCount % 2 !== 0);
}

function checkForNesting(markdown) {
    const markers = ['**', '`', '_'];
    let preformat = false;
    let stack = [];

    for (let i = 0; i < markdown.length; i++) {
        if (markdown.startsWith('```', i)) {
            preformat = !preformat;
            i += 2;
            continue;
        }

        if (preformat) continue;

        for (const marker of markers) {
            if (markdown.startsWith(marker, i)) {
                if (marker === '_') {
                    if ((i > 0 && markdown[i - 1].match(/\w/)) && (i < markdown.length - 1 && markdown[i + 1].match(/\w/))) {
                        continue;
                    }
                    if ((i > 0 && markdown[i - 1].match(/[^\w\s]/)) && (i < markdown.length - 1 && markdown[i + 1].match(/[^\w\s]/))) {
                        continue;
                    }
                }

                if (stack.length > 0 && stack[stack.length - 1] !== marker) {
                    return false;
                }
                if (stack.length > 0 && stack[stack.length - 1] === marker) {
                    stack.pop();
                } else {
                    stack.push(marker);
                }
                i += marker.length - 1;
                break;
            }
        }
    }

    return true;
}

module.exports = { convertMarkdownToHtml, convertMarkdownToAnsi };