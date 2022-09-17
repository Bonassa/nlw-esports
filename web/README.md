## Criando o projeto
Para criar o projeto com o Vite usamos

``` bash
  npm create vite@latest
```

E Selecionamos o framework que queremos utilizar e o tamplate


## Instalando o Tailwind
Como o Vite utiliza PostCSS (https://tailwindcss.com/docs/installation/using-postcss)

``` bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
```

## Phosphor Icons
Biblioteca de icones (https://phosphoricons.com/)

``` bash
  npm install phosphor-react
```

## Google Fonts
Fonte Inter (https://fonts.google.com/specimen/Inter?query=inter)
Adicionando as fontes no index.html
E alterando a fontFamily no tailwind.config

## Components complexos sem estilização
Bibliotecas que prevem componentes que seriam mais complexos de serem implementados, como modais, toggles etc

### Headless UI (https://headlessui.com/)

### Radix UI (https://www.radix-ui.com/)
#### Dialog (https://www.radix-ui.com/docs/primitives/components/dialog)
#### Checkbox (https://www.radix-ui.com/docs/primitives/components/checkbox)
#### Select (https://www.radix-ui.com/docs/primitives/components/select)
#### Toggle Group (https://www.radix-ui.com/docs/primitives/components/toggle-group)

## Fetch com Axios
``` bash
  npm install axios
```


# Próximos passos
## Carrosel (https://keen-slider.io/)
## Validações de formulários - React Hook Forms (https://react-hook-form.com/)