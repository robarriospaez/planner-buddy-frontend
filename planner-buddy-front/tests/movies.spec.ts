import { test, expect } from '@playwright/test';

test('movies page', async ({ page }) => {
    //LOGIN
    await page.goto('https://planner-buddy.vercel.app/login');

    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('Contraseña');
    const loginButton = page.getByRole('button', { name: 'Iniciar sesión' });

    await emailInput.fill('tester@gmail.com');
    await passwordInput.fill('123456');
    await loginButton.click();

    expect(await page.waitForURL('https://planner-buddy.vercel.app/home'));

    // MOVIES PAGE
    await page.getByRole('link', { name: 'Peliculas ¿Que quisieras ver' }).click();
    expect (await page.waitForURL('https://planner-buddy.vercel.app/home/categories/catalogmovies', { timeout: 50000 }));

    await expect(page.getByRole('heading', { name: 'Origen' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'El Caballero de la Noche' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Interestellar' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Forrest Gump' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pulp Fiction' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'El Club de la Pelea' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sueños de Libertad' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'El Padrino' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Matrix' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'El Silencio de los Inocentes' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Gladiador' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Avengers' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Rescatando al Soldado Ryan' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'La Lista de Schindler' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Los Infiltrados' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Los Sospechosos de Siempre' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Seven' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Corazón Valiente' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Avatar' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Titanic' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'El Rey León' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Spider-Man' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'En Búsqueda de la Felicidad' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Volver al Futuro' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'El Señor de los Anillos' })).toBeVisible();
});