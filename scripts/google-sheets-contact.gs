/**
 * ORMA — ricezione del modulo contatti su Google Sheet.
 *
 * Da incollare in Estensioni → Apps Script del foglio che raccoglie le richieste.
 * Riceve un POST JSON dalla route /api/contact del sito, aggiunge una riga
 * al foglio e invia un'email di avviso.
 *
 * Impostazioni (Apps Script → Impostazioni progetto → Proprietà script):
 *   SHARED_SECRET  stessa stringa di GOOGLE_SHEETS_SECRET sul sito (obbligatoria)
 *   NOTIFY_EMAIL   indirizzo che riceve l'avviso (facoltativa; vuota = nessuna email)
 */

const SHEET_NAME = "Richieste";

const COLUMNS = [
  ["receivedAt", "Data"],
  ["name", "Nome"],
  ["email", "Email"],
  ["property", "Struttura"],
  ["location", "Località"],
  ["propertyType", "Tipologia"],
  ["services", "Servizi"],
  ["budget", "Budget"],
  ["message", "Messaggio"],
  ["status", "Stato"],
];

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty("SHARED_SECRET");

    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: "unauthorized" });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getOrCreateSheet();
      const row = COLUMNS.map(([key]) => {
        if (key === "receivedAt") return new Date();
        if (key === "status") return "Nuova";
        return sanitizeCell(payload[key]);
      });
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    const notifyEmail = properties.getProperty("NOTIFY_EMAIL");
    if (notifyEmail) sendNotification(notifyEmail, payload);

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: "server_error" });
  }
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([, label]) => label));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
  }
  return sheet;
}

/** Evita che un testo che inizia con = + - @ venga interpretato come formula. */
function sanitizeCell(value) {
  const text = String(value == null ? "" : value).slice(0, 5000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function sendNotification(recipient, payload) {
  const lines = [
    "Nome: " + (payload.name || ""),
    "Email: " + (payload.email || ""),
    "Struttura: " + (payload.property || ""),
    "Località: " + (payload.location || ""),
    "Tipologia: " + (payload.propertyType || ""),
    "Servizi: " + (payload.services || ""),
    "Budget: " + (payload.budget || "—"),
    "",
    payload.message || "",
    "",
    "Foglio: " + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ];
  MailApp.sendEmail({
    to: recipient,
    replyTo: payload.email || undefined,
    subject: "Nuovo progetto — " + (payload.property || "richiesta dal sito"),
    body: lines.join("\n"),
  });
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

/** Lancia questa funzione una volta dall'editor per autorizzare foglio ed email. */
function authorize() {
  getOrCreateSheet();
  MailApp.getRemainingDailyQuota();
}
