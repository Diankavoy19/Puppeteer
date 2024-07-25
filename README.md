# Puppeteer
## Quick Guide
![puppeteer](https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png)
Puppeteer is a Node.js library that allows testers to perform headless (no visible UI) browser testing of Google Chrome. Puppeteer testing allows the tester to perform actions such as clicking links, filling out forms, and submitting buttons using JavaScript commands. It also offers high-level APIs for performing automated tests, developing and debugging website features, inspecting elements on a page, and profiling performance.
## Step 1. Install Node.js
To install Node.js, go to the official Node.js website - [here](https://nodejs.org/en) and download the latest version or the previous version of Node.js according to your operating system (Windows, Linux / Unix, Mac and OS X) you are going to use:
![alt text](image.png)
## Step 2. Create project structure
Create a new project using the ``npm init`` command to initialize a new project, or switch to an existing one.
## Step 3. Install Puppeteer
```bash
npm i puppeteer
```
## Step 4. Create tests
First, create a new file ``test.js``:
```javascript showLineNumbers
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
```
* line 1 - Import the Puppeteer library in your script
* line 7 - Use the puppeteer.launch() method to launch the browser instance in headless execution. For non headless execution you need to use: ```const browser = await puppeteer.launch({headless:false});```
* line 8 - Open a new blank page
* line 9 - Navigate the page to a URL
* line 10 - Set screen size
* line 11 - Type into search box
* line 12 - Click on search button
* line 13 - Wait when the title will be visible
* line 14-16 - Take a screenshot and set the path
* line 17-22 - Generate the pdf file and set the parameters
* line 23 - Reflect CSS used for screens instead of print
* line 24 - Close the browser

The above code, saved in the test.js file, can be run using Node as follows:
```bash
node test.js
```