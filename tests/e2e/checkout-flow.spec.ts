import { test, expect } from '@playwright/test';

test('flujo completo de compra', async ({ page }) => {
  // 1. Ir a la página principal
  await page.goto('http://localhost:3000/');

  // 2. Seleccionar el primer producto y agregarlo al carrito
  await page.click('a[href^="/product/"]'); // Selecciona el primer producto
  await page.click('button:has-text("Add to Cart")');

  // 3. Ir al carrito
  await page.click('a[href="/cart"]');

  // 4. Proceder al pago
  await page.click('button:has-text("Proceder al Pago")');
    let isRegistered = true
  // 5. Si pide login, hacer login
  if (await page.isVisible('input[name="email"]')) {
    isRegistered = false;
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'testpassword');
    await page.click('button[type="submit"]');
  }

  // 6. Llenar datos de envío si se solicita
  if (await page.isVisible('input[placeholder="Dirección"]')) {
    isRegistered = false;
    await page.fill('input[placeholder="Dirección"]', 'Calle Falsa 123');
    await page.fill('input[placeholder="Código Postal"]', '12345');
    await page.click('button:has-text("Guardar información")');
  }
  // validar si fue registrado o no
  // Si no fue registrado, se debe hacer clic en "Proceder al Pago" nuevamente
  if(!isRegistered){
    await page.click('button:has-text("Proceder al Pago")')
  }
  // 7. Pagar
  await page.waitForSelector('button:has-text("Pay with Simulated PayPal")', { timeout: 10000 });
//   await expect(page.getByRole('button', { name: 'Pay with Simulated PayPal' })).toBeVisible();
  await page.click('button:has-text("Pay with Simulated PayPal")');

  // 8. Verificar mensaje de éxito

//    await page.waitForSelector('button:has-text("Pago realizado con éxito")', { timeout: 5000 });
  await expect(page.locator('text=¡Pago realizado con éxito!')).toBeVisible();
});