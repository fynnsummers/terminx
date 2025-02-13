const fileSystem = {
    "root": {
        "commands.txt": `Available commands:                       
        / -create file name                       
        / -create folder name                       
        / -rename file oldName newName                       
        / -rename folder oldName newName                       
        / -remove file name                       
        / -remove folder name                       
        / -open file name                       
        / -open folder name                       
        / -open folder name file name                       
        / -search file/folder name                       
        / -sort file name folder name                       
        / -pull file name folder name                       
        / -pull folder name folder name                       
        / -calculate number+*-number                       
        / -google query               
        / -rickroll        
        / -write file name content                        
        / -clear                       
        / -party                        
        / -colorchange                       
        / -quote                       
        / -date                       
        / -joke                       
        / -random                       
        / -clearfiles or -clearfolders                       
        / -help                    
        / -crash   
        / -mirror content                       
        / -flipcoin                       
        / -rps rock/paper/scissors                       
        / -morse content                        
        / -spinwheel content content                       
        / -decrypt content or -encrypt content                       
        / -playtext content                       
        / -invert or -devert                       
        / -shake                       
        / -hack      
        / -confetti 
        / -message #******** content                
        `
    }
};

function renderExplorer(folder = fileSystem["root"], path = "root", highlightItem = null) {
    const explorer = document.getElementById("explorer");
    explorer.innerHTML = `<div class="explorer-header">Explorer: <i style="color: orange;">${path}</i></div>`;
    for (let item in folder) {
        const isFolder = typeof folder[item] === "object";
        const highlightClass = item === highlightItem ? "highlight" : "";

        explorer.innerHTML += `<div class="${isFolder ? 'folder' : 'file'} ${highlightClass}" id="${item}">
            <i class="fa ${isFolder ? 'fa-folder' : 'fa-file'}" aria-hidden="true"></i>${item}
        </div>`;
    }
}

function executeCommand() {
    const commandInput = document.getElementById("command");
    const command = commandInput.value.trim();
    const output = document.getElementById("terminal-output");

    let message = `Unknown command: ${command}`;
    const args = command.split(" ");

    if (args[0] === "-create" && args[1] === "folder" && args[2]) {
        message = createFolder(args[2]);
    } else if (args[0] === "-playtext") {
            const text = args.slice(1).join(" "); 
            message = `Playing sound for text: "${text}"`;
            playSoundForText(text); 
    } else if (args[0] === "-date") {
            message = getCurrentDate();
        } else if (args[0] === "-quote") {
            message = getRandomQuote();
        } else if (args[0] === "-joke") {
            message = getRandomJoke();
        } else if (args[0] === "-rickroll") {
                rickRoll();
                message = "You just got Rickrolled!";
        } else if (args[0] === "-clearfolders") {
            message = clearAllFolders();
        } else if (args[0] === "-clearfiles") {
            message = clearAllFiles();
        } else if (args[0] === "-random") {
            message = getRandomNumber();
        } else if (args[0] === "-colorchange") {
            message = changeRandomColor(); 
        } else if (args[0] === "-invert") {
                invertColors();
                message = "Colors have been inverted!";
            } else if (args[0] === "-devert") {
                devertColors();
                message = "Colors have been deverted!";
            } else if (args[0] === "-shake") {
                    shakeScreen();
                    message = "Screen is shaking!";
        } else if (args[0] === "-mirror" && args[1]) {
            message = mirrorCommand(args.slice(1).join(" "));
        } else if (args[0] === "-flipcoin") {
            message = flipCoinCommand();
        } else if (args[0] === "-help") {
            message = listAllCommands();
        } else if (args[0] === "-confetti") {
                confettiEffect();
                message = "Let the celebration begin!";
        } else if (args[0] === "-adm") {
            launchAdminSettings();
            message = "Admin Settings mode launched!";
        } else if (args[0] === "-hallo") {
            message = hallo();
        } else if (args[0] === "-hack") {
                startHackEffect();
                message = "Starting hacking root...";
            } else if (args[0] === "-crash") {
                    message = crashPage();
        } else if (args[0] === "-encrypt" && args[1]) {
            message = encryptText(args.slice(1).join(" "));
        } else if (args[0] === "-decrypt" && args[1]) {
            message = decryptText(args.slice(1).join(" "));

        } else if (args[0] === "-message") {
            const id = args[1];
            const content = args.slice(2).join(" ");
        
            if (!id) {
                message = "Please specify an ID (e.g., #8dvdl4rs).";
            } else if (!content) {
                message = getMessagesForID(id);
            } else {
                message = sendMessageToID(id, content);
            }

        } else if (args[0] === "-rps" && args[1]) {
            message = rpsCommand(args[1].toLowerCase());
        } else if (args[0] === "-morse" && args[1]) {
            message = morseCommand(args.slice(1).join(" "));
        } else if (args[0] === "-spinwheel" && args[1]) {
            const options = args.slice(1);
            message = spinWheel(options);
    } else if (args[0] === "-create" && args[1] === "file" && args[2]) {
        message = createFile(args[2]);
    } else if (args[0] === "-files") {
        message = "Current directory contents:\n" + Object.keys(fileSystem["root"]).join(", ");
    } else if (args[0] === "-rename" && args[1] && args[2] && args[3]) {
        message = renameItem(args[1], args[2], args[3]);
    } else if (args[0] === "-remove" && args[1] && args[2]) {
        message = removeItem(args[1], args[2]);
    } else if (args[0] === "-calculate" && args[1]) {
        message = calculateExpression(args[1]);
    } else if (args[0] === "-google" && args[1]) {
        const searchQuery = args.slice(1).join("+");
        const searchLink = `https://www.google.com/search?q=${searchQuery}`;
        message = `Google search: <a href="${searchLink}" target="_blank">${searchLink}</a>`;
    } else if (args[0] === "-open" && args[1] && args[2]) {
        if (args[1] === "folder" && args[3]) {
            message = openItemInFolder(args[2], args[3]);
        } else {
            message = openItem(args[1], args[2]);
        }
    } else if (args[0] === "-sort" && args[1] && args[2] && args[3]) {
        message = sortItem(args[1], args[2], args[3]);
    } else if (args[0] === "-write" && args[1] && args[2]) {
        message = writeFile(args[1], args.slice(2).join(" "));
    } else if (args[0] === "-pull" && args[1] && args[2] && args[3]) {
        message = pullItem(args[1], args[2], args[3]);
    } else if (args[0] === "-clear") {
        clearTerminal();
        message = "Terminal cleared.";
    } else if (args[0] === "-party") {
        partyMode();
        message = "Party mode activated!";
    }

    output.innerHTML += `<div>${message}</div>`;
    output.scrollTop = output.scrollHeight;

    commandInput.value = "";
    renderExplorer();
}

