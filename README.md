# client

Iniciei o projeto a partir do comando `npx @vue/cli create .` na pasta client. Assim uma aplicação padronizada do VUE foi instalada podendo ser inicializada com o comando `npm run serve`.

Alterei o arquivo `favicon.ico`, algumas linhas do `index.html` e requisições simples do `App.vue`, mas nada que fosse muito radical. O arquivo que mais sofreu alterações foi o `HelloWorld` que até seu nome passou a ser `UserSettings`.

Apasta `assets` passou a conter o arquivo `style.css`.

# server

Em seguida, criei a pasta server para preparar o ambiente de conexção com o banco de dados. Utilizei os comando no terminal `npm init -y` e `npm install cors dotenv express nodemon pg` para instalar as dependências necessárias.

Criei o arquivo `.gitignore` que por motivos de acadêmicos, mantive os arquivos confidênciais pendentes de compartilhamento. Esses arquivos estão armazenados na pasta `data-base`, neles estão as informações necessárias para efetuar a conexção com  o banco de dados. Por motivos óbvios, os dados presentes neles são falsos, mas a estrutura está correta.

Também criei o arquivo `index.js` que armazenarei as configurações para o CRUD e, referente a ele, adicionei um "start" no "scripts" do `package.json`.