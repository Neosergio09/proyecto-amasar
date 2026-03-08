import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  const resend = new Resend("re_NcE4MUP4_Mju99aHpdwDqWGYaJvxhBqmF");
  try {
    const data = await request.json();
    const { tipo_cliente, panaderia, nombre, email, whatsapp, interes, mensaje } = data;
    if (!nombre || !email || !mensaje) {
      return new Response(
        JSON.stringify({
          message: "Faltan campos obligatorios (Nombre, Email, Mensaje)"
        }),
        { status: 400 }
      );
    }
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      // O tu dominio verificado: contacto@amasarsya.com
      to: ["administrador@amasarsya.com"],
      subject: `Nuevo Mensaje de Amasar Go: ${nombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Nuevo Contacto Web</h1>
          <p>Has recibido una nueva solicitud desde el formulario de contacto.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Tipo de Cliente:</strong> ${tipo_cliente || "N/A"}</p>
            ${panaderia ? `<p><strong>Entidad/Evento:</strong> ${panaderia}</p>` : ""}
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp || "N/A"}</p>
            <p><strong>Interés:</strong> ${interes || "General"}</p>
          </div>

          <h3>Mensaje:</h3>
          <p style="background: #fff; padding: 15px; border-left: 4px solid #d97706;">${mensaje}</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #888;">Enviado desde Amasar Go Web</p>
        </div>
      `
    });
    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }
    return new Response(
      JSON.stringify({
        message: "¡Mensaje enviado con éxito!"
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor"
      }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
