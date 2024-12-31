export function togglePasswordVisibility(toggleButton, passwordInput) {
    let visible = false;
    toggleButton.addEventListener("click", function () {
        if (visible) {
            passwordInput.type = "password";
            toggleButton.textContent = "Show";
            visible = false;
        } else {
            passwordInput.type = "text";
            toggleButton.textContent = "Hide";
            visible = true;
        }
    });
}

export function calculateStrength(password) {
    let upperCase = /[A-Z]/g;
    let lowerCase = /[a-z]/g;
    let numbers = /[0-9]/g;
    let symbols = /[^A-Za-z0-9]/g;

    let strength = 0;
    if (password.match(upperCase)) strength += 30;
    if (password.match(lowerCase)) strength += 30;
    if (password.match(numbers)) strength += 20;
    if (password.match(symbols)) strength += 20;

    if (password.length < 8) strength -= 20;
    if (password.length < 6) strength -= 30;

    return Math.max(0, Math.min(strength, 100));
}

export function getPasswordStrengthLabel(strength) {
    if (strength < 25) {
        return "Very Weak";
    } else if (strength < 50) {
        return "Weak";
    } else if (strength < 75) {
        return "Good";
    } else {
        return "Strong";
    }
}

export function calculateTimeToCrack(password, strength) {
    let seconds = Math.pow(26, password.length) / 1e6;

    if (strength < 25) {
        seconds *= 0.001;
    } else if (strength < 50) {
        seconds *= 1;
    } else if (strength < 75) {
        seconds *= 10;
    } else {
        seconds *= 100;
    }

    if (seconds < 1) {
        return "less than a second";
    } else if (seconds < 10) {
        return "1 second";
    } else if (seconds < 60) {
        return Math.round(seconds) + " seconds";
    } else if (seconds < 3600) {
        return Math.round(seconds / 60) + " minutes";
    } else if (seconds < 86400) {
        return Math.round(seconds / 3600) + " hours";
    } else if (seconds < 31536000) {
        return Math.round(seconds / 86400) + " days";
    } else {
        return "centuries";
    }
}
