const express = require("express");
const cors = require("cors");
// login path
const { chromium, firefox } = require("playwright"); // Importing Playwright

let BASE_URL = "https://www.alfa.com.lb";
const login_route = "/en/account/login?returnUrl=%2Fen%2Faccount";
const app = express();
const qs = require("qs"); // To serialize form data
const axiosInstance = require("./axios");
const fs = require("fs");
const { expect } = require("playwright/test");
const checkNumberMiddleware = require("./checknumber");
app.use(express.json());

// Use CORS middleware to allow requests from any origin (only in development)
app.use(cors());
// "fbp=fb.2.1726341237886.12723814450857432; _gid=GA1.3.1857524976.1726341239; __RequestVerificationToken=eo7xdYcewM7d88eve8BJmMqRKg33MqZWX6GB_SunsqnzS5SrLkbm-BSmwxonmarIdt_X_1z04HWq7pvgfju3Mwx60uiF0cwouURpW91ftOE1; __ACCOUNT=3291312EFC5EEDCD0A8E47503A2E0DCF31B2450F586720DD2D582672D3E1600D809D40FB348EBEFFEA5498EF0B570E859718581E95249175479F9ABDD3EEAAC9CE0BC57A1BFCD5D26438E330A6427F02578F480D1D8DCBBA942CF10B995C22011C7B93D5A395D4BF6FE61D5D234DF581064E4682B8E81F3A9EB8BD95F014E93C2B0926F41673A6A14D000F3308B7B9B52F67012771FA1A0022CE1D1929338C50D2850823E67820BCFCC74B8F75366F6E38CEF312ECE330E45AD5921331ADE6619A5BE831F138D6735AB205F9874C0271B3E81173FA8F51B96705AEBA3258B0EB2EF828460EBE6F52D554F13B4C67C84376CA8D8BDDFB5CC928DA149DEE134B194EF2F29730967AF19F40F63D69E87EA96949918D8483EE0B7BE300870774C8FC0955844CB78AE6F2A75825175D6F2EBB04335D706759C92F4557820B774BBB284A577A85DAC20EB60D2FEE279E245E3ADA09A6B7243DE5888FA9ADDAB691B4E972CA10420C1B97C1E60D01AA3999FDE6D7848A9C7EC9D4AD77DF00E9CE2E90D2A10FFDD25E1F7802E2BC760A76E3277BBF76BAE0C30FE41FFFAD5915C4613219960B452D78062C0E95A99069CDAB3F2D83C25349E4E25952F4BC1F6D334BE2839E63B66A8383EFC80080A2C9750431C86066A98C83FF32E8B560994E84EE2718FC62DF926D7CB2AF192D91151F3F7ED0D409015539D9BAB2408313ED264DDED93CDB54ACC6EEE1AD03838A73BF4C6B836227BE9C0263D91FEF61FE639A376D44AE87BFD78CBD1F00B229976FEC31BED3D723EB0E593CE421DBF213691D49C2D813DAA359D69E96EF296B0CA1C7C2EBF008AF154E7B132F3551D6CBC4033D5FEC370495BFFBFB60F6DDAEF133AACC42171520E01AD30334A97A44CB5604E9A319; ASP.NET_SessionId=wtyjedtrezkla0euaks0u5fs; TS0106f800=01942e3b6a96644c99c96311692c6ca1c2aaab3b1645f14c4d1011b48e22c80cd3f537ed363134e9530a06f789019b5a1a5bfb9717f8ebf10c6382c6f87fac34159fbf06af8ff76d81bbef6e2bd7cf37fa8ed4efddef28c6b8735af0b16eaac5ccaeaed235; _ga_6V6NBTH89C=GS1.1.1726424713.7.1.1726427634.0.0.0; _ga=GA1.3.477118007.1726341225; _gat=1; TS0106f800=01942e3b6a6846a908ea4f88bad139925dfcda1806274ad3c2b9ffea48fedb8d44471d68741a3f922bb728a98cdaeb7fe4d303ee97be16467403dea6bd4afcf15edce15ce3476906c01ec80b76a97dc93add68022f7f4b71bd88cd708b683a457fdce254a3",

// Route to handle the proxy request
app.post("/proxy", async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ message: "Missing token" });
  }

  try {
    // Making the request to the Alfa endpoint
    const dynamicHeaders = {
      Cookie: token,
    };
    const response = await axiosInstance.get("en/account/getconsumption", {
      headers: {
        ...dynamicHeaders,
      },
    });

    // Send the response back to the browser
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred", error: error.message });
  }
});
app.post("/login", checkNumberMiddleware, async (req, res) => {
  // Fill in the form
  const username = req.body.number;
  const password = req.body.password;

  try {
    // use random browser

    const browser = await chromium.launch({
      headless: true,
      args: ["--window-size=1920,1040"],
    });

    // maximize the browser window
    await browser.newContext().scr;

    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the Alfa login page
    await page.goto("https://www.alfa.com.lb/en/account/login");

    await page.fill("#Username", username); // Replace with actual number
    await page.fill("#Password", password); // Replace with actual password

    // Scroll to 20% of the page
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 0.2);
    });

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // check if  page dont have login text
 function getMarketRate() {

    // check if [Go Back] button exist

    await expect(page.getByText("Please consult with your administrator"))
      .toBeVisible()
      .then(() => {
        page.close();
        browser.close();
        return res.status(400).json({
          message: "Please consult with your administrator",
          success: false,
        });
      })
      .catch(async () => {
        // Get cookies after login
        const cookies = await context.cookies();
        const cookieString = cookies
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; ");

        // Save cookies to a file
        fs.writeFileSync("cookies.txt", cookieString);

        // Close the browser
        browser.close();

        // Send cookies back as the response
        res
          .json({
            message: "Login successful",
            success: true,
            token: cookieString,
          })
          .status(200);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred", error: error.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
