import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const css = readFileSync(join(process.cwd(), 'node_modules/@cristal/tokens/build/tokens.css'), 'utf8');
const tokens = [...css.matchAll(/(--cr-[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => ({ name, value }));

export function TokenTable({ prefix }: { prefix: string }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Valeur</th>
        </tr>
      </thead>
      <tbody>
        {tokens
          .filter((token) => token.name.startsWith(prefix))
          .map((token) => (
            <tr key={token.name}>
              <td>
                <code>{token.name}</code>
              </td>
              <td>
                <span className="inline-flex items-center gap-2">
                  {prefix === '--cr-color' && (
                    <span aria-hidden="true" className="inline-block size-4 rounded border" style={{ background: token.value }} />
                  )}
                  <code>{token.value}</code>
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
