'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, ClipboardList, Minus, Plus, Trash2 } from 'lucide-react';
import { FAMILIES, PRODUCT_LINES, getLine, type ProductLine } from '@/lib/catalog';
import { addToQuote, clearQuote, removeFromQuote, setQuoteQty, useQuoteList, type QuoteLine } from '@/lib/quote-list';

type Mode = 'cotizacion' | 'contacto';

/**
 * Lista de cotización + formulario. En modo "contacto" muestra solo el formulario.
 * Envía a /api/cotizacion (Zoho Mail).
 */
export default function QuoteRequest({ mode = 'cotizacion' }: { mode?: Mode }) {
  const list = useQuoteList();
  const loadedAt = useRef(Date.now());
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState('');

  const items: { entry: QuoteLine; line: ProductLine }[] = list.flatMap((entry) => {
    const line = getLine(entry.slug);
    return line ? [{ entry, line }] : [];
  });
  const withItems = mode === 'cotizacion';
  const suggestions = PRODUCT_LINES.filter(
    (line) =>
      !list.some((entry) => entry.slug === line.slug) &&
      items.some((item) => item.line.related.includes(line.slug)),
  ).slice(0, 3);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const payloadItems = withItems
      ? items.map(({ entry, line }) => ({ code: line.code, name: line.name, qty: entry.qty }))
      : [];
    const producto =
      payloadItems.length > 0
        ? payloadItems.map((item) => `${item.name} (x${item.qty})`).join(', ')
        : data.producto || (mode === 'contacto' ? 'Consulta general' : '');

    if (!producto) {
      setError('Agrega al menos un producto a la lista o indica qué necesitas.');
      return;
    }

    setSending(true);
    setError('');
    try {
      const response = await fetch('/api/cotizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, producto, items: payloadItems, ts: loadedAt.current }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string; quoteNumber?: string };
      if (!response.ok) throw new Error(result.error || 'No fue posible enviar la solicitud.');
      setSent(result.quoteNumber || '');
      if (withItems) clearQuote();
      form.reset();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'No fue posible enviar la solicitud.');
    } finally {
      setSending(false);
    }
  };

  if (sent !== null) {
    return (
      <div className="request-success" role="status">
        <span className="request-success-icon">
          <Check aria-hidden="true" />
        </span>
        <h2>Solicitud enviada</h2>
        <p>
          {sent ? (
            <>
              Tu número de solicitud es <strong>{sent}</strong>.{' '}
            </>
          ) : null}
          Te enviamos una copia a tu correo y te contactaremos con disponibilidad y valores.
        </p>
        <div className="request-success-actions">
          <Link href="/productos" className="button button-primary">
            Volver al catálogo
          </Link>
          <button type="button" className="button button-ghost" onClick={() => setSent(null)}>
            Enviar otra consulta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`request${withItems ? '' : ' request--single'}`}>
      {withItems && (
        <section className="request-list" aria-labelledby="request-list-title">
          <div className="request-list-head">
            <h2 id="request-list-title">
              <ClipboardList aria-hidden="true" /> Productos en tu cotización
            </h2>
            {items.length > 0 && (
              <button type="button" className="text-link text-link--muted" onClick={clearQuote}>
                Vaciar
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="request-empty">
              <p>
                <strong>Tu cotización está vacía.</strong> Agrega productos desde el catálogo o escribe en el formulario
                lo que necesitas.
              </p>
              <div className="request-quick-add">
                {PRODUCT_LINES.map((line) => (
                  <button key={line.slug} type="button" onClick={() => addToQuote(line.slug)}>
                    <Plus aria-hidden="true" /> {line.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ul className="request-items">
              {items.map(({ entry, line }) => (
                <li key={line.slug}>
                  <div className="request-item-thumb">
                    <Image
                      src={line.image}
                      alt=""
                      fill
                      sizes="64px"
                      className={`fit-${line.imageFit}`}
                      style={line.imagePosition ? { objectPosition: line.imagePosition } : undefined}
                    />
                  </div>
                  <div className="request-item-info">
                    <Link href={`/productos/${line.slug}`}>{line.name}</Link>
                    <span>{FAMILIES.find((family) => family.id === line.family)?.name}</span>
                  </div>
                  <div className="qty" role="group" aria-label={`Cantidad de ${line.name}`}>
                    <button
                      type="button"
                      onClick={() => setQuoteQty(line.slug, entry.qty - 1)}
                      disabled={entry.qty <= 1}
                      aria-label="Restar uno"
                    >
                      <Minus aria-hidden="true" />
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={999}
                      value={entry.qty}
                      aria-label="Cantidad"
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        if (Number.isFinite(value) && value > 0) setQuoteQty(line.slug, value);
                      }}
                    />
                    <button type="button" onClick={() => setQuoteQty(line.slug, entry.qty + 1)} aria-label="Sumar uno">
                      <Plus aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="request-remove"
                    onClick={() => removeFromQuote(line.slug)}
                    aria-label={`Quitar ${line.name}`}
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {suggestions.length > 0 && (
            <div className="request-suggest">
              <p>También te puede servir:</p>
              {suggestions.map((line) => (
                <button key={line.slug} type="button" onClick={() => addToQuote(line.slug)}>
                  <Plus aria-hidden="true" /> {line.name}
                </button>
              ))}
            </div>
          )}

          <Link href="/productos" className="text-link">
            Seguir agregando productos <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      )}

      <form className="request-form" onSubmit={submit} noValidate={false}>
        <h2>{withItems ? 'Datos de contacto' : 'Formulario de contacto'}</h2>
        <p className="request-form-lead">
          {withItems
            ? 'Te enviamos valores, disponibilidad y plazo de despacho. Enviar la solicitud no genera compromiso de compra.'
            : 'Consultas comerciales, compatibilidad de insumos o compras institucionales.'}
        </p>

        <input type="hidden" name="ts" value={loadedAt.current} readOnly />
        <div className="hp-field" aria-hidden="true">
          <label>
            No completar este campo
            <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="field-row">
          <label className="field">
            <span>Nombre</span>
            <input required name="nombre" autoComplete="name" maxLength={100} placeholder="Nombre y apellido" />
          </label>
          <label className="field">
            <span>Empresa o institución</span>
            <input
              required
              name="empresa"
              autoComplete="organization"
              maxLength={120}
              placeholder="Consulta, clínica, CESFAM…"
            />
          </label>
        </div>
        <div className="field-row">
          <label className="field">
            <span>Teléfono</span>
            <input
              required
              name="telefono"
              type="tel"
              autoComplete="tel"
              maxLength={20}
              pattern="[+]?[0-9\s\-()]{7,20}"
              title="Ingresa un número válido, por ejemplo +56 9 1234 5678"
              placeholder="+56 9 1234 5678"
            />
          </label>
          <label className="field">
            <span>Correo</span>
            <input
              required
              name="correo"
              type="email"
              autoComplete="email"
              maxLength={100}
              placeholder="nombre@institucion.cl"
            />
          </label>
        </div>
        <label className="field">
          <span>Ciudad o comuna de despacho</span>
          <input name="ciudad" autoComplete="address-level2" maxLength={80} placeholder="Ej: Castro, Puerto Montt, Santiago" />
        </label>
        {(!withItems || items.length === 0) && (
          <label className="field">
            <span>{withItems ? '¿Qué necesitas?' : 'Tema'}</span>
            <input
              name="producto"
              maxLength={160}
              required={withItems}
              placeholder={withItems ? 'Ej: 2 cajas de electrodos para Holter' : 'Ej: compatibilidad de cables ECG'}
            />
          </label>
        )}
        <label className="field">
          <span>Mensaje {withItems ? '(opcional)' : ''}</span>
          <textarea
            name="mensaje"
            rows={4}
            maxLength={1000}
            required={!withItems}
            placeholder="Marca y modelo de tu equipo, uso previsto, plazos u otro detalle útil."
          />
        </label>

        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}

        <button className="button button-primary button-block" type="submit" disabled={sending}>
          {sending ? 'Enviando…' : withItems ? 'Enviar solicitud de cotización' : 'Enviar mensaje'}
          {!sending && <ArrowRight aria-hidden="true" />}
        </button>
        <p className="form-legal">
          Al enviar aceptas nuestra <Link href="/politica-de-privacidad">política de privacidad</Link>.
        </p>
      </form>
    </div>
  );
}
