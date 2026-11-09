export const INTERESTS = [
  "Sell a property",
  "Buy a property",
  "Lease space",
  "Find tenants",
  "Get notified of new offerings",
  "General inquiry"
];

export const ASSET_TYPES = ["Multifamily", "Industrial", "Retail", "Office", "Land", "Other"];
export const TIMELINES = ["Not sure yet", "Within 6 months", "6 to 12 months", "More than a year"];
export const REASONS = ["Considering a sale", "Refinance", "Estate or planning", "Curiosity"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[0-9+().\-\s]{7,40}$/;

function text(value, max) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim().slice(0, max);
}

function oneLine(value, max) {
  return text(value, max).replace(/[\r\n]+/g, " ");
}

export function validateContact(body) {
  const input = body && typeof body === "object" ? body : {};
  const honeypot = oneLine(input.company_website || "", 200);
  if (honeypot) return { ok: true, spam: true };

  const errors = [];
  const name = oneLine(input.name, 100);
  const email = oneLine(input.email, 200);
  const phone = oneLine(input.phone, 40);
  const interest = oneLine(input.interest, 80);
  const address = oneLine(input.address || "", 200);
  const message = text(input.message, 4000);
  const consent = input.consent === true || input.consent === "on" || input.consent === "yes";

  if (!name) errors.push("Name is required.");
  if (!email || !EMAIL.test(email)) errors.push("A valid email is required.");
  if (!phone || !PHONE.test(phone)) errors.push("A valid phone number is required.");
  if (INTERESTS.indexOf(interest) === -1) errors.push("Choose an interest.");
  if (!message) errors.push("A message is required.");
  if (!consent) errors.push("Consent is required.");

  if (errors.length) return { ok: false, errors: errors };
  return {
    ok: true,
    spam: false,
    value: { name, email, phone, interest, address, message, consent: true }
  };
}

export function validateValuation(body) {
  const input = body && typeof body === "object" ? body : {};
  const honeypot = oneLine(input.company_website || "", 200);
  if (honeypot) return { ok: true, spam: true };

  const errors = [];
  const name = oneLine(input.name, 100);
  const email = oneLine(input.email, 200);
  const phone = oneLine(input.phone, 40);
  const address = oneLine(input.address, 200);
  const city = oneLine(input.city, 80);
  const assetType = oneLine(input.assetType, 40);
  const size = oneLine(input.size, 80);
  const yearBuilt = oneLine(input.yearBuilt || "", 4);
  const occupancy = oneLine(input.occupancy || "", 80);
  const timeline = oneLine(input.timeline, 40);
  const reason = oneLine(input.reason, 40);
  const notes = text(input.notes, 4000);
  const consent = input.consent === true || input.consent === "on" || input.consent === "yes";

  if (!name) errors.push("Name is required.");
  if (!email || !EMAIL.test(email)) errors.push("A valid email is required.");
  if (!phone || !PHONE.test(phone)) errors.push("A valid phone number is required.");
  if (!address) errors.push("Property address is required.");
  if (!city) errors.push("City is required.");
  if (ASSET_TYPES.indexOf(assetType) === -1) errors.push("Choose an asset type.");
  if (!size) errors.push("Units or square feet is required.");
  if (yearBuilt && !/^(18|19|20)\d{2}$/.test(yearBuilt)) errors.push("Year built should be a four-digit year, or left blank.");
  if (TIMELINES.indexOf(timeline) === -1) errors.push("Choose a timeline.");
  if (REASONS.indexOf(reason) === -1) errors.push("Choose a reason.");
  if (!notes) errors.push("Notes are required.");
  if (!consent) errors.push("Consent is required.");

  if (errors.length) return { ok: false, errors: errors };
  return {
    ok: true,
    spam: false,
    value: { name, email, phone, address, city, assetType, size, yearBuilt, occupancy, timeline, reason, notes, consent: true }
  };
}

export function missingConfig(env) {
  const missing = [];
  if (!env || !env.CONTACT_TO_EMAIL) missing.push("CONTACT_TO_EMAIL");
  if (!env || !env.CONTACT_FROM_EMAIL) missing.push("CONTACT_FROM_EMAIL");
  if (!env || !env.TURNSTILE_SITE_KEY) missing.push("TURNSTILE_SITE_KEY");
  if (!env || !env.TURNSTILE_SECRET_KEY) missing.push("TURNSTILE_SECRET_KEY");
  if (!env || !env.EMAIL || typeof env.EMAIL.send !== "function") missing.push("EMAIL");
  return missing;
}
