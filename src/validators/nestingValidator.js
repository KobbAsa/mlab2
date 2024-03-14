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

module.exports = checkForNesting;