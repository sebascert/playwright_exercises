# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: activities.spec.ts >> Activity 2: TodoMVC tests >> expected failure demo @fail
- Location: tests/activities.spec.ts:141:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.todo-list li')
Expected: 5
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('.todo-list li')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - text: This is just a demo of TodoMVC for testing, not the
    - link "real TodoMVC app." [ref=e3] [cursor=pointer]:
      - /url: https://todomvc.com/
  - generic [ref=e5]:
    - generic [ref=e6]:
      - heading "todos" [level=1] [ref=e7]
      - textbox "What needs to be done?" [active] [ref=e8]
    - generic [ref=e9]:
      - checkbox "❯Mark all as complete" [ref=e10]
      - generic [ref=e11]: ❯Mark all as complete
      - list [ref=e12]:
        - listitem [ref=e13]:
          - generic [ref=e14]:
            - checkbox "Toggle Todo" [ref=e15]
            - generic [ref=e16]: Expected failure
            - text: ×
    - generic [ref=e17]:
      - generic [ref=e18]:
        - strong [ref=e19]: "1"
        - text: item left
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "All" [ref=e22] [cursor=pointer]:
            - /url: "#/"
        - listitem [ref=e23]:
          - link "Active" [ref=e24] [cursor=pointer]:
            - /url: "#/active"
        - listitem [ref=e25]:
          - link "Completed" [ref=e26] [cursor=pointer]:
            - /url: "#/completed"
  - contentinfo [ref=e27]:
    - paragraph [ref=e28]: Double-click to edit a todo
    - paragraph [ref=e29]:
      - text: Created by
      - link "Remo H. Jansen" [ref=e30] [cursor=pointer]:
        - /url: http://github.com/remojansen/
    - paragraph [ref=e31]:
      - text: Part of
      - link "TodoMVC" [ref=e32] [cursor=pointer]:
        - /url: http://todomvc.com
```

# Test source

```ts
  56  | 
  57  |     // Auto-retrying assertion
  58  |     await expect(page.getByText('Learn Playwright')).toBeVisible();
  59  | 
  60  |     // Non-retrying assertion
  61  |     expect(await page.locator('.todo-list li').count()).toBe(1);
  62  | 
  63  |     await page.screenshot({
  64  |       path: 'artifacts/create-todo.png',
  65  |       fullPage: true,
  66  |     });
  67  |   });
  68  | 
  69  |   test('complete a todo item @locator', async ({ page }) => {
  70  |     await page.goto('https://demo.playwright.dev/todomvc/#/');
  71  | 
  72  |     const input = page.getByPlaceholder('What needs to be done?');
  73  | 
  74  |     await input.fill('Buy milk');
  75  |     await input.press('Enter');
  76  | 
  77  |     await page.locator('.todo-list li').first().locator('.toggle').check();
  78  | 
  79  |     // Negative assertion
  80  |     await expect(
  81  |       page.getByText('2 items left')
  82  |     ).not.toBeVisible();
  83  | 
  84  |     await page.screenshot({
  85  |       path: 'artifacts/complete-todo.png',
  86  |       fullPage: true,
  87  |     });
  88  |   });
  89  | 
  90  |   test('navigation links using getByRole @links', async ({ page }) => {
  91  |     await page.goto('https://demo.playwright.dev/todomvc/#/');
  92  | 
  93  |     const input = page.getByPlaceholder('What needs to be done?');
  94  | 
  95  |     await input.fill('Task 1');
  96  |     await input.press('Enter');
  97  | 
  98  |     await page.getByRole('link', { name: 'Active' }).click();
  99  | 
  100 |     await expect(page).toHaveURL(/#\/active/);
  101 | 
  102 |     await page.goBack();
  103 | 
  104 |     await expect(page).toHaveURL(/#\//);
  105 | 
  106 |     await page.screenshot({
  107 |       path: 'artifacts/navigation-links.png',
  108 |       fullPage: true,
  109 |     });
  110 |   });
  111 | 
  112 |   test('soft assertions and page methods @soft', async ({ page }) => {
  113 |     test.slow();
  114 | 
  115 |     await page.goto('https://demo.playwright.dev/todomvc/#/');
  116 | 
  117 |     const input = page.getByPlaceholder('What needs to be done?');
  118 | 
  119 |     await input.fill('Testing soft assertions');
  120 |     await input.press('Enter');
  121 | 
  122 |     // Soft assertion
  123 |     await expect.soft(
  124 |       page.getByText('Testing soft assertions')
  125 |     ).toBeVisible();
  126 | 
  127 |     console.log(await page.title());
  128 | 
  129 |     await page.reload();
  130 | 
  131 |     await expect(
  132 |       page.getByText('Testing soft assertions')
  133 |     ).toBeVisible();
  134 | 
  135 |     await page.screenshot({
  136 |       path: 'artifacts/soft-assertions.png',
  137 |       fullPage: true,
  138 |     });
  139 |   });
  140 | 
  141 |   test('expected failure demo @fail', async ({ page }) => {
  142 |     test.fail();
  143 | 
  144 |     await page.goto('https://demo.playwright.dev/todomvc/#/');
  145 | 
  146 |     const input = page.getByPlaceholder('What needs to be done?');
  147 | 
  148 |     await input.fill('Expected failure');
  149 |     await input.press('Enter');
  150 | 
  151 |     await page.screenshot({
  152 |       path: 'artifacts/expected-failure.png',
  153 |       fullPage: true,
  154 |     });
  155 | 
> 156 |     await expect(page.locator('.todo-list li')).toHaveCount(5);
      |                                                 ^ Error: expect(locator).toHaveCount(expected) failed
  157 |   });
  158 | 
  159 | });
  160 | 
```