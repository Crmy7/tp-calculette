import { test, expect } from "@playwright/test";

test.describe("Calculator Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Naviguer vers l'application avant chaque test
    await page.goto("http://localhost:5173/");
  });

  // Tester chaque touche pour s'assurer qu'elle affiche le bon nombre
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (const number of numbers) {
    test(`Button ${number} displays ${number}`, async ({ page }) => {
      await page.locator(`button:has-text("${number}")`).click();
      const screen = await page.locator(".screen");
      await expect(screen).toHaveText(number);
    });
  }

  // Tester une addition
  // Ce test est supposé ne pas passer car il y a un bug dans la calulette
  test("Addition operation", async ({ page }) => {
    await page.locator('button:has-text("2")').click();
    await page.locator('button:has-text("sum")').click();
    await page.locator('button:has-text("3")').click();
    await page.locator(".btnEqual").click();
    const screen = await page.locator(".screen");
    await expect(screen).toHaveText("5");
  });

  // Tester une addition avec une retenue
  test("Addition operation with carry", async ({ page }) => {
    await page.locator('button:has-text("7")').click();
    await page.locator('button:has-text("sum")').click();
    await page.locator('button:has-text("8")').click();
    await page.locator(".btnEqual").click();
    const screen = await page.locator(".screen");
    await expect(screen).toHaveText("15");
  });

  // Tester une soustraction
  test("Subtraction operation", async ({ page }) => {
    await page.locator('button:has-text("5")').click();
    await page.locator('button:has-text("soustraction")').click();
    await page.locator('button:has-text("3")').click();
    await page.locator(".btnEqual").click();
    const screen = await page.locator(".screen");
    await expect(screen).toHaveText("2");
  });

  // Tester une soustraction avec un résultat négatif
  test("Subtraction operation with negative result", async ({ page }) => {
    await page.locator('button:has-text("3")').click();
    await page.locator('button:has-text("soustraction")').click();
    await page.locator('button:has-text("5")').click();
    await page.locator(".btnEqual").click();
    const screen = await page.locator(".screen");
    await expect(screen).toHaveText("-2");
  });

  // Tester une multiplication
  test("Multiplication operation", async ({ page }) => {
    await page.locator('button:has-text("3")').click();
    await page.locator('button:has-text("multiplication")').click();
    await page.locator('button:has-text("2")').click();
    await page.locator(".btnEqual").click();
    const screen = await page.locator(".screen");
    await expect(screen).toHaveText("6");
  });

  // Tester une multiplication par zéro
  test("Multiplication operation by zero", async ({ page }) => {
    await page.locator('button:has-text("3")').click();
    await page.locator('button:has-text("multiplication")').click();
    await page.locator('button:has-text("0")').click();
    await page.locator(".btnEqual").click();
    const screen = await page.locator(".screen");
    await expect(screen).toHaveText("0");
  });

  // Tester avec une retenue
  test("Carry over test", async ({ page }) => {
    await page.locator('button:has-text("8")').click();
    await page.locator('button:has-text("sum")').click();
    await page.locator('button:has-text("8")').click();
    await page.locator(".btnEqual").click();
    const screen = await page.locator(".screen");
    await expect(screen).toHaveText("16");
  });

  // Tester la fonctionnalité du bouton de remise à zéro
  test("Reset button functionality", async ({ page }) => {
    await page.locator('button:has-text("8")').click();
    await page.locator('button:has-text("C")').click();
    const screen = await page.locator(".screen");
    await expect(screen).toHaveText("0");
  });

  // Tester la couleur du bouton "="
  test("Equals button color", async ({ page }) => {
    const equalsButton = await page.locator(".btnEqual");
    await expect(equalsButton).toHaveCSS("background-color", "rgb(255, 0, 0)");
  });
});
