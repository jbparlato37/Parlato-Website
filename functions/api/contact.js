import { missingConfig, validateContact } from "./validate.js";

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

function page(title, message, status) {
  const html = "<!DOCTYPE html><html lang=\"en\"><meta charset=\"utf-8\"><title>" +
    title + "</title><body><p>" + message + "</p><p><a href=\"/contact.html\">Back to contact</a></p></body></html>";
  return new Response(html, {
    status: status,
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}

function wantsJson(request) {
  return (request.headers.get("accept") || "").includes("application/json");
}

function notConfigured(request, missing) {
  const payload = { ok: false, configured: false, error: "not configured", missing: missing };
  if (wantsJson(request)) return json(payload, 503);
  return page("Not configured", "Preview only, not connected. Nothing was sent.", 503);
}

async function readBody(request) {
  const type = request.headers.get("content-type") || "";
  if (type.includes("application/json")) return request.json();
  const form = await request.formData();
  const data = {};
  form.forEach(function (value, key) {
    data[key] = typeof value === "string" ? value : "";
  });
  if (form.get("consent")) data.consent = true;
  return data;
}

function emailText(value) {
  return [
    "New inquiry from the Parlato Real Estate website",
    "",
    "Name: " + value.name,
    "Email: " + value.email,
    "Phone: " + value.phone,
    "Interest: " + value.interest,
    "Property address: " + (value.address || "(none)"),
    "",
    value.message
  ].join("\n");
}

async function verifyTurnstile(env, token, request) {
  const body = new URLSearchParams();
  body.set("secret", env.TURNSTILE_SECRET_KEY);
  body.set("response", token || "");
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body
  });
  if (!res.ok) return false;
  const data = await res.json();
  return !!data.success;
}

export async function onRequestGet(context) {
  const missing = missingConfig(context.env);
  if (missing.length) {
    return json({ configured: false, error: "not configured", missing: missing }, 200);
  }
  return json({ configured: true, turnstileSiteKey: context.env.TURNSTILE_SITE_KEY }, 200);
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const missing = missingConfig(env);
  if (missing.length) return notConfigured(request, missing);

  let input;
  try {
    input = await readBody(request);
  } catch (err) {
    const message = "The form could not be read.";
    return wantsJson(request) ? json({ ok: false, error: message }, 400) : page("Error", message, 400);
  }

  const result = validateContact(input);
  if (result.spam) {
    return wantsJson(request) ? json({ ok: true }, 200) : page("Received", "Thank you.", 200);
  }
  if (!result.ok) {
    const message = result.errors[0];
    return wantsJson(request) ? json({ ok: false, error: message }, 400) : page("Check the form", message, 400);
  }

  const token = typeof input.turnstileToken === "string" ? input.turnstileToken : "";
  const passed = await verifyTurnstile(env, token, request);
  if (!passed) {
    const message = "The check failed. Please try again.";
    return wantsJson(request) ? json({ ok: false, error: message }, 400) : page("Check failed", message, 400);
  }

  try {
    await env.EMAIL.send({
      to: env.CONTACT_TO_EMAIL,
      from: env.CONTACT_FROM_EMAIL,
      replyTo: result.value.email,
      subject: ("Website inquiry: " + result.value.interest).slice(0, 180),
      text: emailText(result.value)
    });
  } catch (err) {
    const message = "The message could not be sent. Please try again.";
    return wantsJson(request) ? json({ ok: false, error: message }, 502) : page("Not sent", message, 502);
  }

  const thanks = "Thank you. Your message is in.";
  return wantsJson(request) ? json({ ok: true }, 200) : page("Received", thanks, 200);
}
