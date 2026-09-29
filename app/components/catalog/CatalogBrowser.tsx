'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import ProductCard from './ProductCard';
import { FAMILIES, PRODUCT_LINES, type FamilyId } from '@/lib/catalog';

type Filter = FamilyId | 'todas';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export default function CatalogBrowser() {
  const [filter, setFilter] = useState<Filter>('todas');
  const [query, setQuery] = useState('');

  // Permite enlazar a una familia: /productos?familia=monitoreo
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('familia');
    if (FAMILIES.some((family) => family.id === requested)) setFilter(requested as FamilyId);
  }, []);

  const choose = (next: Filter) => {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === 'todas') url.searchParams.delete('familia');
    else url.searchParams.set('familia', next);
    window.history.replaceState(null, '', url);
  };

  const shown = useMemo(() => {
    const q = normalize(query.trim());
    return PRODUCT_LINES.filter((line) => {
      if (filter !== 'todas' && line.family !== filter) return false;
      if (!q) return true;
      return normalize(`${line.name} ${line.code} ${line.summary} ${line.settings.join(' ')}`).includes(q);
    });
  }, [filter, query]);

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: 'todas', label: 'Todas', count: PRODUCT_LINES.length },
    ...FAMILIES.map((family) => ({
      id: family.id,
      label: family.name,
      count: PRODUCT_LINES.filter((line) => line.family === family.id).length,
    })),
  ];

  return (
    <div className="catalog">
      <div className="catalog-toolbar">
        <div className="catalog-tabs" role="tablist" aria-label="Filtrar por familia">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              className={filter === tab.id ? 'is-active' : undefined}
              onClick={() => choose(tab.id)}
            >
              {tab.label}
              <span>{tab.count}</span>
            </button>
          ))}
        </div>
        <label className="catalog-search">
          <Search aria-hidden="true" />
          <span className="sr-only">Buscar en el catálogo</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (event.target.value && filter !== 'todas') choose('todas');
            }}
            placeholder="Buscar producto…"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Limpiar búsqueda">
              <X aria-hidden="true" />
            </button>
          )}
        </label>
      </div>

      {filter !== 'todas' && (
        <p className="catalog-family-note">{FAMILIES.find((family) => family.id === filter)?.description}</p>
      )}

      {shown.length > 0 ? (
        <div className="product-grid">
          {shown.map((line) => (
            <ProductCard key={line.slug} line={line} />
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <p>
            <strong>No encontramos “{query}” en el catálogo publicado.</strong>
          </p>
          <p>Igual puedes pedirlo: trabajamos más productos de los que aparecen aquí.</p>
        </div>
      )}
    </div>
  );
}
