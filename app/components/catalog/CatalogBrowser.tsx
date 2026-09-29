'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import ProductCard from './ProductCard';
import { FAMILIES, PRODUCT_LINES, type FamilyId } from '@/lib/catalog';

type Filter = FamilyId | 'todas';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

function syncUrl(filter: Filter, query: string) {
  const url = new URL(window.location.href);
  if (filter === 'todas') url.searchParams.delete('familia');
  else url.searchParams.set('familia', filter);
  if (query) url.searchParams.set('q', query);
  else url.searchParams.delete('q');
  window.history.replaceState(null, '', url);
}

export default function CatalogBrowser() {
  const [filter, setFilter] = useState<Filter>('todas');
  const [query, setQuery] = useState('');

  // Lee ?familia= y ?q= (el buscador del header envía aquí).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('familia');
    if (FAMILIES.some((family) => family.id === requested)) setFilter(requested as FamilyId);
    setQuery(params.get('q') ?? '');
  }, []);

  const shown = useMemo(() => {
    const q = normalize(query.trim());
    return PRODUCT_LINES.filter((line) => {
      if (filter !== 'todas' && line.family !== filter) return false;
      if (!q) return true;
      return normalize(`${line.name} ${line.code} ${line.summary} ${line.settings.join(' ')}`).includes(q);
    });
  }, [filter, query]);

  const choose = (next: Filter) => {
    setFilter(next);
    syncUrl(next, query);
  };

  const count = (id: FamilyId) => PRODUCT_LINES.filter((line) => line.family === id).length;

  return (
    <div className="catalog">
      <aside className="catalog-sidebar" aria-label="Filtrar productos">
        <h2>Categorías</h2>
        <ul>
          <li>
            <button
              type="button"
              className={filter === 'todas' ? 'is-active' : undefined}
              onClick={() => choose('todas')}
            >
              Todas <span>({PRODUCT_LINES.length})</span>
            </button>
          </li>
          {FAMILIES.map((family) => (
            <li key={family.id}>
              <button
                type="button"
                className={filter === family.id ? 'is-active' : undefined}
                onClick={() => choose(family.id)}
              >
                {family.name} <span>({count(family.id)})</span>
              </button>
              <ul>
                {PRODUCT_LINES.filter((line) => line.family === family.id).map((line) => (
                  <li key={line.slug}>
                    <Link href={`/productos/${line.slug}`}>{line.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>

      <div className="catalog-main">
        <div className="catalog-toolbar">
          <p>
            {shown.length} {shown.length === 1 ? 'producto' : 'productos'}
            {filter !== 'todas' && <> en {FAMILIES.find((family) => family.id === filter)?.name}</>}
          </p>
          <label className="catalog-search">
            <Search aria-hidden="true" />
            <span className="sr-only">Buscar en el catálogo</span>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setQuery(value);
                const next: Filter = value && filter !== 'todas' ? 'todas' : filter;
                if (next !== filter) setFilter(next);
                syncUrl(next, value);
              }}
              placeholder="Filtrar por nombre o código"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  syncUrl(filter, '');
                }}
                aria-label="Limpiar búsqueda"
              >
                <X aria-hidden="true" />
              </button>
            )}
          </label>
        </div>

        <div className="catalog-chips" role="group" aria-label="Categorías">
          {(['todas', ...FAMILIES.map((family) => family.id)] as Filter[]).map((id) => (
            <button key={id} type="button" className={filter === id ? 'is-active' : undefined} onClick={() => choose(id)}>
              {id === 'todas' ? 'Todas' : FAMILIES.find((family) => family.id === id)?.name}
            </button>
          ))}
        </div>

        {shown.length > 0 ? (
          <div className="product-grid">
            {shown.map((line) => (
              <ProductCard key={line.slug} line={line} />
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            <p>
              No hay resultados para <strong>“{query}”</strong>.
            </p>
            <p>
              Si buscas un producto que no aparece en el catálogo, <Link href="/cotizar">escríbelo en tu cotización</Link>{' '}
              y lo buscamos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
