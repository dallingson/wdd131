const themeSelector = document.querySelector('#theme-selector')

function changeTheme() {
    const selectedTheme = themeSelector.value;
    const logo = document.querySelector('.logo'); // select the logo image

    if (selectedTheme === 'dark') {
        document.body.classList.add('dark');
        logo.src = 'byui-logo_white.png'; // use the white logo for dark theme
    } else {
        document.body.classList.remove('dark');
        logo.src = 'byui-logo_blue.webp'; // use the blue logo for light theme
    }
}

themeSelector.addEventListener('change', changeTheme);