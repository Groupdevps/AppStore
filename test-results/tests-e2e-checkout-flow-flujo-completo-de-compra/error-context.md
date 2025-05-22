# Test info

- Name: flujo completo de compra
- Location: /home/dan/projects/react/store/appstore/tests/e2e/checkout-flow.spec.ts:3:5

# Error details

```
TimeoutError: page.waitForSelector: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Pay with Simulated PayPal")') to be visible

    at /home/dan/projects/react/store/appstore/tests/e2e/checkout-flow.spec.ts:38:14
```

# Page snapshot

```yaml
- banner:
  - link "Julie":
    - /url: /
  - navigation:
    - link "Home":
      - /url: /
    - link "Shop":
      - /url: /shop
    - link "Product":
      - /url: /products
    - link "Blog":
      - /url: /blog
    - link "Contact":
      - /url: /contact
    - link "About":
      - /url: /about
  - button
  - button "User menu"
  - link "1":
    - /url: /cart
- main:
  - img "Signup"
  - heading "Create Account" [level=2]
  - text: or
  - button "Google"
  - button "Facebook"
  - textbox "Email"
  - textbox "Password"
  - button "Sign In"
  - paragraph:
    - text: Register an account?
    - link "Sign up":
      - /url: /register
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('flujo completo de compra', async ({ page }) => {
   4 |   // 1. Ir a la página principal
   5 |   await page.goto('http://localhost:3000/');
   6 |
   7 |   // 2. Seleccionar el primer producto y agregarlo al carrito
   8 |   await page.click('a[href^="/product/"]'); // Selecciona el primer producto
   9 |   await page.click('button:has-text("Add to Cart")');
  10 |
  11 |   // 3. Ir al carrito
  12 |   await page.click('a[href="/cart"]');
  13 |
  14 |   // 4. Proceder al pago
  15 |   await page.click('button:has-text("Proceder al Pago")');
  16 |     let isRegistered = true
  17 |   // 5. Si pide login, hacer login
  18 |   if (await page.isVisible('input[name="email"]')) {
  19 |     isRegistered = false;
  20 |     await page.fill('input[name="email"]', 'testuser@example.com');
  21 |     await page.fill('input[name="password"]', 'testpassword');
  22 |     await page.click('button[type="submit"]');
  23 |   }
  24 |
  25 |   // 6. Llenar datos de envío si se solicita
  26 |   if (await page.isVisible('input[placeholder="Dirección"]')) {
  27 |     isRegistered = false;
  28 |     await page.fill('input[placeholder="Dirección"]', 'Calle Falsa 123');
  29 |     await page.fill('input[placeholder="Código Postal"]', '12345');
  30 |     await page.click('button:has-text("Guardar información")');
  31 |   }
  32 |   // validar si fue registrado o no
  33 |   // Si no fue registrado, se debe hacer clic en "Proceder al Pago" nuevamente
  34 |   if(!isRegistered){
  35 |     await page.click('button:has-text("Proceder al Pago")')
  36 |   }
  37 |   // 7. Pagar
> 38 |   await page.waitForSelector('button:has-text("Pay with Simulated PayPal")', { timeout: 5000 });
     |              ^ TimeoutError: page.waitForSelector: Timeout 5000ms exceeded.
  39 | //   await expect(page.getByRole('button', { name: 'Pay with Simulated PayPal' })).toBeVisible();
  40 |   await page.click('button:has-text("Pay with Simulated PayPal")');
  41 |
  42 |   // 8. Verificar mensaje de éxito
  43 |    await page.waitForSelector('button:has-text("Pago realizado con éxito")', { timeout: 5000 });
  44 |   await expect(page.locator('text=¡Pago realizado con éxito!')).toBeVisible();
  45 | });
```