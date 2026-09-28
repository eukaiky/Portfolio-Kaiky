# Portfólio — Kaiky Rodrigues Geraldo

Portfólio em React, Vite e Tailwind CSS. Identidade em grafite e verde, fontes locais, navegação responsiva e páginas reais dos projetos em destaque.

## Abrir no Windows

Instale o Node.js 24 LTS, se necessário: https://nodejs.org/.

Depois de extrair a pasta `Portfolio-Kaiky`, dê dois cliques em **INICIAR.cmd**. Ele instala as dependências na primeira execução e abre o site. Mantenha a janela aberta durante o uso; encerre com Ctrl+C.

Ou abra um terminal dentro da pasta e execute:

```powershell
npm.cmd ci
npm.cmd run dev
```

Abra o endereço exibido no terminal, normalmente `http://127.0.0.1:5173/`.
Em macOS/Linux, use `npm` no lugar de `npm.cmd`.

## Conferir a versão de produção

```powershell
npm.cmd run build
npm.cmd run preview
```

O resultado fica em `dist/`. O projeto usa caminhos relativos para também funcionar em um subdiretório. O site não precisa de servidor de aplicação, banco de dados ou variáveis secretas.

## Enviar ao GitHub — pasta local já vinculada

A pasta criada nesta conversa já é um clone de `https://github.com/eukaiky/Portfolio-Kaiky`. Nenhum commit ou envio remoto foi feito por esta entrega. Dentro dela:

```powershell
git status
git add .
git commit -m "Cria portfolio de Kaiky Rodrigues Geraldo"
git push -u origin HEAD
```

O Git poderá solicitar sua autenticação no GitHub. Enviar o código ao repositório não publica o site automaticamente.

## Enviar ao GitHub — se você baixou o ZIP

O ZIP não contém o histórico `.git`. Para preservar qualquer conteúdo existente no GitHub, clone o repositório primeiro. Abra o PowerShell na pasta extraída `Portfolio-Kaiky` e execute:

```powershell
git clone https://github.com/eukaiky/Portfolio-Kaiky.git ../Portfolio-Kaiky-github
```

Se a pasta de destino já existir, use seu clone existente ou escolha outro nome; não exclua a pasta. Quando o clone concluir, execute o bloco abaixo. Ele verifica conflitos antes de copiar os arquivos e interrompe caso o repositório já contenha arquivos com os mesmos nomes.

```powershell
$origem = (Get-Location).Path
$destino = (Resolve-Path ../Portfolio-Kaiky-github).Path
$arquivos = Get-ChildItem -LiteralPath $origem -Force | Where-Object { $_.Name -notin @('.git', 'node_modules', 'dist') }
$conflitos = @($arquivos | Where-Object { Test-Path -LiteralPath (Join-Path $destino $_.Name) })
if ($conflitos.Count -gt 0) {
  throw 'O repositorio ja possui arquivos com os mesmos nomes. Compare o conteudo antes de copiar.'
}
foreach ($arquivo in $arquivos) {
  Copy-Item -LiteralPath $arquivo.FullName -Destination $destino -Recurse
}
Set-Location -LiteralPath $destino
git status
git add .
git commit -m "Cria portfolio de Kaiky Rodrigues Geraldo"
git push -u origin HEAD
```

## Atualizar conteúdo

Os dados ficam em **src/data/portfolio.js**:

- `profile`: nome, e-mail, número do WhatsApp e redes sociais.
- `projects`: descrição, participação, imagem, links e detalhes de cada projeto.
- `published: false`: oculta um projeto sem apagar o cadastro.
- `image`: caminho relativo à pasta `public`, por exemplo `projects/nr-sucos.jpg`.
- `technologies`: use somente tecnologias confirmadas. Nos projetos de clientes, os destaques são funcionalidades verificadas; a stack não foi presumida.

Para trocar uma captura, coloque o novo arquivo em `public/projects/` e atualize `image` e `imageAlt` no cadastro.

## Estrutura

```text
public/
  favicon.svg
  projects/
    fatal-coach.jpg
    nr-sucos.jpg
    brunno-rodrigues.jpg
src/
  data/portfolio.js
  App.jsx
  index.css
  main.jsx
.gitignore
.nvmrc
index.html
INICIAR.cmd
package.json
package-lock.json
vite.config.js
```

## Conteúdo e fontes

Contatos e projetos foram fornecidos por Kaiky nesta conversa. Capturas e funcionalidades foram conferidas nas páginas públicas em 28/09/2026:

- Fatal Coach: https://www.fatalcoach.shop/
- NR Sucos: https://nr-sucos.vercel.app/
- Brunno & Rodrigues: https://www.brunnoerodrigues.com.br/

O site mantém os créditos das marcas nas capturas e não informa métricas de resultado ou tecnologias não confirmadas. A imagem tipográfica do próprio portfólio é uma composição em texto e CSS.

Instalação conforme a documentação oficial:

- Vite: https://vite.dev/guide/
- Tailwind com Vite: https://tailwindcss.com/docs/installation/using-vite

As versões exatas estão em `package.json` e `package-lock.json`. As fontes Manrope são distribuídas localmente pelo pacote Fontsource, sem requisições ao Google Fonts durante a visita.

## Contato e comportamento

WhatsApp abre uma mensagem preenchida; o visitante decide enviá-la. E-mail abre o aplicativo de e-mail do visitante. O botão de copiar confirma a cópia e oferece uma orientação caso o navegador não permita acesso à área de transferência. Não há formulário que simule envio, rastreamento ou coleta de dados.
