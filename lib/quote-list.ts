'use client';

import { useSyncExternalStore } from 'react';
import { getLine } from './catalog';

/**
 * Lista de cotización del visitante. Vive en localStorage para que
 * sobreviva al navegar entre páginas; si el navegador lo bloquea,
 * funciona igual en memoria durante la visita.
 */
export interface QuoteLine {
  slug: string;
  qty: number;
}

const KEY = 'tsa-quote-list-v1';
const EMPTY: QuoteLine[] = [];
const listeners = new Set<() => void>();
let cache: QuoteLine[] | null = null;

function sanitize(value: unknown): QuoteLine[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (item): item is QuoteLine =>
        typeof item?.slug === 'string' && Number.isFinite(item?.qty) && Boolean(getLine(item.slug)),
    )
    .map((item) => ({ slug: item.slug, qty: Math.min(999, Math.max(1, Math.round(item.qty))) }));
}

function read(): QuoteLine[] {
  if (typeof window === 'undefined') return EMPTY;
  if (cache) return cache;
  try {
    cache = sanitize(JSON.parse(window.localStorage.getItem(KEY) || '[]'));
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: QuoteLine[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* almacenamiento no disponible: se mantiene en memoria */
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function addToQuote(slug: string, qty = 1) {
  const list = read();
  const existing = list.find((line) => line.slug === slug);
  write(
    existing
      ? list.map((line) => (line.slug === slug ? { ...line, qty: Math.min(999, line.qty + qty) } : line))
      : [...list, { slug, qty }],
  );
}

export function setQuoteQty(slug: string, qty: number) {
  write(read().map((line) => (line.slug === slug ? { ...line, qty: Math.min(999, Math.max(1, qty)) } : line)));
}

export function removeFromQuote(slug: string) {
  write(read().filter((line) => line.slug !== slug));
}

export function clearQuote() {
  write([]);
}

export function useQuoteList() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
