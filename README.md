# Conhecendo as Escrituras — Redesign V2

Redesign estratégico do site original, desenvolvido do zero para GitHub Pages.

## Direção do projeto

A página original é a fonte de conteúdo, proposta, identidade e informações reais. O código que existia anteriormente neste repositório foi descartado e não é usado como referência de implementação.

O objetivo é transformar a página em uma experiência de aquisição mais clara, confiável e agradável, combinando UX, UI, arquitetura da informação, copywriting, marketing digital, CRO, acessibilidade, comportamento do usuário e design responsivo.

### Princípio central

> **Compreenda as Escrituras com mais clareza e contexto.**

A jornada deve seguir, de forma natural:

**identificação → perspectiva → transformação → método → conteúdo → resultados percebidos → autoridade → prova → oferta → redução de risco → FAQ → decisão.**

## Pesquisa utilizada

As decisões do redesign são orientadas por referências e pesquisas de:

- BibleProject Classroom e outras experiências digitais de estudo bíblico;
- Nielsen Norman Group, especialmente legibilidade, escaneabilidade e hierarquia visual;
- Baymard Institute, especialmente clareza e usabilidade de páginas de produto/compra;
- WCAG 2.2 para acessibilidade.

Nenhuma interface ou texto de referência é copiado. Os padrões são reinterpretados para a identidade do Conhecendo as Escrituras.

## Regras de conteúdo

Não inventar:

- credenciais;
- depoimentos;
- números;
- garantias;
- políticas comerciais;
- resultados;
- materiais do curso.

Quando uma informação ainda não estiver confirmada, o layout usa uma indicação explícita de placeholder ou aguarda o dado real.

## Estrutura técnica

Projeto estático, sem framework obrigatório:

```text
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── .github/
    └── workflows/
        └── pages.yml
```

## Processo

Este chat é a referência operacional do projeto. Cada etapa deve ser:

1. pesquisada quando necessário;
2. implementada no repositório;
3. revisada em UX, UI, conteúdo, responsividade e acessibilidade;
4. validada antes de avançar.
