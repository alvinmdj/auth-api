# Auth API

Dicoding BE Expert.

Clean Architecture, Test Driven Development, Domain Driven Design.

Hapi.js, JWT, PostgreSQL, Jest.

## Setup project & postgres db

[setup projek](https://www.dicoding.com/academies/276/tutorials/18947)

## Folder Structure

```sh
auth-api/                   → Root Proyek.
├─ config/                  → Folder konfigurasi, digunakan untuk mengonfigurasi node-pg-migrate pada database testing.
├─ migrations/              → Berkas migrations database.
├─ src/                     → Source code aplikasi
│  ├─ Applications/         → Application Business Rules
│  │  ├─ security/          → Abstraksi/interface dari tools dan helper dalam hal security yang digunakan pada use case. Contohnya AuthTokenManager dan EncryptionHelper
│  │  ├─ use_cases/         → Alur bisnis aplikasi.
│  ├─ Commons/              → Shared folder.
│  │  ├─ exceptions/        → Custom exceptions.
│  ├─ Domains/              → Enterprise Business Rules.
│  │  ├─ authentications/   → Subdomain authentications, di sini berisi domain model (entities) dan abstraksi/interface AuthenticationRepository .
│  │  ├─ users/             → Subdomain users, di sini berisi domain model (entities) dan abstraksi/interface UserRepository.
│  ├─ Infrastructures/      → Agen External seperti Framework dan Tools External.
│  │  ├─ database/          → Driver database.
│  │  ├─ http/              → HTTP Server menggunakan Hapi.js.
│  │  ├─ repositories/      → Objek konkrit/implementasi dari repository domain.
│  │  ├─ security/          → Objek konkrit/implementasi dari tools dan helper dalam hal security.
│  │  ├─ container.js       → Penampung (container) seluruh instance dari service yang digunakan aplikasi.
│  ├─ Interfaces/           → Interface Adapter. Di sini kita akan mendefinisikan routes configuration dan juga handler yang dibungkus dengan Hapi Plugin.
│  ├─ app.js                → Entry point aplikasi.
├─ tests/                   → Utilitas kebutuhan untuk testing.
├─ .env                     → Environment variable.
├─ package.json             → Project Manifest.
```

## Setup psql db

- Login as root user:

```psql --username postgres```

- Create db:

```CREATE DATABASE authapi; CREATE DATABASE authapi_test;```

- Grant access to user 'alvin':

```GRANT ALL PRIVILEGES ON DATABASE authapi, authapi_test TO alvin;```

## Create migration file

```npm run migrate create "create table users"```

```npm run migrate create "create table authentications"```

## Run migrations

App db: ```npm run migrate up```

Test db: ```npm run migrate:test up```

## Run test on development (watch mode)

- Make a copy of the config/database/test_example.json file and rename it to test.json
```cp config/database/test_example.json config/database/test.json```

```npm run test:watch```

## Run server on development

```npm run start:dev```

## Package used for Service Locator implementation

[instances-container](https://github.com/dimasmds/instances-container)

```instances-container``` popular alternatives:

- [Awilix](https://github.com/jeffijoe/awilix)
- [Bottlejs](https://github.com/young-steveo/bottlejs)

## AWS

### Connect AWS RDS (PostgreSQL)

```sh
psql -h <rds-endpoint> -U <username>
# psql -h auth-api-cluster.xxxx.ap-southeast-1.rds.amazonaws.com -U postgres
```

### Connect EC2

cd to pem file dir:

```sh
ssh -i "<pem-name>.pem" ubuntu@<ec2-public-address>
# ssh -i "auth-api-app-server.pem" ubuntu@ec2-xx.xx.xx.xx.ap-southeast-1.compute.amazonaws.com
```

- [create aws rds cluster](https://www.dicoding.com/academies/276/tutorials/19042)
- [connect ec2 from ssh](https://www.dicoding.com/academies/271/tutorials/17546)
- [config ec2 from ssh](https://www.dicoding.com/academies/276/tutorials/19057)
- [setup nginx from ssh](https://www.dicoding.com/academies/276/tutorials/19107)