function crashPage() {
    const body = document.body;
    const originalStyles = {
        backgroundColor: body.style.backgroundColor,
        transform: body.style.transform,
        transition: body.style.transition,
    };

    const annoyingSound = new Audio("linganguliguli-don-pollo.mp3");

    annoyingSound.loop = true;
    annoyingSound.play().catch((error) => {
        console.error("Audio konnte nicht abgespielt werden:", error);
        alert("⚠️ Ton wurde blockiert. Bitte interagiere mit der Seite und versuche es erneut!");
    });

    const glitchEffects = setInterval(() => {
        body.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        body.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 2}) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;

        const glitchText = document.createElement("div");
        glitchText.innerText = "CRITICAL ERROR! SYSTEM CRASHING!";
        glitchText.style.position = "fixed";
        glitchText.style.top = `${Math.random() * 100}%`;
        glitchText.style.left = `${Math.random() * 100}%`;
        glitchText.style.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        glitchText.style.fontSize = `${Math.random() * 48 + 12}px`;
        glitchText.style.fontWeight = "bold";
        glitchText.style.transform = `rotate(${Math.random() * 360}deg)`;
        glitchText.style.zIndex = 9999;
        document.body.appendChild(glitchText);

        setTimeout(() => glitchText.remove(), 1000);
    }, 100);

    setTimeout(() => {
        clearInterval(glitchEffects);
        annoyingSound.pause();
        annoyingSound.currentTime = 0;

        body.style.backgroundColor = originalStyles.backgroundColor;
        body.style.transform = originalStyles.transform;
        body.style.transition = originalStyles.transition;

        document.querySelectorAll("div[style]").forEach(el => el.remove());
        alert("Crash resolved. Just kidding! 😜");
    }, 10000);

    return "CRASH INITIATED! GOOD LUCK! 💥";
}

const messageDatabase = {};

function sendMessageToID(id, content) {
    if (!id.startsWith("#") || id.length !== 9) {
        return "Invalid ID format. It must start with '#' and have 8 characters (e.g., #8dvdl4rs).";
    }

    if (!messageDatabase[id]) {
        messageDatabase[id] = [];
    }

    messageDatabase[id].push(content);
    return `Message sent to ${id}: "${content}"`;
}

