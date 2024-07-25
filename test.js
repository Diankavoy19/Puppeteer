const puppeteer = require("puppeteer");

const searchButton = "#search>button";
const title = "#content>h1";

(async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto("https://demo.opencart.com/",{waitUntil: 'networkidle0'});
    await page.setViewport({ width: 1080, height: 1024 });
    await page.type('[name="search"]', "Macbook");
    await page.click(searchButton);
    await page.waitForSelector(title);
    await page.screenshot({
        path: 'testScreenshot.png'
     });
    await page.pdf({
        path: 'testPDF.pdf',
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
    });
    await page.emulateMediaType('screen');
    await browser.close();
})();