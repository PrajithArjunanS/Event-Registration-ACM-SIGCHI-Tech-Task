function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("Event Registration")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function registerUser(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Registration_Log");

    if (!data.name || !data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      return { success: false, error: "Invalid input" };
    }

    sheet.appendRow([data.name, data.email, new Date()]);
    return { success: true };

  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

const SPREADSHEET_ID = //Enter SPREADSHEET ID;

function registerUser(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName("Event Registrations");

    if (!data.name || !data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      return { success: false, error: "Invalid input" };
    }

    sheet.appendRow([data.name, data.email, new Date()]);
    return { success: true };

  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

function getRegistrations() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("Registration_Log");
  if (!sheet) return [];

  const data = sheet.getDataRange().getValues();

  let rows = data;
  if (rows.length > 0 && rows[0][0] === "Name" && rows[0][1] === "Email") {
    rows = rows.slice(1);
  }

  return rows.map(r => [
    r[0] || "",
    r[1] || "",
    r[2] ? new Date(r[2]).toISOString() : ""
  ]);
}