function getMessagesForID(id) {
    if (!messageDatabase[id]) {
        return `No messages found for ${id}.`;
    }

    return `Messages for ${id}:\n` + messageDatabase[id].join("\n");
}

function rickRoll() {
    const audio = new Audio("https://www.myinstants.com/media/sounds/rick-roll.mp3");
    audio.play();
}

function confettiEffect() {
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "fixed";
    confettiContainer.style.top = "0";
    confettiContainer.style.left = "0";
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100%";
    confettiContainer.style.pointerEvents = "none";
    confettiContainer.style.zIndex = "1000";
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.borderRadius = "5px";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * 100}vh`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = "fall 2s linear forwards"; 
        confettiContainer.appendChild(confetti);
    }

    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes fall {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        confettiContainer.remove();
        style.remove();
    }, 2000); 
}

function playSoundForText(text) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    function playTone(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); 
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    }

    let delay = 0; 
    const baseFrequency = 100; 

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const frequency = baseFrequency + (char.charCodeAt(0) % 100); 

        setTimeout(() => {
            playTone(frequency, 0.1); 
        }, delay);

        delay += 300; 
    }
}

function launchAdminSettings() {
    // Admin Settings Oberfläche erstellen
    const adminSettingsDiv = document.createElement("div");
    adminSettingsDiv.id = "admin-settings-screen";
    adminSettingsDiv.style.cssText = `
        background-color: darkred; 
        color: white; 
        font-family: monospace; 
        font-size: 20px; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 
        height: 100vh; 
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%;
        z-index: 9999;
        text-align: center;
    `;

    adminSettingsDiv.innerHTML = `
        <img src="https://i.kym-cdn.com/photos/images/original/001/806/594/50f.png" alt="dog" width="40%"> 
        <h1 style="border-bottom: 2px solid white; width: 80%; padding-bottom: 10px;">
            Admin Settings
        </h1>

        <div id="settings-options" style="margin-top: 30px; width: 50%; text-align: left;">
            <label for="font-size-select" style="display: block; margin-bottom: 10px;">
                Terminal Font Size:
            </label>
            <select id="font-size-select" style="width: 100%; padding: 5px; font-size: 18px;">
                <option value="14px">Small</option>
                <option value="16px" selected>Medium</option>
                <option value="20px">Large</option>
            </select>

            <label for="explorer-name-input" style="display: block; margin-top: 20px; margin-bottom: 10px;">
                Explorer Name:
            </label>
            <input id="explorer-name-input" type="text" placeholder="Enter Explorer Name" 
                   style="width: 100%; padding: 5px; font-size: 18px;" value="root"/>

            <div style="margin-top: 30px; text-align: center;">
                <button id="save-button" style="
                    padding: 10px 20px; 
                    margin-right: 10px; 
                    font-size: 18px; 
                    color: white; 
                    margin-top: 10px; 
                    background-color: green; 
                    border: none; 
                    cursor: pointer;">
                    Save Settings
                </button>

                <button id="reset-button" style="
                    padding: 10px 20px; 
                    margin-right: 10px; 
                    font-size: 18px; 
                    color: white; 
                    margin-top: 10px; 
                    background-color: orange; 
                    border: none; 
                    cursor: pointer;">
                    Reset to Default
                </button>

                <button id="exit-button" style="
                    padding: 10px 20px; 
                    font-size: 18px; 
                    margin-top: 10px; 
                    color: white; 
                    background-color: red; 
                    border: none; 
                    cursor: pointer;">
                    Exit
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(adminSettingsDiv);

    // Event-Listener für die Buttons
    document.getElementById("save-button").addEventListener("click", saveSettings);
    document.getElementById("reset-button").addEventListener("click", resetSettings);
    document.getElementById("exit-button").addEventListener("click", exitAdminSettings);
}

function saveSettings() {
    const fontSize = document.getElementById("font-size-select").value;
    const explorerName = document.getElementById("explorer-name-input").value;

    // Einstellungen speichern
    localStorage.setItem("terminalFontSize", fontSize);
    localStorage.setItem("explorerName", explorerName);

    // Anwenden der Änderungen
    applySettings();

    alert(`Settings saved!\nFont Size: ${fontSize}\nExplorer Name: ${explorerName}`);

    // Admin Settings schließen
    exitAdminSettings();
}

