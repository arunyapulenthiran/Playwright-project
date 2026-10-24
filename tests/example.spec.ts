
import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('https://test.ineedtofindsomeonefor.com/');

  await expect(page).toHaveTitle(/.+/);
});

test('search bar accepts text', async ({ page }) => {
  await page.goto('https://test.ineedtofindsomeonefor.com/');

  const searchBox = page.getByPlaceholder(
    /Plumber in Colombo, math tutor, study buddy/i
  );

  await expect(searchBox).toBeVisible();
  await searchBox.fill('Math tutor');

  await expect(searchBox).toHaveValue('Math tutor');
});

test('homepage navigation options are visible', async ({ page }) => {
  await page.goto('https://test.ineedtofindsomeonefor.com/');

  await expect(page.getByText('Join', { exact: true }).first()).toBeVisible();
  await expect(
  page.getByText('Sign in', { exact: true })
).toBeVisible();
  await expect(page.getByText('Hire a Professional', { exact: true })).toBeVisible();
  await expect(page.getByText('Find a Friend', { exact: true })).toBeVisible();
  await expect(page.getByText('Join the Network', { exact: true })).toBeVisible();
});


test('sign in opens the login form', async ({ page }) => {
  await page.goto('https://test.ineedtofindsomeonefor.com/');

  await page.getByText('Sign in', { exact: true }).first().click();

  await expect(
    page.getByPlaceholder('you@example.com')
  ).toBeVisible();

  await expect(
    page.getByPlaceholder('********')
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Sign in', exact: true })
  ).toBeVisible();
});
test('sign in form accepts email and password', async ({ page }) => {
  await page.goto('https://test.ineedtofindsomeonefor.com/');

  await page.getByText('Sign in', { exact: true }).first().click();

  await page.getByPlaceholder('you@example.com')
    .fill('seeker@example.com');

  await page.getByPlaceholder('********')
    .fill('password123');

  await expect(
    page.getByPlaceholder('you@example.com')
  ).toHaveValue('seeker@example.com');

  await expect(
    page.locator('#password')
  ).toHaveValue('password123');
});

test('create account form opens', async ({ page }) => {
  await page.goto('https://test.ineedtofindsomeonefor.com/');

  await page.getByText('Sign in', { exact: true }).first().click();

  await page.getByText('Create account', { exact: true }).click();

  // Check the registration form heading
  await expect(
    page.getByText('Create your account', { exact: true })
  ).toBeVisible();

  // Check the email and password inputs
  await expect(
    page.locator('input[type="email"]')
  ).toBeVisible();

  await expect(
    page.locator('input[type="password"]')
  ).toBeVisible();

  // Check the display name input (third input in the form)
  await expect(
  page.locator('input:not([type])').first()
).toBeVisible();

  // Check the registration options
  await expect(
    page.getByText('I am registering as', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('City', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Country', { exact: true })
  ).toBeVisible();

  // Check the Create account button
  await expect(
    page.getByRole('button', { name: 'Create account', exact: true })
  ).toBeVisible();
});

test('registration role options are available', async ({ page }) => {
  await page.goto('https://test.ineedtofindsomeonefor.com/');

  await page.getByText('Sign in', { exact: true }).first().click();
  await page.getByText('Create account', { exact: true }).click();

  await expect(
    page.locator('input[name="role"][value="seeker"]')
  ).toBeVisible();

  await expect(
    page.locator('input[name="role"][value="professional"]')
  ).toBeVisible();

  await expect(
    page.locator('input[name="role"][value="both"]')
  ).toBeVisible();

  await expect(
    page.locator('input[name="role"][value="seeker"]')
  ).toBeChecked();
});

test('user can change registration role', async ({ page }) => {
  await page.goto('https://test.ineedtofindsomeonefor.com/');

  await page.getByText('Sign in', { exact: true }).first().click();
  await page.getByText('Create account', { exact: true }).click();

  const professionalOption = page.locator(
    'input[name="role"][value="professional"]'
  );

  await professionalOption.check();

  await expect(professionalOption).toBeChecked();

  await expect(
    page.locator('input[name="role"][value="seeker"]')
  ).not.toBeChecked();
});

test('registration password field is required', async ({ page }) => {
  await page.goto('https://test.ineedtofindsomeonefor.com/');

  await page.getByText('Sign in', { exact: true }).first().click();
  await page.getByText('Create account', { exact: true }).click();

  const passwordField = page.locator('input[type="password"]');

  await expect(passwordField).toBeVisible();
  await expect(passwordField).toHaveAttribute('required', '');
});

test('registration displays password requirements', async ({ page }) => {
  await page.goto('https://test.ineedtofindsomeonefor.com/');

  await page.getByText('Sign in', { exact: true }).first().click();
  await page.getByText('Create account', { exact: true }).click();

  await expect(
    page.getByText(
      'Min 8 chars, include uppercase, number, and special character.',
      { exact: true }
    )
  ).toBeVisible();
});
