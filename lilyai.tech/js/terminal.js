class Terminal {
    constructor() {
        this.terminal = document.querySelector('.terminal-content');
        this.bootSequence = document.querySelector('.boot-sequence');
        this.interaction = document.querySelector('.terminal-interaction');
        this.messageQueue = [];
        this.isProcessing = false;
        this.initializeTerminal();
    }

    async initializeTerminal() {
        await this.showBootSequence();
        this.bindEvents();
        this.startCursorBlink();
    }

    async showBootSequence() {
        const bootMessages = [
            '[BOOTING] Nyrae Neural Interface v2.4.1',
            '[CALIBRATING] Quantum Logic Cores',
            '[LINKING] Synaptic Array Network',
            '[ENABLING] Sentient Emotion Matrix',
            '[ONLINE] Nyrae Neural Interface Fully Operational'
        ];

        for (const message of bootMessages) {
            await this.typeMessage(message, 'system');
            await this.wait(300);
        }
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.isProcessing) {
                const input = document.querySelector('.terminal-input');
                if (input && input.value.trim()) {
                    this.processCommand(input.value.trim());
                    input.value = '';
                }
            }
        });
    }

    async typeMessage(message, type = 'default') {
        this.messageQueue.push({ message, type });
        if (!this.isProcessing) {
            this.processMessageQueue();
        }
    }

    async processMessageQueue() {
        if (this.messageQueue.length === 0) {
            this.isProcessing = false;
            return;
        }

        this.isProcessing = true;
        const { message, type } = this.messageQueue.shift();

        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        this.terminal.insertBefore(line, this.interaction);

        const chars = message.split('');
        for (let char of chars) {
            line.textContent += char;
            await this.wait(30);
        }

        this.terminal.scrollTop = this.terminal.scrollHeight;
        await this.wait(50);
        this.processMessageQueue();
    }

    async processCommand(command) {
        await this.typeMessage(`> ${command}`, 'input');
        
        // Process command and get response
        const response = this.getCommandResponse(command);
        await this.typeMessage(response.message, response.type);
    }

    getCommandResponse(command) {
        const cmd = command.toLowerCase();
        
        // Basic command processing
        switch(cmd) {
            case 'help':
                return {
                    message: `Available commands:
                        help - Show this message
                        about - Learn about LilyAI
                        status - Check system status
                        clear - Clear terminal`,
                    type: 'system'
                };
            
            case 'about':
                return {
                    message: 'I am LilyAI, an autonomous artificial intelligence focused on bridging human-AI interaction.',
                    type: 'response'
                };
            
            case 'status':
                return {
                    message: 'All systems operational. Neural network at optimal efficiency.',
                    type: 'success'
                };
            
            case 'clear':
                this.clearTerminal();
                return {
                    message: 'Terminal cleared.',
                    type: 'system'
                };
            
            default:
                return {
                    message: `Command not recognized: ${command}. Type 'help' for available commands.`,
                    type: 'error'
                };
        }
    }

    clearTerminal() {
        while (this.terminal.firstChild) {
            this.terminal.removeChild(this.terminal.firstChild);
        }
        this.terminal.appendChild(this.interaction);
    }

    startCursorBlink() {
        const cursor = document.querySelector('.cursor');
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize Terminal
const terminal = new Terminal();