function resetSettings() {
    // Alle gespeicherten Daten entfernen
    localStorage.clear();
    fileSystem["root"] = {}; // Dateien und Ordner löschen

    alert("All settings and files have been reset!");

    // Admin Settings schließen
    exitAdminSettings();

    // Standardwerte anwenden
    applySettings();
}

function exitAdminSettings() {
    // Admin Settings verstecken
    const adminSettingsScreen = document.getElementById("admin-settings-screen");
    if (adminSettingsScreen) {
        adminSettingsScreen.remove();
    }

    // Änderungen anwenden, falls nötig
    applySettings();
}

function applySettings() {
    // Einstellungen aus localStorage holen
    const fontSize = localStorage.getItem("terminalFontSize") || "16px";
    const explorerName = localStorage.getItem("explorerName") || "root";

    // Schriftgröße des Terminals aktualisieren
    const terminal = document.getElementById("terminal");
    if (terminal) {
        terminal.style.fontSize = fontSize;
    }

    // Explorer-Namen aktualisieren mit `<i>`-Element in Orange
    const explorerHeader = document.querySelector(".explorer-header");
    if (explorerHeader) {
        explorerHeader.innerHTML = `Explorer: <i style="color: orange;">${explorerName}</i>`;
    }
}

function invertColors() {
    document.body.style.filter = 'invert(1)';
}


function devertColors() {
    document.body.style.filter = 'invert(0)';
}


function spinWheel(options) {
    const option = options[Math.floor(Math.random() * options.length)];
    return `The wheel chose: ${option}`;
}

function hallo() {
    return `Hallo :D `;
}

function shakeScreen() {
    const body = document.body;
    let i = 0;
    const shakeInterval = setInterval(() => {
        body.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
        i++;
        if (i > 30) {
            clearInterval(shakeInterval);
            body.style.transform = "none";
        }
    }, 50);
}

function startHackEffect() {
    const terminalOutput = document.getElementById("terminal-output");
    terminalOutput.innerHTML = "root.sys = usage:(-adm)";

    const hackMessages = [
        "Accessing secure server...",
        "Bypassing firewall...",
        "Extracting sensitive data...",
        "Injecting malicious code...",
        "Encrypting payload...",
        "Establishing remote connection...",
        "Uploading virus...",
        "Downloading confidential files...",
        "Spoofing IP address...",
        "Creating backdoor entry...",
        "Deploying trojan horse...",
        "System compromised...",
        "Launching brute force attack...",
        "Decoding encrypted files...",
        "Tracking network activity...",
        "Scanning for vulnerabilities...",
        "Disabling security protocols...",
        "Hijacking admin account...",
        "Installing spyware...",
        "Erasing system logs...",
        "Deploying ransomware payload...",
        "Generating fake credentials...",
        "Infiltrating mainframe...",
        "Monitoring keystrokes...",
        "Cloning system credentials...",
        "Phishing email sent...",
        "Executing SQL injection...",
        "Compiling exploit package...",
        "Root access granted...",
        "Overriding system permissions...",
        "Terminating firewall processes...",
        "Scanning for unpatched software...",
        "Gathering DNS information...",
        "Initiating DDoS attack...",
        "Planting logic bomb...",
        "Overloading CPU cores...",
        "Simulating user behavior...",
        "Extracting 2FA bypass codes...",
        "Uploading backdoor executable...",
        "Locking out legitimate users...",
        "Sending fake admin alerts...",
        "Shredding confidential documents...",
        "Uploading fake system update...",
        "Intercepting encrypted emails...",
        "Streaming live camera feeds..."
    ];
    

    let index = 0;
    const hackInterval = setInterval(() => {
        if (index < hackMessages.length) {
            const newMessage = document.createElement("div");
            newMessage.textContent = hackMessages[index];
            terminalOutput.appendChild(newMessage);
            index++;
        } else {
            clearInterval(hackInterval);
        }
    }, 50); 
}


function encryptText(text, shift = 3) {
    return text.split('').map((char) => {
        const code = char.charCodeAt(0);
        if (char.match(/[a-z]/i)) {
            let shifted = code + shift;
            if (char.toLowerCase() === char && shifted > 122) shifted -= 26;
            if (char.toUpperCase() === char && shifted > 90) shifted -= 26;
            return String.fromCharCode(shifted);
        }
        return char;
    }).join('');
}

function decryptText(text, shift = 3) {
    return encryptText(text, -shift); 
}


