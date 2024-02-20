import { chromium } from "playwright";

const channelsIds = [
  "channel-shown-19:87583566b90f4293a486cbfda5678d9c@thread.tacv2",
];

async function auth(page) {
  await page.waitForSelector(".form-group");
  await page
    .getByPlaceholder("Email, phone, or Skype")
    .fill(process.env.MSTEAMS_USER);
  // await page.locator("data-report-event").click();
  await page.locator("[type=submit]").click();
  await page.getByPlaceholder("Password").fill(process.env.MSTEAMS_PASSWORD);
  await page.locator("[type=submit]").click();
  await page.screenshot({ path: "auth.png", fullPage: true });
  await page.getByText("Stay signed in?");
  await page.locator("[type=submit]").click();
}

async function main() {
  const browser = await chromium.launch({ devtools: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(process.env.MSTEAMS_HOST);
  await auth(page);
  await page.waitForSelector(".profile-img-parent");
  await page.screenshot({ path: "page.png", fullPage: true });
  console.log("waiting....");
  // await page.waitForTimeout(2000);
  // console.log("final wait!");
  //await page.locator('[data-sid='+channelsIds[0]+']')
  page.locator(`//*[@id="message-pane-layout-a11y"]/div[3]/div/div/button`).click()
  // console.log('textContent:', xpathdemo.textContent);
}

await main();
