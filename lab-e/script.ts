const msg: string = "Hello!";
alert(msg);

const styles: string[] = [
    'styles/strona.css',
    'styles/strona2.css',
    'styles/strona3.css'
];

// Referencja do elementu <link> w HTML
const themeLink = document.getElementById('theme-link') as HTMLLinkElement;

// Funkcja zmieniająca styl CSS
function changeStyle(styleIndex: number): void {
    if (themeLink) {
        themeLink.setAttribute('href', styles[styleIndex]);
        localStorage.setItem('currentStyle', styleIndex.toString());
    }
}

// Funkcja generująca przyciski do zmiany stylu
function generateLinks(): void {
    const container = document.getElementById('style-links');
    if (container) {
        styles.forEach((style, index) => {
            const button = document.createElement('button');
            button.innerText = `Styl ${index + 1}`;
            button.id = `style${index + 1}`;
            button.addEventListener('click', () => changeStyle(index));
            container.appendChild(button);
        });
    }
}

// Funkcja do ustawiania stylu na podstawie zapisanej wartości w localStorage
function loadStoredStyle(): void {
    const storedStyle = localStorage.getItem('currentStyle');
    if (storedStyle && themeLink) {
        const styleIndex = parseInt(storedStyle);
        themeLink.setAttribute('href', styles[styleIndex]);
    }
}

// Inicjalizacja
window.onload = () => {
    loadStoredStyle();
    generateLinks();
};
