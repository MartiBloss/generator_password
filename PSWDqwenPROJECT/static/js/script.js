document.getElementById('generateButton').addEventListener('click', function () {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;

    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    document.getElementById('passwordOutput').textContent = password;
    updateStrengthIndicator(password);
});

document.getElementById('copyButton').addEventListener('click', function () {
    const password = document.getElementById('passwordOutput').textContent;
    if (password) {
        navigator.clipboard.writeText(password).then(() => {
            const copyMessage = document.getElementById('copyMessage');
            copyMessage.textContent = 'Пароль скопирован в буфер обмена!';
            copyMessage.style.display = 'block';
            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 2000);
        });
    }
});

function generatePassword(length, uppercase, lowercase, numbers, symbols) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allowedChars = '';
    let password = '';

    if (uppercase) allowedChars += uppercaseChars;
    if (lowercase) allowedChars += lowercaseChars;
    if (numbers) allowedChars += numberChars;
    if (symbols) allowedChars += symbolChars;

    if (allowedChars.length === 0) return 'No options selected';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    return password;
}

function calculateStrength(password) {
    let strength = 0;

    // Проверяем наличие заглавных букв
    if (password.match(/[A-Z]/)) strength++;

    // Проверяем наличие строчных букв
    if (password.match(/[a-z]/)) strength++;

    // Проверяем наличие цифр
    if (password.match(/[0-9]/)) strength++;

    // Проверяем наличие спецсимволов
    if (password.match(/[^A-Za-z0-9]/)) strength++;

    // Проверяем длину пароля (>= 12 символов)
    if (password.length >= 12) strength++;

    console.log('Calculated strength:', strength); // Отладочный вывод
    return strength;
}

function updateStrengthIndicator(password) {
    const strengthBar = document.querySelector('#indicatorBar div');
    const strengthText = document.getElementById('strengthText');
    const strength = calculateStrength(password);

    if (strength < 3) {
        strengthBar.style.width = '33%';
        strengthBar.style.backgroundColor = 'red';
        strengthText.textContent = 'Ненадёжный: высокая вероятность потери аккаунта.';
    } else if (strength < 5) {
        strengthBar.style.width = '66%';
        strengthBar.style.backgroundColor = 'orange';
        strengthText.textContent = 'Средний: средняя вероятность потери аккаунта.';
    } else {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'green';
        strengthText.textContent = 'Надёжный: минимальная вероятность потери аккаунта.';
    }
}