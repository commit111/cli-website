
const commands = {};



const font = 'Graceful';

figlet.defaults({ fontPath: 'https://cdn.jsdelivr.net/gh/patorjk/figlet.js/fonts/' });
figlet.preloadFonts([font], ready);


const term = $('body').terminal(commands, {
    greetings: false
});

function ready() {
    term.echo(() => {
        const ascii = render('Linda L.');
        return `${ascii}\nWelcome to my Terminal Portfolio!\n`;
    });
}

function render(text) {
    const cols = term.cols();
    return trim(figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    }));
}

function trim(str) {
    return str.replace(/[\n\s]+$/, '');
}
