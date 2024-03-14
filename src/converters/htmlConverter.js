function convertMarkdownToHtml(markdown) {

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

module.exports = convertMarkdownToHtml;