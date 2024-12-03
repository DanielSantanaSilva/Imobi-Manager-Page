# ImobiManager: Sistema de Gestão de Propriedades Imobiliárias

## Descrição

ImobiManager é uma API RESTful desenvolvida em Node.js e TypeScript para gerenciar um sistema simples de propriedades imobiliárias. O projeto utiliza PostgreSQL como banco de dados e TypeORM para interação com o banco. 

## Tecnologias Utilizadas

* **React:** Utilizado em conjunto com Next.js para criação de interfaces dinâmicas e interativas.
* **Next.js:** Utilizado para desenvolvimento frontend com renderização no lado do servidor (SSR).
* **TailwindCSS:** Framework para estilização com utilitários de CSS.
* **Shadcn:** Biblioteca para criação de componentes reutilizáveis, como botões, modais e barras de navegação.
* **Zod:** Para validação de dados no frontend.

## Funcionalidades

* **Tela Principal:**
* Listagem de todas as propriedades, com informações vindas da API.
* Implementação de filtros fornecidos pelo backend.
* Paginação para exibir 9 propriedades por página.

* **Tela de Detalhes do Empreendimento:** Criação de construtoras e vinculação com propriedades.
* Exibição de detalhes completos de uma propriedade selecionada.
* Uso adequado de semântica HTML (h1, h2, etc.).

* **Tela de Cadastro:** Upload de imagens para as propriedades e armazenamento no backend.
* Formulário para criar novas propriedades, com validação no frontend usando Zod.
* Placeholder para imagem no caso de ausência de upload.

## Arquitetura

* **Frontend:** React e Next.js para criação de interfaces do usuário com renderização no lado do servidor (SSR).
* **TailwindCSS** Para personalização e responsividade.
* **Shadcn :** Componentização com Shadcn para criar componentes reutilizáveis e consistentes.
* **Zod**  Para garantir dados consistentes antes de serem enviados à API.

## Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/DanielSantanaSilva/Imobi-Manager-Page.git

2. **Instale as dependências:**
   ```bash
   npm install

3. **Configure o banco de dados:**
Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente para conexão com o banco de dados.

4. **Execute a aplicação:**
   ```bash
   npm start

## Contribuindo
Agradecemos sua contribuição! Para contribuir com o projeto, siga estes passos:

* Fork o repositório.
* Crie uma nova branch.
* Faça suas alterações e commit.
* Envie um pull request.

Licença:
Este projeto está licenciado sob a licença MIT.

Autores
Daniel Santana Silva - Desenvolvedor principal