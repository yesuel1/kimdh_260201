class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        const ball = document.createElement('div');
        ball.textContent = number;

        const style = document.createElement('style');
        style.textContent = `
            div {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                font-weight: bold;
                color: #fff;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                background-color: ${this.getColor(number)};
            }
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(ball);
    }

    getColor(number) {
        const num = parseInt(number);
        if (num <= 10) return '#f44336'; // Red
        if (num <= 20) return '#ff9800'; // Orange
        if (num <= 30) return '#4caf50'; // Green
        if (num <= 40) return '#2196f3'; // Blue
        return '#9c27b0'; // Purple
    }
}

customElements.define('lotto-ball', LottoBall);

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize authentication
    await initAuth();

    const generateBtn = document.getElementById('generate-btn');
    const numbersContainer = document.getElementById('numbers-container');
    const bonusContainer = document.getElementById('bonus-container');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Dark mode toggle
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    });

    // Generate lotto numbers
    generateBtn.addEventListener('click', () => {
        numbersContainer.innerHTML = '';
        bonusContainer.innerHTML = '';

        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        for (const number of sortedNumbers) {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            numbersContainer.appendChild(lottoBall);
        }

        // Generate bonus number (different from main numbers)
        let bonusNumber;
        do {
            bonusNumber = Math.floor(Math.random() * 45) + 1;
        } while (numbers.has(bonusNumber));

        const bonusBall = document.createElement('lotto-ball');
        bonusBall.setAttribute('number', bonusNumber);
        bonusContainer.appendChild(bonusBall);
    });
});
