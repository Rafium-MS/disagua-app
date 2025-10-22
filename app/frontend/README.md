# Diságua App

Aplicativo desktop com Electron + React.

## Requisitos
- Node.js 18+

## Scripts
- `npm run dev` — inicia Vite no `:5173` e o Electron apontando para o dev server.
- `npm run build` — gera `dist/` (renderer) e empacota com `electron-builder`.
- `npm start` — inicia apenas o Electron com o conteúdo já empacotado.

## Estrutura
- `electron/` — processo principal do Electron e preload.
- `src/` — app React (renderer).
- `public/` — assets estáticos (manifest, ícones).

## Notas
- Adicione o ícone em `electron/icons/app-icon.png` (512x512) para builds.
- Este projeto usa Vite; o arquivo `index.html` fica na raiz.