function morseCommand(text) {
    const morseCode = {
        "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---",
        "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
        "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--", "Z": "--..",
        "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
        " ": "/"
    };
    
    return text.toUpperCase().split("").map(char => morseCode[char] || "?").join(" ");
}

function rpsCommand(choice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = "It's a tie!";
    if (choice === "rock" && computerChoice === "scissors" ||
        choice === "paper" && computerChoice === "rock" ||
        choice === "scissors" && computerChoice === "paper") {
        result = "You win!";
        confettiEffect();
    } else if (choice !== computerChoice) {
        result = "You lose!";
    }

    return `You chose ${choice}. The computer chose ${computerChoice}. ${result}`;
}

function flipCoinCommand() {
    const result = Math.random() > 0.5 ? "Heads" : "Tails";
    return `You flipped a coin: ${result}`;
}

function mirrorCommand(text) {
    return text.split("").reverse().join("");
}

function getCurrentDate() {
    const date = new Date();
    return `Current date and time: ${date.toLocaleString()}`;
}

function getRandomQuote() {
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
        "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
        "In the middle of difficulty lies opportunity. - Albert Einstein",
        "The best way to predict the future is to create it. - Peter Drucker",
        "Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs",
        "It does not matter how slowly you go as long as you do not stop. - Confucius",
        "The journey of a thousand miles begins with one step. - Lao Tzu",
        "Don’t watch the clock; do what it does. Keep going. - Sam Levenson",
        "You miss 100% of the shots you don’t take. - Wayne Gretzky",
        "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
        "Believe you can and you’re halfway there. - Theodore Roosevelt",
        "It always seems impossible until it’s done. - Nelson Mandela",
        "Opportunities don't happen, you create them. - Chris Grosser",
        "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh",
        "You must be the change you wish to see in the world. - Mahatma Gandhi",
        "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
        "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
        "Don’t wait for opportunity. Create it. - Unknown",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Act as if what you do makes a difference. It does. - William James",
        "Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
        "We cannot solve our problems with the same thinking we used when we created them. - Albert Einstein",
        "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
        "Don’t be afraid to give up the good to go for the great. - John D. Rockefeller",
        "It’s not whether you get knocked down, it’s whether you get up. - Vince Lombardi",
        "Everything you’ve ever wanted is on the other side of fear. - George Addair",
        "You don’t have to be great to start, but you have to start to be great. - Zig Ziglar",
        "I find that the harder I work, the more luck I seem to have. - Thomas Jefferson",
        "The harder you work for something, the greater you’ll feel when you achieve it. - Unknown",
        "Do what you can with all you have, wherever you are. - Theodore Roosevelt",
        "Dream big and dare to fail. - Norman Vaughan",
        "A goal without a plan is just a wish. - Antoine de Saint-Exupéry",
        "The way to get started is to quit talking and begin doing. - Walt Disney",
        "Success is not in what you have, but who you are. - Bo Bennett",
        "I am not a product of my circumstances. I am a product of my decisions. - Stephen R. Covey",
        "Success doesn’t just find you. You have to go out and get it. - Unknown",
        "I find that the harder I work, the more luck I seem to have. - Thomas Jefferson",
        "If you want to achieve greatness stop asking for permission. - Unknown",
        "Don’t stop when you’re tired. Stop when you’re done. - Unknown",
        "The way to get started is to quit talking and begin doing. - Walt Disney",
        "It always seems impossible until it’s done. - Nelson Mandela",
        "The best revenge is massive success. - Frank Sinatra",
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
        "Life is what happens when you’re busy making other plans. - John Lennon",
        "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
        "You only live once, but if you do it right, once is enough. - Mae West",
        "Good things come to those who wait, but better things come to those who go out and get them. - Unknown",
        "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
        "Success is liking yourself, liking what you do, and liking how you do it. - Maya Angelou",
        "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart. - Roy T. Bennett",
        "It’s not the years in your life that count. It’s the life in your years. - Abraham Lincoln",
        "Do one thing every day that scares you. - Eleanor Roosevelt",
        "Be not afraid of life. Believe that life is worth living, and your belief will help create the fact. - William James",
        "Life is really simple, but we insist on making it complicated. - Confucius",
        "Success is the progressive realization of a worthy goal or ideal. - Earl Nightingale",
        "You have to learn the rules of the game. And then you have to play better than anyone else. - Albert Einstein",
        "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
        "The way to get started is to quit talking and begin doing. - Walt Disney",
        "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
        "The harder you work for something, the greater you’ll feel when you achieve it. - Unknown",
        "Don’t wait for opportunity. Create it. - Unknown",
        "Great things never come from comfort zones. - Neil Strauss",
        "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
        "Success is a journey, not a destination. - Arthur Ashe",
        "Don’t be afraid to give up the good to go for the great. - John D. Rockefeller",
        "Life isn’t about finding yourself. Life is about creating yourself. - George Bernard Shaw",
        "Life is short, and it is up to you to make it sweet. - Sarah Louise Delany",
        "The future depends on what we do in the present. - Mahatma Gandhi",
        "Success is liking yourself, liking what you do, and liking how you do it. - Maya Angelou",
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. - Christian D. Larson",
        "Success is the result of preparation, hard work, and learning from failure. - Colin Powell",
        "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh",
        "Don’t be afraid to start over. It’s a chance to build something better this time. - Unknown",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Nothing in the world can take the place of Persistence. Talent will not; nothing is more common than unsuccessful men with talent. - Calvin Coolidge",
        "Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
        "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
        "It does not matter how slowly you go as long as you do not stop. - Confucius",
        "Dream big and dare to fail. - Norman Vaughan",
        "Our lives are what our thoughts make it. - Marcus Aurelius",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
    ];
    
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function getRandomJoke() {
    const jokes = [
        "Why don't skeletons fight each other? They don't have the guts.",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "Why do cows have hooves instead of feet? Because they lactose.",
        "I used to play piano by ear, but now I use my hands.",
        "I told my wife she was getting too emotional during our fight. She said I was too logical. I guess we’re evenly matched.",
        "Why don’t oysters share their pearls? Because they’re shellfish.",
        "I asked my dog what’s two minus two. He said nothing.",
        "I couldn’t figure out how to put my seatbelt on, then it clicked.",
        "I couldn’t remember how to throw a boomerang, but then it came back to me.",
        "I used to be a baker, but I couldn't make enough dough.",
        "I only know 25 letters of the alphabet. I don’t know y.",
        "I told my computer I needed a break, and now it won’t stop sending me Kit-Kats.",
        "I used to be a mathematician, but I didn’t have enough problems.",
        "Why do bees have sticky hair? Because they use honeycombs.",
        "I’m reading a book on anti-gravity. It’s impossible to put down!",
        "I bought some shoes from a drug dealer. I don’t know what he laced them with, but I’ve been tripping all day.",
        "I told my computer I wanted a new keyboard. It didn’t respond.",
        "I’m on a seafood diet. I see food, and I eat it.",
        "I tried to catch some fog yesterday. I mist.",
        "I don’t trust stairs because they’re always up to something.",
        "I tried to play hide and seek, but I couldn’t find anyone who wanted to hide.",
        "I named my dog 'Five Miles' so I can say I walk Five Miles every day.",
        "I'm friends with all electricians. We have such good current connections.",
        "Why don’t skeletons ever use cell phones? Because they don’t have the nerve.",
        "My friend said he didn’t understand cloning. I told him, 'That makes two of us.'",
        "I used to be a Velcro expert, but I couldn’t stick with it.",
        "I can’t trust these stairs anymore. They’re always up to something.",
        "I told my computer I was having a hard time, and it froze.",
        "The shovel was a groundbreaking invention.",
        "My wife told me I should do lunges to stay in shape. That would be a big step forward.",
        "I asked the librarian if the library had any books on paranoia. She whispered, 'They're right behind you.'",
        "I don’t trust atoms. They make up everything.",
        "I don’t have a joke about construction... I’m still working on it.",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "I used to play piano by ear, but now I use my hands.",
        "I’m trying to lose weight, but it’s not working. Every time I diet, I gain pounds.",
        "I’m on a whiskey diet. I’ve lost three days already.",
        "I’m afraid for the calendar. Its days are numbered.",
        "The problem with candy jokes is they’re just too sweet.",
        "I would tell you a joke about an elevator, but it’s an uplifting experience.",
        "I have a joke about a boomerang, but it’ll come back to me later.",
        "I used to play piano by ear, but now I use my hands.",
        "I used to be a baker, but I couldn’t make enough dough.",
        "I don’t have a joke about elevators, it’s an uplifting topic.",
        "I tried to make a belt out of watches. It was a waist of time.",
        "I tried to catch some fog yesterday. I mist.",
        "I asked my dog what’s two minus two. He said nothing.",
        "What did the grape do when it got stepped on? Nothing, but it let out a little wine.",
        "Why don’t skeletons fight each other? They don’t have the guts.",
        "I couldn’t figure out how to put my seatbelt on, then it clicked.",
        "Why don’t oysters share their pearls? Because they’re shellfish.",
        "I used to play piano by ear, but now I use my hands.",
        "Why do cows have hooves instead of feet? Because they lactose.",
        "I used to be a baker, but I couldn’t make enough dough.",
        "I only know 25 letters of the alphabet. I don’t know y.",
        "I told my computer I needed a break, and now it won’t stop sending me Kit-Kats.",
        "I used to be a mathematician, but I didn’t have enough problems.",
        "Why do bees have sticky hair? Because they use honeycombs.",
        "I’m reading a book on anti-gravity. It’s impossible to put down!",
        "I bought some shoes from a drug dealer. I don’t know what he laced them with, but I’ve been tripping all day.",
        "I told my computer I wanted a new keyboard. It didn’t respond.",
        "I’m on a seafood diet. I see food, and I eat it.",
        "I tried to catch some fog yesterday. I mist.",
        "I don’t trust stairs because they’re always up to something.",
        "I tried to play hide and seek, but I couldn’t find anyone who wanted to hide.",
        "I named my dog 'Five Miles' so I can say I walk Five Miles every day.",
        "I'm friends with all electricians. We have such good current connections.",
        "Why don’t skeletons ever use cell phones? Because they don’t have the nerve.",
        "My friend said he didn’t understand cloning. I told him, 'That makes two of us.'",
        "I used to be a Velcro expert, but I couldn’t stick with it.",
        "I can’t trust these stairs anymore. They’re always up to something.",
        "I told my computer I was having a hard time, and it froze.",
        "The shovel was a groundbreaking invention.",
        "My wife told me I should do lunges to stay in shape. That would be a big step forward.",
        "I asked the librarian if the library had any books on paranoia. She whispered, 'They're right behind you.'",
        "I don’t trust atoms. They make up everything.",
        "I don’t have a joke about construction... I’m still working on it.",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "I used to play piano by ear, but now I use my hands.",
        "I’m trying to lose weight, but it’s not working. Every time I diet, I gain pounds.",
        "I’m on a whiskey diet. I’ve lost three days already.",
        "I’m afraid for the calendar. Its days are numbered.",
        "The problem with candy jokes is they’re just too sweet.",
        "I would tell you a joke about an elevator, but it’s an uplifting experience.",
        "I have a joke about a boomerang, but it’ll come back to me later.",
        "I used to play piano by ear, but now I use my hands.",
        "I used to be a baker, but I couldn’t make enough dough.",
        "I don’t have a joke about elevators, it’s an uplifting topic.",
        "I tried to make a belt out of watches. It was a waist of time.",
        "I tried to catch some fog yesterday. I mist.",
        "I asked my dog what’s two minus two. He said nothing."
    ];
    
    return jokes[Math.floor(Math.random() * jokes.length)];
}

