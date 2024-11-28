import { test, expect } from '@playwright/test';

test('create event', async ({ page }) => {
    // LOGIN
    await page.goto('https://planner-buddy.vercel.app/login');

    const emailInput = page.getByLabel('Email');
    const loginPasswordInput = page.getByLabel('Contraseña');
    const loginButton = page.getByRole('button', { name: 'Iniciar sesión' });

    await emailInput.fill('tester@gmail.com');
    await loginPasswordInput.fill('123456');
    await loginButton.click();

    expect(await page.waitForURL('https://planner-buddy.vercel.app/home'));

    // CREATE EVENT
    const myEventsButton = page.getByRole('link', { name: 'Mis Eventos ¡Invitá a tus' })
    const createEventButton = page.getByRole('button', { name: 'Crear Evento' })
    const eventNameInput = page.locator('input[name="name"]')
    const plannedDateInput = page.locator('input[name="plannedDate"]')
    const passwordInput = page.locator('input[name="password"]')
    const eventName = 'Evento de prueba'
    const plannedDate = '0001-02-09'

    await myEventsButton.click();
    await createEventButton.click();
    await eventNameInput.fill(eventName);
    await plannedDateInput.fill(plannedDate);
    await passwordInput.fill('123456');
    await createEventButton.click();

    expect(await page.waitForURL(`https://planner-buddy.vercel.app/events/*`));

    expect(page.getByRole('heading', { name: eventName })).toBeVisible();
});