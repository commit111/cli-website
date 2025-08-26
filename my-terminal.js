
// Directory Structure

const root = '~';
let cwd = root;

const user = 'guest';
const server = 'linda-shell';

function prompt() {
    return `<mediumorchid>${user}@${server}</mediumorchid>:<white>${cwd}</white>$ `;
}

const dirs = {
    documents: ['file1.txt', 'file2.txt'],
    downloads: ['file3.txt', 'file4.txt'],
    pictures: ['image1.png', 'image2.png']
};

function print_home() {
    term.echo(Object.keys(dirs).map(dir => `<white>${dir}</white>`).join('\n'));
}

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
        term.echo('This is my terminal website, built out of sheer curiosity. It\'s a little corner of the internet I thought I might share with you. \n\nListen, I like building this stuff as much as the next person, but there comes a time and a place where you just gotta relax and not think too hard about what comes next.', {delay: 50, typing: true});
    },
    cd(dir = null) {
        if (dir == null || (dir == '..' && cwd !== root)) {
            cwd = root;
        } else if (dir.startsWith('~/') && Object.keys(dirs).includes(dir.substring(2))) {
            cwd = dir;
        } else if (dir.startsWith('../') && cwd !== root && Object.keys(dirs).includes(dir.substring(3))) {
            cwd = root + '/' + dir.substring(3);
        } else if (Object.keys(dirs).includes(dir)) {
            cwd = root + '/' + dir;
        } else {
            term.echo(`No such directory: ${dir}`);
        }
    },
    ls(dir=null) {
        //if an arg is provided
        if (dir) {
            if (dir.match(/^~\/?$/)) {
                // ls ~ or ls ~/
                print_home()
            } else if (dir.startsWith('~/')) {
                // ls ~/subdir
                const path = dir.substring(2);
                const subdirs = path.split('/');
                if (subdirs.length > 1) {
                    // ls ~/subdir1/subdir2
                    this.error(`Invalid directory: Nested subdirectories are not supported.`);
                } else {
                    // ls ~/subdir1
                    const dir = subdirs[0];
                    // check if it exists
                    if (dirs[dir]) {
                        this.echo(dirs[dir].join('\n'));
                    } else {
                        this.error(`Invalid directory: ~/${dir}`);
                    }
                }
            } else if (cwd === root) {
                if (dir in dirs) {
                    // ls <dir> exists (from root)
                    this.echo(dirs[dir].join('\n'));
                } else {
                    // ls <dir> does not exist (from root)
                    this.error(`Invalid directory: ${dir}`);
                }
            } else if (dir === '..') {
                // ls ..
                print_home();
            } else {
                // ls <dir>/<subdir> does not exist
                this.error(`Invalid directory: ${dir}`);
            }
        } else if (cwd === root) {
            // ls
            print_home();
        } else {
            // ls <subdir> (from non-root))
            const dir = cwd.substring(2);
            this.echo(dirs[dir].join('\n')); //FIXME: doesn't work?
        }
    },
    async joke() {
        const res = await fetch('https://v2.jokeapi.dev/joke/Programming');
        const data = await res.json();
        
        if (data.type == 'twopart') {
            this.animation( async () => {
                await this.echo(`Q: ${data.setup}`, {delay: 50, typing: true});
                await this.echo(`A: ${data.delivery}`, {delay: 50, typing: true});
            });
        } else if (data.type == 'single') {
            this.echo(data.joke, {delay: 50, typing: true});
        }
    },
    credits() {
        return [
            '',
            '<white>Libraries:</white>',
            '<white>',
            '* <a href="https://terminal.jcubic.pl">jQuery Terminal</a>',
            '* <a href="https://github.com/patorjk/figlet.js/">Figlet.js</a>',
            '* <a href="https://github.com/jcubic/isomorphic-lolcat">Isomorphic Lolcat</a>',
            '* <a href="https://jokeapi.dev/">Joke API</a>',
            '</white>',
            ''
        ].join('\n');
    },
    matrix() {
        let running = true;
        const cols = term.cols();
        const rows = term.rows();
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        function randomChar() {
            return chars.charAt(Math.floor(Math.random() * chars.length));
        }
        function draw() {
            if (!running) return;
            let output = '';
            for (let i = 0; i < rows; ++i) {
                let line = '';
                for (let j = 0; j < cols; ++j) {
                    line += `<mediumvioletred>${Math.random() > 0.9 ? randomChar() : ' '}</mediumvioletred>`;
                }
                output += line + '\n';
            }
            term.clear();
            term.echo(output);
            setTimeout(draw, 100);
        }
        draw();
        setTimeout(() => { running = false; term.clear(); }, 2000);
    },
    cowsay(...args) {
        const msg = args.join(' ') || "Moo!";
        const border = '-'.repeat(msg.length + 2);
        const cow = [
            ` ${border} `,
            `<mediumvioletred>< ${msg} ></mediumvioletred>`,
            ` ${border} `,
            "        \\   ^__^",
            "         \\  (oo)\\_______",
            "            (__)\\       )\\/\\",
            "                ||----w |",
            "                ||     ||"
        ].join('\n');
        // Apply glow to each line of the cow
        const glowing_cow = cow.split('\n').map(glow).join('\n');
        this.echo(`<white>${glowing_cow}</white>`);
    }
};

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

