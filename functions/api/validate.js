export const INTERESTS = [
  "Sell a property",
  "Buy a property",
  "Lease space",
  "Find tenants",
  "What's my property worth?",
  "Get notified of new offerings",
  "General inquiry"
];

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

export function missingConfig(env) {
  const missing = [];
  if (!env || !env.CONTACT_TO_EMAIL) missing.push("CONTACT_TO_EMAIL");
  if (!env || !env.CONTACT_FROM_EMAIL) missing.push("CONTACT_FROM_EMAIL");
  if (!env || !env.TURNSTILE_SITE_KEY) missing.push("TURNSTILE_SITE_KEY");
  if (!env || !env.TURNSTILE_SECRET_KEY) missing.push("TURNSTILE_SECRET_KEY");
  if (!env || !env.EMAIL || typeof env.EMAIL.send !== "function") missing.push("EMAIL");
  return missing;
}