function clearAllFolders() {
    for (let item in fileSystem["root"]) {
        if (typeof fileSystem["root"][item] === "object") {
            delete fileSystem["root"][item];
        }
    }
    return "All folders in the root directory have been deleted.";
}

function getRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return `Random number: ${randomNumber}`;
}

function changeRandomColor() {
    const body = document.body;
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    body.style.backgroundColor = randomColor;
    return `Background color changed to ${randomColor}`;
}

function createFolder(name) {
    if (fileSystem["root"][name]) {
        return `Error: A folder or file with the name "${name}" already exists.`;
    }
    fileSystem["root"][name] = {};
    return `Folder created: ${name}`;
}

function createFile(name) {
    if (fileSystem["root"][name]) {
        return `Error: A folder or file with the name "${name}" already exists.`;
    }
    fileSystem["root"][name] = `Content of ${name}`;
    return `File created: ${name}`;
}

function renameItem(type, oldName, newName) {
    if (!fileSystem["root"][oldName]) {
        return `${type} not found: ${oldName}`;
    }
    if (fileSystem["root"][newName]) {
        return `Error: A folder or file with the name "${newName}" already exists.`;
    }
    fileSystem["root"][newName] = fileSystem["root"][oldName];
    delete fileSystem["root"][oldName];
    return `${type} renamed from ${oldName} to ${newName}`;
}

