# Backend / API

Este proyecto fue generado utilizando el framework [Nest](https://github.com/nestjs/nest) de Node.js utilizando TypeScript.

## Installation

El unico requisito de instalacion antes de seguir los siguientes pasos es tener tanto [git](https://git-scm.com/) como [Node.js 18.12.1+](https://nodejs.org/en/) instalados

1. Clonar el repositorio:

```bash
rm -rf backend
git clone https://github.com/jsasuga/backend.git
git checkout master
git pull
```

2. Hacer los scripts ejecutables
```bash
chmod +x ./scripts/0_make_scripts_executable.sh
``` 

3. Verificar que netstat este instalado 
```bash
which netstat
# si no esta instalado
sudo apt update
sudo apt install net-tools
```

4. Instalar dependencias con el script de initial setup
```bash
./scripts/1_initial_setup.sh
```

5. Dar setup a la base de datos (UNICAMENTE EN LA PRIMERA VEZ DE INSTALACION INSTALACION)
```bash
# correr los comandos manualmente del script ./scripts/2_database_setup_RUN_MANUALLY.sh
>>>>
# install postgres if not installed yet
# sudo apt update
# sudo apt install postgresql postgresql-contrib
# sudo systemctl start postgresql.service

# check postgres status
sudo systemctl status postgresql.service

# create database on postgres and update password
sudo -i -u postgres
psql
ALTER USER postgres PASSWORD 'abnOMYcliCErCUlCmENzWoRwAiSt';
\q
dropdb AtencionVictimas --if-exists
createdb AtencionVictimas
exit
```

6. Asignar valores correctos a archivos de configuracion
```bash
# los valores se pueden asignar a los configurados en el paso anterior usando el tercer script
./scripts/3_switch_env_files.sh
```

7. Correr migraciones
```bash
# correr el cuarto script
./scripts/4_run_migrations.sh
```

8. Correr el API

```bash
# correr el script de serve_with_output.sh
./scripts/serve_with_output.sh &
```

9. Crear usuario inicial (UNICAMENTE EN LA PRIMERA VEZ DE INSTALACION INSTALACION)

```bash
# correr el script de serve_with_output.sh
./scripts/serve_with_output.sh &
```

## Configuraciones

Todas las configuraciones estan centralizadas en los archivos `src/common/envs/production.env`, `src/common/envs/development.env` y `.env`

Las configuraciones mas importantes de cambiar son las que estan debajo del tag `[database]`, principalmente `host, port, name, user, password`. A su vez tambien cambiar las configuraciones de JWT para un ambiente de produccion.

Sicemp user y password es para la autenticacion con el API de SICEMP.

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

SICEMP_USER=desarrollo
SICEMP_PASSWORD=123456
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
