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

module.exports = checkForUnmatchedMarkers;