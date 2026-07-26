"use server";

import { redirect } from "next/navigation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToNewsletter(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL_REGEX.test(email)) {
    redirect("/newsletter?status=invalid");
  }

  // TODO: wire up to your ESP (e.g. Resend, Mailchimp, ConvertKit) or CRM here.
  // Example:
  // await fetch("https://api.youresp.com/v1/subscribers", {
  //   method: "POST",
  //   headers: { Authorization: `Bearer ${process.env.ESP_API_KEY}` },
  //   body: JSON.stringify({ email }),
  // });

  redirect("/newsletter?status=success");
}
