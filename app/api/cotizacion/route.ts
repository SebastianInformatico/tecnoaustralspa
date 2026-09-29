import { NextRequest, NextResponse } from 'next/server';

const CC_RECIPIENTS = (process.env.COTIZACION_CC || 'aliadosmerida@gmail.com,sebastiangodoycardenas99@gmail.com')
  .split(',')
  .map((address) => address.trim())
  .filter(Boolean);

// Tiempo mínimo (ms) que un humano tarda en completar el formulario.
const MIN_FILL_TIME_MS = 2500;

const escapeHtml = (value: unknown) =>
  (typeof value === 'string' || typeof value === 'number' ? String(value) : '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const isEmail = (value: unknown): value is string =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const textValue = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;

  // Antispam: el honeypot es un campo oculto que solo los bots completan.
  if (textValue(body?.sitio_web)) {
    return NextResponse.json({ ok: true });
  }

  // Antispam: envíos casi instantáneos son casi siempre bots.
  const ts = Number(body?.ts);
  if (Number.isFinite(ts) && Date.now() - ts < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  // "contacto" para el formulario de /contacto; por defecto es una cotización.
  const isContact = textValue(body?.tipo) === 'contacto';

  const fields = {
    nombre: textValue(body?.nombre),
    empresa: textValue(body?.empresa),
    telefono: textValue(body?.telefono),
    correo: textValue(body?.correo),
    producto: textValue(body?.producto).slice(0, 600),
    mensaje: textValue(body?.mensaje).slice(0, 1000),
    ciudad: textValue(body?.ciudad).slice(0, 80),
  };

  // Lista de productos armada en /cotizar (opcional).
  const rawItems: unknown = body?.items;
  const items = (Array.isArray(rawItems) ? (rawItems as unknown[]) : [])
    .slice(0, 30)
    .map((item: unknown) => {
      const entry = (item ?? {}) as Record<string, unknown>;
      return {
        code: textValue(entry.code).slice(0, 20),
        name: textValue(entry.name).slice(0, 120),
        qty: Math.min(999, Math.max(1, Math.round(Number(entry.qty) || 1))),
      };
    })
    .filter((item: { name: string }) => item.name);

  if (
    !fields.nombre ||
    !fields.empresa ||
    !fields.telefono ||
    !isEmail(fields.correo) ||
    !fields.producto
  ) {
    return NextResponse.json({ error: 'Completa todos los datos requeridos.' }, { status: 400 });
  }

  const zohoClientId = process.env.ZOHO_CLIENT_ID;
  const zohoClientSecret = process.env.ZOHO_CLIENT_SECRET;
  const zohoRefreshToken = process.env.ZOHO_REFRESH_TOKEN;
  const zohoAccountId = process.env.ZOHO_ACCOUNT_ID;
  const from = process.env.ZOHO_FROM_EMAIL;

  if (!zohoClientId || !zohoClientSecret || !zohoRefreshToken || !zohoAccountId || !from) {
    return NextResponse.json(
      { error: 'El servicio de correo Zoho aún no está configurado.' },
      { status: 503 },
    );
  }

  const origin = request.nextUrl.origin;
  const logoUrl = `${origin}/images/logo-tecno-salud-austral.png`;
  const quoteDate = new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Santiago',
  }).format(new Date());
  const quoteNumber = `WEB-${Date.now().toString().slice(-8)}`;

  const html = `
    <div style="margin:0;background:#f4f8fc;padding:24px;font-family:Arial,sans-serif;color:#123b70">
      <div style="max-width:760px;margin:auto;background:#fff;border:1px solid #c8dff1;border-radius:14px;overflow:hidden">
        <div style="padding:24px 28px;border-bottom:4px solid #1386d5;display:flex;align-items:center;justify-content:space-between;gap:20px">
          <img src="${logoUrl}" alt="Tecno Salud Austral SPA" width="260" style="max-width:55%;height:auto" />
          <div style="text-align:right;color:#173f76"><strong style="font-size:21px">${isContact ? 'CONSULTA WEB' : 'COTIZACIÓN PROVISIONAL'}</strong><br />N.° ${quoteNumber}<br />Fecha: ${quoteDate}</div>
        </div>
        <div style="padding:24px 28px">
          <h2 style="margin:0 0 16px;color:#123b70">Datos del cliente</h2>
          <table style="width:100%;border-collapse:collapse;font-size:15px">
            <tr><td style="padding:9px 0;border-bottom:1px solid #dceaf5"><b>Nombre</b></td><td style="padding:9px 0;border-bottom:1px solid #dceaf5">${escapeHtml(fields.nombre)}</td></tr>
            <tr><td style="padding:9px 0;border-bottom:1px solid #dceaf5"><b>Empresa o institución</b></td><td style="padding:9px 0;border-bottom:1px solid #dceaf5">${escapeHtml(fields.empresa)}</td></tr>
            <tr><td style="padding:9px 0;border-bottom:1px solid #dceaf5"><b>Teléfono</b></td><td style="padding:9px 0;border-bottom:1px solid #dceaf5">${escapeHtml(fields.telefono)}</td></tr>
            <tr><td style="padding:9px 0;border-bottom:1px solid #dceaf5"><b>Correo</b></td><td style="padding:9px 0;border-bottom:1px solid #dceaf5">${escapeHtml(fields.correo)}</td></tr>
            ${fields.ciudad ? `<tr><td style="padding:9px 0;border-bottom:1px solid #dceaf5"><b>Ciudad de despacho</b></td><td style="padding:9px 0;border-bottom:1px solid #dceaf5">${escapeHtml(fields.ciudad)}</td></tr>` : ''}
          </table>
          <h2 style="margin:28px 0 12px;color:#123b70">${isContact ? 'Consulta' : 'Detalle referencial'}</h2>
          ${items.length > 0 ? `
          <table style="width:100%;border-collapse:collapse;border:1px solid #c8dff1">
            <thead><tr style="background:#e4f1fb"><th style="padding:12px;text-align:left">Código</th><th style="padding:12px;text-align:left">Producto</th><th style="padding:12px;text-align:center">Cantidad</th><th style="padding:12px;text-align:right">Valor</th></tr></thead>
            <tbody>${items.map((item: { code: string; name: string; qty: number }) => `<tr><td style="padding:12px;border-top:1px solid #c8dff1">${escapeHtml(item.code)}</td><td style="padding:12px;border-top:1px solid #c8dff1">${escapeHtml(item.name)}</td><td style="padding:12px;border-top:1px solid #c8dff1;text-align:center">${item.qty}</td><td style="padding:12px;border-top:1px solid #c8dff1;text-align:right">Por definir</td></tr>`).join('')}</tbody>
          </table>
          <p style="margin:14px 0 0"><b>Observaciones:</b> ${escapeHtml(fields.mensaje) || 'Sin observaciones adicionales'}</p>` : `
          <table style="width:100%;border-collapse:collapse;border:1px solid #c8dff1">
            <thead><tr style="background:#e4f1fb"><th style="padding:12px;text-align:left">Producto de interés</th><th style="padding:12px;text-align:left">Observaciones</th><th style="padding:12px;text-align:right">Valor</th></tr></thead>
            <tbody><tr><td style="padding:14px;border-top:1px solid #c8dff1">${escapeHtml(fields.producto)}</td><td style="padding:14px;border-top:1px solid #c8dff1">${escapeHtml(fields.mensaje) || 'Sin observaciones adicionales'}</td><td style="padding:14px;border-top:1px solid #c8dff1;text-align:right">Por definir</td></tr></tbody>
          </table>`}
          ${isContact ? '' : '<div style="margin-top:24px;padding:16px;background:#eef7fd;border-radius:10px;color:#345575"><b>Condiciones comerciales</b><br />Cotización preliminar sujeta a confirmación de productos, cantidades, disponibilidad, despacho y valores. Vigencia referencial: 7 días hábiles.</div>'}
        </div>
        <div style="padding:18px 28px;background:#0e72bd;color:#fff;font-size:13px">Emitido por Tecno Salud Austral SPA · <a href="https://tecnosaludaustral.cl/" style="color:#fff">tecnosaludaustral.cl</a></div>
      </div>
    </div>`;

  const accountsDomain = process.env.ZOHO_ACCOUNTS_DOMAIN || 'https://accounts.zoho.com';
  const mailApiDomain = process.env.ZOHO_MAIL_API_DOMAIN || 'https://mail.zoho.com';
  const tokenResponse = await fetch(`${accountsDomain}/oauth/v2/token?${new URLSearchParams({
    refresh_token: zohoRefreshToken,
    grant_type: 'refresh_token',
    client_id: zohoClientId,
    client_secret: zohoClientSecret,
  })}`,
    { method: 'POST' },
  );
  const tokenData = await tokenResponse.json().catch(() => null) as { access_token?: string } | null;
  if (!tokenResponse.ok || !tokenData?.access_token) {
    console.error('No fue posible renovar el token de Zoho:', tokenData);
    return NextResponse.json({ error: 'No fue posible autenticar el envío con Zoho.' }, { status: 502 });
  }

  let content = html;
  const signatureId = process.env.ZOHO_SIGNATURE_ID;
  if (signatureId) {
    const signatureResponse = await fetch(`${mailApiDomain}/api/accounts/signature?id=${encodeURIComponent(signatureId)}`, {
      headers: { Authorization: `Zoho-oauthtoken ${tokenData.access_token}` },
    });
    const signatureData = await signatureResponse.json().catch(() => null) as { data?: { content?: string } } | null;
    if (signatureResponse.ok && signatureData?.data?.content) {
      content += `<div style="margin-top:28px;border-top:1px solid #dceaf5;padding-top:18px">${signatureData.data.content}</div>`;
    }
  }

  const response = await fetch(`${mailApiDomain}/api/accounts/${encodeURIComponent(zohoAccountId)}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${tokenData.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fromAddress: from,
      toAddress: fields.correo,
      ccAddress: CC_RECIPIENTS.join(','),
      subject: `${isContact ? 'Consulta web' : 'Solicitud de cotización'} ${quoteNumber} · ${fields.empresa}`,
      content,
      mailFormat: 'html',
      encoding: 'UTF-8',
    }),
  });

  if (!response.ok) {
    console.error('Error al enviar cotización:', await response.text());
    return NextResponse.json({ error: 'No fue posible enviar la cotización. Intenta nuevamente.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, quoteNumber });
}
