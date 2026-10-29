import type { APIRoute } from "astro";
import { Resend } from "resend";
import { supabase } from "../../lib/supabase";

const TIPOS_CLIENTE = ["Panaderia", "Empresa", "Particular"];
const INTERESES = ["Galletas", "Cafe", "Chocolateria", "Varios"];
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

const json = (body: object, status: number) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });

// Todo lo que viene del formulario se escapa antes de ir al HTML del correo.
const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const texto = (value: unknown, max: number) =>
    typeof value === "string" ? value.trim().slice(0, max) : "";

export const POST: APIRoute = async ({ request }) => {
    let data: Record<string, unknown>;
    try {
        data = await request.json();
    } catch {
        return json({ message: "Solicitud inválida" }, 400);
    }

    // Honeypot: campo oculto que solo rellenan los bots. Respondemos 200 para no darles pistas.
    if (texto(data.sitio_web, 200)) {
        return json({ message: "¡Mensaje enviado con éxito!" }, 200);
    }

    const tipoCliente = texto(data.tipo_cliente, 20);
    const panaderia = texto(data.panaderia, 120);
    const nombre = texto(data.nombre, 120);
    const email = texto(data.email, 254);
    const interes = texto(data.interes, 20);
    const mensaje = texto(data.mensaje, 2000);
    // Celular colombiano de 10 dígitos; se aceptan espacios y el prefijo 57.
    const whatsapp = texto(data.whatsapp, 20).replace(/\D/g, "").replace(/^57(?=3\d{9}$)/, "");

    if (!panaderia || !nombre || !email || !whatsapp) {
        return json({ message: "Faltan campos obligatorios (Entidad, Nombre, WhatsApp, Email)" }, 400);
    }
    if (!TIPOS_CLIENTE.includes(tipoCliente)) {
        return json({ message: "Tipo de cliente inválido" }, 400);
    }
    if (interes && !INTERESES.includes(interes)) {
        return json({ message: "Interés inválido" }, 400);
    }
    if (!EMAIL_RE.test(email)) {
        return json({ message: "El email no es válido" }, 400);
    }
    if (!/^3\d{9}$/.test(whatsapp)) {
        return json({ message: "El WhatsApp debe ser un celular de 10 dígitos" }, 400);
    }

    // 1. Guardar en la BD (tabla contactos, INSERT público por RLS): así el mensaje
    // aparece en el dashboard aunque el correo falle.
    const { error: dbError } = await supabase.from("contactos").insert({
        tipo_cliente: tipoCliente,
        panaderia_nombre: panaderia,
        contacto_nombre: nombre,
        email,
        whatsapp,
        interes_producto: interes || null,
        mensaje: mensaje || null,
    });
    if (dbError) console.error("Error guardando contacto:", dbError.message);
    const guardado = !dbError;

    // 2. Avisar por correo
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    // RESEND_FROM debe ser un remitente de un dominio verificado en Resend (ej: "Amasar <contacto@amasarsya.com>").
    // onboarding@resend.dev solo entrega correos a la cuenta dueña de Resend.
    const from = import.meta.env.RESEND_FROM || "onboarding@resend.dev";

    try {
        const { error } = await resend.emails.send({
            from,
            to: ["administrador@amasarsya.com"],
            replyTo: email,
            subject: `Nuevo Mensaje de Amasar Go: ${nombre.replace(/[\r\n]+/g, " ")}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Nuevo Contacto Web</h1>
          <p>Has recibido una nueva solicitud desde el formulario de contacto.</p>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Tipo de Cliente:</strong> ${escapeHtml(tipoCliente)}</p>
            <p><strong>Entidad/Evento:</strong> ${escapeHtml(panaderia)}</p>
            <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/57${whatsapp}">${whatsapp}</a></p>
            <p><strong>Interés:</strong> ${escapeHtml(interes || "General")}</p>
          </div>

          <h3>Mensaje:</h3>
          <p style="background: #fff; padding: 15px; border-left: 4px solid #d97706; white-space: pre-wrap;">${escapeHtml(mensaje || "(sin mensaje)")}</p>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #888;">Enviado desde Amasar Go Web</p>
        </div>
      `,
        });

        // El detalle queda en los logs de Vercel; al cliente no se le expone.
        if (error) console.error("Error de Resend:", error);
        if (error && !guardado) {
            return json({ message: "No pudimos enviar tu mensaje. Intenta de nuevo." }, 502);
        }
    } catch (e) {
        console.error("Error en /api/contact:", e);
        if (!guardado) return json({ message: "Error interno del servidor" }, 500);
    }

    // Basta con que haya quedado guardado o enviado por correo
    return json({ message: "¡Mensaje enviado con éxito!" }, 200);
};
