# Dopamina: atenção na era digital

Site estático em HTML, CSS e JavaScript. Não requer build nem dependências.

## Executar localmente

Abra `index.html` no navegador ou sirva a pasta com qualquer servidor HTTP local. Para testar o caminho de publicação, mantenha todas as páginas e diretórios na mesma raiz.

## Estrutura

- `index.html`: conteúdo principal.
- `quiz.html`: autoexame independente, que pode ser aberto em outra aba.
- `privacy.html`: explicação sobre privacidade e respostas do quiz.
- `404.html`: página não encontrada para hospedagens estáticas compatíveis.
- `assets/css/site.css`: estilos compartilhados.
- `assets/js/site.js`: interações da página principal.
- `assets/js/quiz.js`: cálculo local e comportamento do autoexame.
- `assets/icons/favicon.svg`: ícone do site.
- `site.webmanifest`: metadados básicos de instalação.
- `robots.txt`: permite rastreamento público.

## Publicação

Publique o conteúdo desta pasta na raiz de uma hospedagem estática, como GitHub Pages, Netlify, Cloudflare Pages ou Vercel. Antes de anunciar o site:

1. Teste `index.html`, `quiz.html`, `privacy.html` e a página 404 na URL publicada.
2. Configure domínio e HTTPS no provedor escolhido.
3. Depois de definir o domínio final, inclua URLs canônicas e crie um `sitemap.xml` com esse domínio. Eles não foram inventados neste projeto.
4. Confirme se a hospedagem oferece logs, métricas ou outros serviços que precisem ser descritos na política de privacidade.
5. Verifique a experiência no celular, navegação por teclado e links externos.

## Privacidade do quiz

O cálculo ocorre no navegador. As respostas não são enviadas por este código a um servidor nem gravadas em armazenamento local. A hospedagem ainda pode registrar dados técnicos de acesso conforme as próprias configurações e políticas.
