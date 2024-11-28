import { test, expect } from '@playwright/test';

test('register', async ({ page }) => {
    await page.goto('https://planner-buddy.vercel.app/register');

    const nameInput = page.getByLabel('Nombre:');
    const surnameInput = page.getByLabel('Apellido:');
    const usernameInput = page.getByLabel('Nombre de Usuario(*):');
    const birthdayInput = page.locator('input[name="birthDate"]');
    const emailnput = page.getByLabel('Email(*):');
    const passwordInput = page.getByLabel('Contraseña(*):');
    const registerButton = page.getByRole('button', { name: 'Registrarse' });

    await nameInput.fill('John');
    await surnameInput.fill('Doe');
    await usernameInput.fill('johndoe');
    await birthdayInput.fill('1990-01-01');
    await emailnput.fill('bmendeleiev@gmail.com');
    await passwordInput.fill('12345678');

    await registerButton.click();
});