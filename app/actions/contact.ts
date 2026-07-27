"use server";

import { redirect } from "next/navigation";

export async function submitContactForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    redirect("/contact?status=invalid");
  }

  // TODO: send this via your email provider (e.g. Resend) or forward to a CRM / helpdesk.
  // Example:
  // await resend.emails.send({
  //   from: "Quantas <noreply@quantas.io>",
  //   to: "hello@quantas.io",
  //   subject: `[Contact] ${topic}: ${name}`,
  //   text: message,
  //   replyTo: email,
  // });

  redirect("/contact?status=success");
}
