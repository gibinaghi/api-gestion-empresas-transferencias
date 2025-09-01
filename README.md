# Contenido

1. [Introducción](#introduccion)
2. [Tecnologias](#tecnologias)
3. [Instalacion](#instalacion)
4. [Ejecucion](#ejecución)
5. [Deploy local](#deploy-local)
6. [Test unitarios](#test-unitarios)
7. [Swagger](#swagger)

# Introduccion

Api .................

# Tecnologias

- **Framework:** NestJS
- **Lenguaje:** TypeScript
- **Base de Datos:** PostgreSQL

# Instalacion

`npm install`

# Ejecución

Local: `npm run start:dev`

# Deploy local

- generar .env en base al archivo .env.example
- tener una base de datos PostgreSQL creada
- para tener datos en la base de datos correr el script sql que se encuentra en la carpeta script
- utilizar el debugger de vs code y correrlo con la opción 'Debug Nest Framework' si se quieren usar breakpoints
- En caso contrario utilizar comand `npm run start:dev` para levantar la aplicacion de modo local

# Test unitarios

- definir test unitarios con nomenclatura \*.spec.ts
- la configuracion de los test unitarios se hace sobre el archivo jest.config.js
- para debuggear y correr tests ejecutar sobre el 'Run and Debug' el suite 'Debug Jest unit Tests' parado sobre el test que se quiere correr. Esto permite debuggear los resultados de los tests

# Swagger

http://localhost:${port}/docs`
