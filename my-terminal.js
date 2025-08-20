
// Commands

const commands = {
    help() {
        term.echo(`List of available commands: ${help}`);
    },
    clear() {
        term.clear();
    },
    echo(...args) {
        term.echo(args.join(' '));
    },
    about() {
        term.echo('This is my terminal website, built out of sheer curiosity. It\'s a little corner of the internet I thought I might share with you. \n\nListen, I like building this stuff as much as the next person, but I also enjoy a good laugh. So, if you see anything funny, feel free to point it out!');
    },
};


const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

const command_list = Object.keys(commands);
const formatted_list = command_list.map(cmd => `<white class="command">${cmd}</white>`);
const help = formatter.format(formatted_list);

const any_command_re = new RegExp(`^\s*(${command_list.join('|')})`);
$.terminal.new_formatter([any_command_re, '<blue>$1</aqua>']);

// Header Logo Styling

const font = 'Graceful';

figlet.defaults({ fontPath: 'https://cdn.jsdelivr.net/gh/patorjk/figlet.js/fonts/' });
figlet.preloadFonts([font], ready);


const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false,
    exit: false
});

function ready() {
    const seed = 222;
    term.echo(() => {
        const ascii = rainbow(render('Linda L.'), seed);
        return `${ascii}\n[[;#fff;]Welcome to my Terminal Portfolio...]\n`;
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


function rand(max) {
    return Math.floor(Math.random() * (max + 1));
}

function rainbow(string, seed) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string, seed).join('\n');
}

function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
}
