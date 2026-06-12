# Visualizador CNAB240

Aplicativo web estatico para visualizacao local de arquivos CNAB240 de remessa
e retorno.

## Site publicado

https://abrusco.github.io/visualizador-cnab240/

## Privacidade

- Todo o processamento ocorre no navegador.
- Nenhum arquivo ou dado bancario e enviado para servidores ou APIs externas.
- Nao utiliza backend nem banco de dados.

## Recursos

- Importacao local com Web Worker.
- Segmentos A e B agrupados na mesma linha.
- Busca, filtros, ordenacao e paginacao.
- Tratamento de ocorrencias de retorno, incluindo `BD` como sucesso.
- Identificacao visual dos principais bancos pelo codigo COMPE.
- Fallback com nome e distintivo para bancos ainda sem perfil proprio.
- Exportacao CSV, detalhes posicionais e temas visuais.

O `index.html` e totalmente standalone e pode ser aberto diretamente no
navegador.
