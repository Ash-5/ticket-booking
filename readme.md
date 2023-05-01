## Description
This is a REST api collection for movie crub operation with monitoring.

## Rename .env.sample to .env
**NOTE:- Update file values**

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ docker compose up
```

## Enter app container
```bash
$ docker compose exec -it app sh
```
## First time project setup
**Note:- Run migration to create tables in db.**
    * run migration
        - Enter container
        - cd `src`
        - run command:- /var/www/node_modules/sequelize-cli/lib/sequelize db:migrate

## Stay in touch

- Author - [Ashish Srivastav](ashish.srivastav11145@gmail.com)
