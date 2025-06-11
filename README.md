# Acessibilidade Dev - Backend API ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

> **TCC - Trabalho de Conclusão de Graduação | FATEC**  
> Plataforma digital colaborativa para discussão e compartilhamento de conhecimento sobre acessibilidade digital. API REST robusta desenvolvida com metodologia ágil em equipe multidisciplinar.

[![Deploy](https://img.shields.io/badge/Deploy-Heroku-430098?style=flat-square&logo=heroku&logoColor=white)](https://acessibilidade-dev-back-end.herokuapp.com)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://acessibilidade-dev-front-end.vercel.app/)
[![Organização](https://img.shields.io/badge/Organização-GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/acessibilidadedev)

## 🚀 Sobre o Projeto

### 🎯 **Contexto & Importância**
Este projeto nasceu da necessidade de democratizar o conhecimento sobre acessibilidade digital no Brasil. Desenvolvido como **Trabalho de Conclusão de Graduação** na **FATEC**, representa a convergência entre **responsabilidade social** e **excelência técnica**.

### 💡 **Inovações Técnicas**
- **🤖 Chatbot IA Pioneiro**: Integração com ChatGPT (2023) para tirar dúvidas sobre acessibilidade
- **🏗️ Arquitetura Escalável**: API REST com padrões enterprise e clean architecture
- **👥 Desenvolvimento Colaborativo**: 5 desenvolvedores usando metodologias ágeis
- **♿ Inclusão por Design**: Funcionalidades pensadas para pessoas com deficiência

## 🛠️ Stack Tecnológica

### 🎯 **Backend Core**
![Node.js](https://img.shields.io/badge/Node.js%2018-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express%204.18-000000?style=flat-square&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma%20ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript%20ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

### 🗄️ **Banco de Dados**
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma%20Studio-2D3748?style=flat-square&logo=prisma&logoColor=white)

### 🤖 **Integrações & IA**
![OpenAI](https://img.shields.io/badge/OpenAI%20GPT--3-412991?style=flat-square&logo=openai&logoColor=white)
![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=flat-square&logo=auth0&logoColor=white)

### ⚙️ **DevOps & Deploy**
![Heroku](https://img.shields.io/badge/Heroku-430098?style=flat-square&logo=heroku&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF6C37?style=flat-square&logo=multer&logoColor=white)

## 🏗️ Arquitetura & Design Patterns

### 📋 **Funcionalidades Principais**
- **📰 Sistema de Notícias**: CRUD completo com categorização
- **📚 Artigos Técnicos**: Gestão de conteúdo especializado
- **🛠️ Ferramentas**: Catálogo de recursos de acessibilidade
- **💬 Fórum de Discussão**: Tópicos, respostas e sistema de votos
- **🤖 IA Conversacional**: ChatGPT para dúvidas sobre acessibilidade
- **👥 Gestão de Usuários**: Perfis especializados por área de deficiência

### 🎨 **Padrões de Arquitetura**
- **🏛️ Clean Architecture**: Separação clara entre camadas
- **📦 Repository Pattern**: DAOs especializados (Prisma ORM)
- **🎯 Model-View-Controller**: Estrutura MVC bem definida
- **🔒 Single Responsibility**: Cada classe com propósito específico
- **🛡️ Middleware Pattern**: Validações e tratamento de erros

### 🗂️ **Estrutura do Projeto**
```
src/
├── controllers/          # Camada de controle (MVC)
│   ├── article.controller.js
│   ├── news.controller.js
│   ├── topic.controller.js
│   ├── user.controller.js
│   └── tool.controller.js
├── models/              # Modelos de domínio
│   ├── article.js
│   ├── news.js
│   ├── topic.js
│   └── user.js
├── services/            # Data Access Objects (DAO)
│   ├── article.dao.js
│   ├── news.dao.js
│   ├── topic.dao.js
│   └── generate.js      # OpenAI Integration
├── routes/              # Definição de rotas REST
└── helpers/             # Utilitários e helpers
```

## 🚀 Funcionalidades Avançadas

### 🤖 **IA Generativa (Inovação 2023)**
```javascript
// Validação automática de contexto
function validatePrompt(text) {
  return `Essa dúvida: "${text}", está relacionada a acessibilidade digital?`;
}

// Geração de respostas especializadas
function generatePrompt(text) {
  return `Dê uma solução usando no máximo 300 palavras, para essa duvida sobre acessibilidade: ${text}`;
}
```

### 🔍 **Sistema de Busca Avançada**
- **Full-text search** em múltiplas entidades
- **Busca por tags** com relacionamento many-to-many
- **Filtros por categoria** de deficiência
- **Busca por autor** e especialização

### 📊 **Sistema de Votação**
```javascript
// Implementação de sistema democrático de avaliação
exports.updateVotes = async (id, objTopic) => {
  return await updateVotes(id, objTopic);
};
```

## ⚙️ Como executar

### Pré-requisitos
- Node.js 18+ e npm/yarn
- PostgreSQL 12+
- Conta OpenAI (API Key)

### Instalação e execução
```bash
# Clonar o repositório
git clone https://github.com/mdaniliauskas/acessibilidade-dev-back-end.git
cd acessibilidade-dev-back-end

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# Executar migrações do banco
npx prisma migrate dev

# Popular banco com dados iniciais
npx prisma db seed

# Iniciar servidor de desenvolvimento
npm run dev

# Servidor rodando em http://localhost:3000
```

### 🗄️ **Banco de Dados**
```bash
# Visualizar banco de dados
npx prisma studio

# Reset completo do banco
npx prisma migrate reset
```

## 📡 API Endpoints

### 👥 **Usuários**
```
POST   /user/pre-signup     # Pré-cadastro
GET    /user/:id            # Buscar usuário
PUT    /user                # Atualizar perfil
DELETE /user/:id            # Remover usuário
```

### 💬 **Fórum**
```
GET    /topic               # Listar tópicos
POST   /topic               # Criar tópico
GET    /topic/:id           # Detalhes do tópico
PUT    /topic/:id/votes     # Votar em tópico
DELETE /topic/:id           # Remover tópico
```

### 🤖 **IA Generativa**
```
POST   /openai              # Consultar ChatGPT sobre acessibilidade
```

### 📰 **Conteúdo**
```
GET    /news                # Listar notícias
GET    /article             # Listar artigos
GET    /tool                # Listar ferramentas
```

## 🌟 Destaques Técnicos

### 🛡️ **Segurança & Validação**
- **Prisma ORM**: Proteção contra SQL Injection
- **Input Sanitization**: Validação robusta de entradas
- **Error Handling**: Tratamento abrangente de exceções
- **CORS configurado**: Integração segura com frontend

### 🧪 **Qualidade de Código**
- **Separação de responsabilidades**: Controllers ↔ Models ↔ Services
- **Reutilização**: Herança entre modelos (Text → Article/News/Topic)
- **Consistência**: Padrões uniformes em todos os endpoints
- **Documentação**: Código autodocumentado e limpo

### 📈 **Performance & Escalabilidade**
- **Relacionamentos otimizados**: Include/Select estratégicos no Prisma
- **Paginação implementada**: Queries eficientes
- **Tags inteligentes**: Sistema many-to-many performático
- **Deploy production-ready**: Heroku com configurações otimizadas

## 👥 Equipe de Desenvolvimento

### 🎓 **TCC FATEC - Análise e Desenvolvimento de Sistemas**

| Desenvolvedor | GitHub |
|--------------|--------|
| **Marcelo Daniliauskas** | [@mdaniliauskas](https://github.com/mdaniliauskas) |
| **Arthur Nascimento** | [@Arthur-cmd256](https://github.com/Arthur-cmd256) |
| **Luan Teixeira** | [@luanLTS](https://github.com/luanLTS) |
| **Ranayna Alves de Oliveira** | [@Ranayna](https://github.com/Ranayna) |
| **Weslley Rodrigues** | [@weslleyrods](https://github.com/weslleyrods) |

> **🏆 Projeto aprovado com destaque pela banca examinadora da FATEC**  
> **🤝 Desenvolvimento colaborativo com metodologia ágil**  
> **🌍 Impacto social: democratização do conhecimento sobre acessibilidade**

## 🔗 Ecossistema do Projeto

### 🌐 **Repositórios Relacionados**
- **Frontend React**: [acessibilidade-dev-front-end](https://github.com/mdaniliauskas/acessibilidade-dev-front-end)
- **Chat Firebase**: [Chat_Firebase](https://github.com/mdaniliauskas/Chat_Firebase)
- **Organização**: [acessibilidadedev](https://github.com/acessibilidadedev)

### 🚀 **Demonstração Online**
- **🔗 API Base**: https://acessibilidade-dev-back-end.herokuapp.com
- **🌐 Frontend**: https://acessibilidade-dev-front-end.vercel.app/
- **📖 Documentação**: Endpoints REST com OpenAPI specification

## 📚 Contexto Acadêmico & Metodologia

### 📋 **Processo de Desenvolvimento**
- **📊 Análise de requisitos**: Funcionais e não-funcionais
- **🎨 Prototipação**: Wireframes e mockups
- **📐 Modelagem**: Diagramas UML e ER
- **📈 Arquitetura**: Desenho de sistemas escaláveis
- **🔄 Metodologia ágil**: Sprints e entregas contínuas
- **✅ Revisão acadêmica**: Estado da arte em acessibilidade

### 🎯 **Impacto Social & Técnico**
- **♿ Inclusão digital**: Ferramenta para comunidade PcD
- **📚 Democratização**: Conhecimento acessível sobre acessibilidade
- **🚀 Inovação**: ChatGPT especializado em acessibilidade (2023)
- **👥 Colaboração**: Metodologia de squad aplicada na prática

## 📄 Status & Contribuições

> ✅ **Projeto Finalizado - TCC Aprovado**  
> 🏆 **Destaque na Banca Examinadora**  
> 🌟 **Inovação em IA para Acessibilidade**  
> 🤝 **Desenvolvimento Colaborativo Exemplar**

---

<p align="center">
  <strong>🎓 FATEC - Tecnólogo em Análise e Desenvolvimento de Sistemas</strong><br>
  <em>Tecnologia a serviço da inclusão social</em>
</p>

<p align="center">
  <a href="https://github.com/mdaniliauskas">
    <img src="https://img.shields.io/badge/Portfólio%20GitHub-100000?style=flat-square&logo=github&logoColor=white" alt="Portfólio GitHub">
  </a>
  <a href="mailto:marcelo.daniliauskas@gmail.com">
    <img src="https://img.shields.io/badge/E--mail-D14836?style=flat-square&logo=gmail&logoColor=white" alt="E-mail">
  </a>
  <a href="https://www.linkedin.com/in/mdaniliauskas">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>
