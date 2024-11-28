import { test, expect } from '@playwright/test';

test('places page', async ({ page }) => {
    //LOGIN
    await page.goto('https://planner-buddy.vercel.app/login');

    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('Contraseña');
    const loginButton = page.getByRole('button', { name: 'Iniciar sesión' });

    await emailInput.fill('tester@gmail.com');
    await passwordInput.fill('123456');
    await loginButton.click();

    expect(await page.waitForURL('https://planner-buddy.vercel.app/home'));

    //PLACES PAGE
    await page.getByRole('link', { name: 'Lugares ¿Donde vamos? ¿Donde' }).click();

    expect(await page.waitForURL('https://planner-buddy.vercel.app/home/categories/catalogplaces', { timeout: 50000 }));

    await expect(page.getByRole('heading', { name: 'Cine' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Teatro' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Parque', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Museo' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Centro Comercial' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Restaurante' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Zoológico' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Parque de Atracciones' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Feria' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Acuario' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mirador' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Discoteca' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cafetería' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cervecería' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Catedral' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Playa' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Río' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Centro de Convenciones' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jardín Botánico' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Parque Nacional' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Centro Recreativo' })).toBeVisible();  
    await expect(page.getByRole('heading', { name: 'Centro de Arte' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Estadio' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Biblioteca' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Campo de Golf' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Galería de Arte' })).toBeVisible();  
    await expect(page.getByRole('heading', { name: 'Complejo Deportivo' })).toBeVisible();
});