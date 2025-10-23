# Diságua App

Aplicativo desktop com Electron + React.

## Requisitos
- Node.js 18+

## Scripts
- `npm run dev` — inicia somente o servidor de desenvolvimento do Vite em `:5173`.
- `npm run build` — gera apenas o bundle do Vite em `dist/` (não empacota o app Electron).
- `npm run preview` — roda um servidor local para inspecionar o bundle gerado pelo Vite.
- `npm run electron` — executa o Vite e inicializa o Electron apontando para o dev server (fluxo de desenvolvimento desktop).

## Estrutura
- `electron/` — processo principal do Electron e preload.
- `src/` — app React (renderer).
- `public/` — assets estáticos (manifest, ícones).

## Notas
- Adicione o ícone em `electron/icons/app-icon.png` (512x512) para builds.
- Este projeto usa Vite; o arquivo `index.html` fica na raiz.

