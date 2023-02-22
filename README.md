# Backend / API

Este proyecto fue generado utilizando el framework [Nest](https://github.com/nestjs/nest) de Node.js utilizando TypeScript.

## Installation

El unico requisito de instalacion antes de seguir los siguientes pasos es tener tanto [git](https://git-scm.com/) como [Node.js 18.12.1+](https://nodejs.org/en/) instalados

1. Clonar el repositorio:

```bash
git clone https://github.com/jsasuga/backend.git
git checkout master
git pull
```

2. Instalar dependencias
```bash
npm install
```

3. Correr el API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Configuraciones

Todas las configuraciones estan centralizadas en el archivo `src/common/envs/production.env`

Las configuraciones mas importantes de cambiar son las que estan debajo del tag `[database]`, principalmente `host, port, name, user, password`. A su vez tambien cambiar las configuraciones de JWT para un ambiente de produccion

Ejemplo del archivo:
```env
PORT=1938

DATABASE_HOST=jelani.db.elephantsql.com
DATABASE_NAME=qzzeneja
DATABASE_USER=qzzeneja
DATABASE_PASSWORD=vZjhmMgeCmGg4SI1Q7s3XO5V2qEiCYfn
DATABASE_PORT=5432

JWT_KEY=dev
JWT_EXPIRES=365d
```

## Estructura del proyecto

La carpeta donde se encuentra todo el codigo fuente para trabajar en la aplicacion es `src/api`, esta misma se divide en cada uno de los modulos y cada uno de ellos cuenta con 5 archivos.

* *Controller* - Rutas del api
* *DTO* - Data Transfer Object para utilizar con el API
* *Entity* - Modelo que se refleja en la base de datos
* *Module* - Configuracion de Nest.js
* *Service* - Servicio que contiene logica del negocio para cada API.

```
src
└── api
    └── (modules...)
        └── (object.controller)
        └── (object.dto)
        └── (object.entity)
        └── (object.module)
        └── (object.service)
└── common
    └── env
    └── helpers
└── shared
    └── typeorm
```

## Diagrama Entidad Relacion

Este es el DER final de la aplicacion

<img src="https://i.imgur.com/COQcVkV.jpg" width="750" height="850" />

## Docker

La aplicacion tambien se puede correr con [Docker](https://www.docker.com/) para facilitar la instalacion.

```
docker build -t relevic-backend .
docker run -p80:1938 relevic-backend
docker stop *ps*
```

## Comandos para crear nuevos modulos

```
nest g mo api/follow-up && nest g co api/follow-up --no-spec && nest g s api/follow-up --no-spec
touch src/api/follow-up/follow-up.dto.ts
touch src/api/follow-up/follow-up.entity.ts
```
