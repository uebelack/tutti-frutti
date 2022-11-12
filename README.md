# ToptalHackathonT2

## Get started

1. Copy the `.env.example` file to `.env`
2. `yarn install`
3. `yarn start`
4. open http://localhost:4200/

## Development Update

`yarn dev:update` - runs yarn install, prisma migrations and data import

## Database

1. Run `docker-compose up` to set up database container locally
2. Run `yarn prisma:migrate-dev` to run migrations

### Prisma scripts

`yarn prisma:migrate-dev` - runs migrations in development mode

`yarn prisma:studio` - opens prisma studio

### Data

`yarn dev:import` - imports categories and words from googlesheet