const command_list = Object.keys(commands);
command_list.forEach(cmd => {
    switch (cmd) {
        case 'help':
            commands[cmd].description = 'Show this help message';
            break;
        case 'clear':
            commands[cmd].description = 'Clear the terminal screen';
            break;
        case 'echo':
            commands[cmd].description = 'Print arguments to the terminal';
            break;
        case 'about':
            commands[cmd].description = 'Show information about this site';
            break;
        case 'cd':
            commands[cmd].description = 'Change directory';
            break;
        case 'ls':
            commands[cmd].description = 'List files in a directory';
            break;
        case 'joke':
            commands[cmd].description = 'Tell a programming joke';
            break;
        case 'credits':
            commands[cmd].description = 'Show credits and libraries used';
            break;
        case 'matrix':
            commands[cmd].description = 'Matrix rain animation';
            break;
        case 'cowsay':
            commands[cmd].description = 'Display a message with a cow';
            break;
        default:
            commands[cmd].description = '';
    }
});

// Calculate max command length for alignment
const maxCmdLength = Math.max(...command_list.map(cmd => cmd.length));
const formatted_list = command_list.map(cmd => {
    const pad = ' '.repeat(maxCmdLength - cmd.length + 2); // 2 spaces after command
    return `<white class="command">\t${cmd}${pad}<gray>${commands[cmd].description}</gray></white>`;
}).join('\n');
const help = '\n' + formatted_list;

const any_command_re = new RegExp(`^\s*(${command_list.join('|')})`);
$.terminal.new_formatter([any_command_re, '<mediumvioletred>$1</mediumvioletred>']);

// Header Logo Styling

const font = 'Graceful';

figlet.defaults({ fontPath: 'https://cdn.jsdelivr.net/gh/patorjk/figlet.js/fonts/' });
figlet.preloadFonts([font], ready);



const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false,
    exit: false,
    completion(string){
        //show completion suggestions for cd and ls into directories
        const cmd = this.get_command();
        const {name, rest} = $.terminal.parse_command(cmd);
        if (['cd', 'ls'].includes(name)) {
            if (rest.startsWith('~/')) {
                return Object.keys(dirs).map(dir => `~/${dir}`);
            }
            if (rest.startsWith('../')) {
                return Object.keys(dirs).map(dir => `../${dir}`);
            }
            if (cmd == root) {
                return dirs;
            }
        }
        return Object.keys(commands);
    },
    prompt
})

function glow(text) {
    // Wrap each character in a span with neon effect
    return `<span class="glow">${text}</span>`;
}

function ready() {
    const seed = 222;
    term.echo(() => {
        const ascii = glow(rainbow(render('Linda L.'), seed));
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
