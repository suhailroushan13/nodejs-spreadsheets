import { google } from "googleapis";
import sendSMS from "./sms.js";
import cron from "node-cron";
const serviceAccountKeyFile = "./data.json";
const sheetId = "13GecJez61MBiLDePp22BwrE6ddDg7ctEAWLMW8657fA";
const tabName = "April 2024";

const readGoogleSheet = async (
  serviceAccountKeyFile,
  sheetId,
  tabName,
  range
) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const authClient = await auth.getClient();
  const googleSheetClient = google.sheets({
    version: "v4",
    auth: authClient,
  });

  const res = await googleSheetClient.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
  });

  return res.data.values[0][0];
};

async function getData() {
  try {
    const data = await readGoogleSheet(
      serviceAccountKeyFile,
      sheetId,
      tabName,
      "C11"
    ); // Adjusted to use 'C11' directly
    if (data && data.length > 0) {
      // Assuming data[0] contains the amount from the cell "C11"
      let amount = data; // Adjust based on actual structure of 'data'
      let msg = `Your Total Balance is ₹${amount}`;
      console.log(msg);
      sendSMS("+919618211626", msg);
    } else {
      console.log("No data found.");
    }
  } catch (error) {
    console.error(error);
  }
}

cron.schedule("0 11 * * *", () => {
  console.log("Running getData at 11:00 am");
  getData();
});
