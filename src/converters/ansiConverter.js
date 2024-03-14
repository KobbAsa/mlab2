const ANSI_BOLD = "\x1b[1m";
const ANSI_ITALIC = "\x1b[3m";
const ANSI_REVERSE = "\x1b[7m";
const ANSI_RESET = "\x1b[0m";

function convertMarkdownToAnsi(markdown) {

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

module.exports = convertMarkdownToAnsi;