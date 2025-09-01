# Contenido

1. [Introducción](#introducción)
2. [Requerimientos funcionales](#requerimientos-funcionales)
3. [Requerimientos no funcionales](#requerimientos-no-funcionales)
4. [Tecnologías](#tecnologías)
5. [Arquitectura](#arquitectura)
6. [Instalación](#instalación)
7. [Ejecución](#ejecución)
8. [Deploy local](#deploy-local)
9. [Test unitarios](#test-unitarios)
10. [Swagger](#swagger)

# Introducción

La tarea consiste en construir APIs que permitan gestionar información sobre **empresas** y sus **transferencias**.  
La solución debe ser clara, mantenible, escalable y escrita con buenas prácticas:

- Clean Code  
- Separación de responsabilidades  
- Claridad en los nombres  
- Arquitectura modular  

# Requerimientos funcionales

Se deben implementar los siguientes **endpoints**:

1. Obtener las empresas que realizaron transferencias en el último mes.  
2. Obtener las empresas que se adhirieron en el último mes.  
3. Registrar la adhesión de una nueva empresa:  
   - Empresa Pyme.  
   - Empresa Corporativa.  

# Requerimientos no funcionales

- La API debe estar escrita en **NestJS** (standalone).  
- No se permite el uso de **Docker**.  
- No es necesario desplegar la API, pero debe poder ejecutarse localmente.  
- Persistencia: puede usarse **PostgreSQL**, archivo JSON o almacenamiento en memoria.  
- En caso de usar BD, se debe incluir una instancia embebida, simulada o en Cloud.  
- Arquitectura clara (**Clean Architecture / Hexagonal** deseable).  

# Tecnologías

- **Framework:** NestJS  
- **Lenguaje:** TypeScript  
- **Base de Datos:** PostgreSQL (o alternativa en memoria)  

# Arquitectura

La aplicación sigue principios de **Clean Architecture**, asegurando:  

- Separación entre dominio, aplicación e infraestructura.  
- Capas desacopladas para facilitar testeo y mantenibilidad.  
- Posibilidad de reemplazar adaptadores (ej. persistencia en memoria ↔ PostgreSQL) sin modificar la lógica de negocio.  

# Instalación

```bash
npm install
```

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
