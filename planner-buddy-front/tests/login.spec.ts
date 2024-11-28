import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
    await page.goto('https://planner-buddy.vercel.app/login');

    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('Contraseña');
    const loginButton = page.getByRole('button', { name: 'Iniciar sesión' });

    await emailInput.fill('tester@gmail.com');
    await passwordInput.fill('123456');
    await loginButton.click();

    expect(await page.waitForURL('https://planner-buddy.vercel.app/home'));
});