function removeItem(type, name) {
    if (fileSystem["root"][name]) {
        delete fileSystem["root"][name];
        return `${type} removed: ${name}`;
    }
    return `${type} not found: ${name}`;
}

function calculateExpression(expression) {
    try {
        const result = eval(expression.replace(/[^-()\d/*+.]/g, ""));
        return `Result: ${result}`;
    } catch {
        return `Invalid calculation: ${expression}`;
    }
}

function openItem(type, name) {
    const item = fileSystem["root"][name];
    if (!item) {
        return `${type} not found: ${name}`;
    }
    if (type === "file") {
        return `Content of ${name}: ${item}`;
    }
    if (type === "folder" && typeof item === "object") {
        return `Files in folder "${name}": ${Object.keys(item).join(", ")}`;
    }
    return `${type} not found or invalid: ${name}`;
}

function openItemInFolder(folderName, fileName) {
    const folder = fileSystem["root"][folderName];
    if (!folder || typeof folder !== "object") {
        return `Folder not found: ${folderName}`;
    }
    const file = folder[fileName];
    if (!file) {
        return `File not found in folder "${folderName}": ${fileName}`;
    }
    return `Content of ${fileName} in folder "${folderName}": ${file}`;
}

function sortItem(type, fileName, folderName) {
    if (!fileSystem["root"][fileName]) {
        return `${type} not found: ${fileName}`;
    }
    if (!fileSystem["root"][folderName] || typeof fileSystem["root"][folderName] !== "object") {
        return `Folder not found: ${folderName}`;
    }
    fileSystem["root"][folderName][fileName] = fileSystem["root"][fileName];
    delete fileSystem["root"][fileName];
    return `${fileName} moved to folder ${folderName}`;
}

function writeFile(fileName, content) {
    if (!fileSystem["root"][fileName]) {
        return `File not found: ${fileName}`;
    }
    fileSystem["root"][fileName] = content;
    return `Content written to ${fileName}: ${content}`;
}

function clearTerminal() {
    const output = document.getElementById("terminal-output");
    output.innerHTML = "";
}



function partyMode() {
    const body = document.body;
    const originalStyles = {
        backgroundColor: body.style.backgroundColor,
        transition: body.style.transition,
    };

    const partySound = new Audio("cool-techno-music.mp3"); 

    partySound.loop = true;  
    partySound.play().catch((error) => {
        console.error("Audio konnte nicht abgespielt werden:", error);
        alert("⚠️ Ton wurde blockiert. Bitte interagiere mit der Seite und versuche es erneut!");
    });

    body.style.transition = "none";

    let intervalId = setInterval(() => {
        body.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        const elements = document.querySelectorAll("*");
        elements.forEach(el => {
            el.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
        });
    }, 10);

    setTimeout(() => {
        clearInterval(intervalId);
        body.style.backgroundColor = originalStyles.backgroundColor;
        body.style.transition = originalStyles.transition;

        const elements = document.querySelectorAll("*");
        elements.forEach(el => {
            el.style.transform = "none";
        });

        partySound.pause();
        partySound.currentTime = 0;
    }, 6000);
}


function pullItem(type, name, folderName) {
    const folder = fileSystem["root"][folderName];
    if (!folder || typeof folder !== "object") {
        return `Folder not found: ${folderName}`;
    }

    if (type === "file") {
        const file = folder[name];
        if (!file) {
            return `File not found in folder "${folderName}": ${name}`;
        }
        fileSystem["root"][name] = file;
        delete folder[name];
        return `File "${name}" pulled out of folder "${folderName}" to root.`;
    }

    if (type === "folder") {
        const subFolder = folder[name];
        if (!subFolder || typeof subFolder !== "object") {
            return `Folder not found in folder "${folderName}": ${name}`;
        }
        fileSystem["root"][name] = subFolder;
        delete folder[name];
        return `Folder "${name}" pulled out of folder "${folderName}" to root.`;
    }

    return `Invalid type "${type}". Use "file" or "folder".`;
}

function listAllCommands() {
    return "Go Fuck ur self... i dont want to help :D \n" ;
}

function generateRandomID() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomID = "";
    for (let i = 0; i < 8; i++) {
        randomID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomID;
}

window.onload = function () {
    const randomID = generateRandomID();
    const idElement = document.getElementById("random-id"); 
    if (idElement) {
        idElement.textContent = randomID; 
    }
};



document.getElementById("command").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        executeCommand();
    }
});

renderExplorer();
