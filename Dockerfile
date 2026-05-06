# Estágio 1: Build (Compilação do TypeScript)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependências primeiro para aproveitar o cache do Docker
COPY package*.json ./
RUN npm install

# Copia o restante do código e o tsconfig
COPY . .

# Executa o build para gerar a pasta dist
RUN npm run build

# Estágio 2: Runner (Execução em produção)
FROM node:20-alpine

WORKDIR /app

# Define variável de ambiente para produção
ENV NODE_ENV=production

# Copia apenas o necessário do estágio de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Instala apenas dependências de produção (ignora devDependencies)
RUN npm install --only=production

# A porta padrão do Back4app costuma ser 3000, mas o app deve usar a variável PORT
#EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]
