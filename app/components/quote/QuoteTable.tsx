import type { QuoteItem } from './types';

interface QuoteTableProps {
  items: QuoteItem[];
  formatCurrency: (value: number) => string;
}

export default function QuoteTable({
  items,
  formatCurrency,
}: QuoteTableProps) {
  return (
    <section className="quote-table-wrap">
      <table className="quote-table">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Producto / servicio</th>
            <th>Cant.</th>
            <th>Precio unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.code}>
              <td className="quote-code">{item.code}</td>
              <td>
                <strong>{item.name}</strong>
                <span>{item.detail}</span>
              </td>
              <td>{item.quantity}</td>
              <td>{formatCurrency(item.price)}</td>
              <td>{formatCurrency(item.quantity * item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
