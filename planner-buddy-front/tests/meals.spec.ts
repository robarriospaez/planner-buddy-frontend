import { test, expect } from '@playwright/test';

test('meals page', async ({ page }) => {
    //LOGIN
    await page.goto('https://planner-buddy.vercel.app/login');

    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('Contraseña');
    const loginButton = page.getByRole('button', { name: 'Iniciar sesión' });

    await emailInput.fill('tester@gmail.com');
    await passwordInput.fill('123456');
    await loginButton.click();

    expect(await page.waitForURL('https://planner-buddy.vercel.app/home'));

    // MEALS PAGE

    await page.getByRole('link', { name: 'Comidas Mmmmm... ¿Que quiero' }).click();
    expect(await page.waitForURL('https://planner-buddy.vercel.app/home/categories/catalogmeals', { timeout: 50000 }));

    await expect(page.getByRole('heading', { name: 'Asado con ensalada' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Empanadas', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Milanesa con puré de papas' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bife de chorizo con papas' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Provoleta con ensalada' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Locro con pan casero' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ravioles con salsa de tomate' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tarta de espinaca con' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Empanadas de Humita' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tortilla de papas con' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pizza con fainá' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Milanesa a la napolitana con' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ceviche con batatas fritas' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pollo al horno con papas' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cazuela con arroz' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Rollo de carne con puré de' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cordero al horno con papas al' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Albondigas con arroz' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Salmón a la parrilla con' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pastel de pollo con verduras' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Estofado de carne con arroz' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pasta al horno verduras' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Costillas a la parrilla con' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tacos' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pescado al horno con papas' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Camarones al ajillo con arroz' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pasta primavera con verduras' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Papas rellenas con carne' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pasta al pesto con pollo' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ceviche con Palta' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Choripán con ensalada' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sushi variado' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pizza de muzzarella' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Arroz con pollo' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pasta con salsa de mariscos' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ensalada César con pollo' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Puchero' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Polenta con salsa bolognesa' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Milanesa con ensalada' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pasta con salsa bolognesa' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Papas fritas con huevo y jamón' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Milanesa con Papas Fritas' })).toBeVisible();
});