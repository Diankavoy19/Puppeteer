const puppeteer = require("puppeteer");

const searchButton = "#search>button";
const title = "#content>h1";

(async () => {
    // Launch the browser and open a new blank page
    // Headless Execution
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    // Non Headless Execution
    // const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto("https://demo.opencart.com/",{waitUntil: 'networkidle0'});

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    await page.type('[name="search"]', "Macbook");

    // Wait and click on search button
    // await page.waitForSelector(searchButton);
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
    //To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');
    await browser.close();
})();
