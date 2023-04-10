# Activity Monitoring API & CLIENT

This project is a combination of two parts. A REST API built on Falcon that uses MongoDB and InfluxDB to handle data. And a client build in React JS with Next JS for the frontend dashboard implementation. The project deals with acquiring data from the user via endpoints and storing the collected data in InfluxDB. MongoDB is used to store users, studies created by users, and meals. Different endpoints are used to manipulate this data. Two main roles are on the system right now, admin and member, each of them can access a different dashboard.

Table of Contents
-----------------

*   [Technologies Used](#technologies-used)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installing](#installing)
    *   [Deployment](#deployment)
*   [Endpoints](#endpoints)
*   [Use Cases](#use-cases)
*   [Contributing](#contributing)
*   [License](#license)

Technologies Used
-----------------

* [![Falcon REST][FalconREST.icon]][FalconREST-url]
* [![MongoDB][MongoDB.icon]][MongoDB-url]
* [![InfluxDB][InfluxDB.icon]][InfluxDB-url]
* [![Docker][Docker.icon]][Docker-url]
* [![React][React.icon]][React-url]
* [![Next][Next.icon]][Next-url]

Getting Started
---------------

To get a copy of the project up and running on your local machine, follow these steps.

### Prerequisites

*   Docker
*   Docker Compose

### Installing

1.  Clone the repository

```git clone https://github.com/<username>/<repository-name>.git```

2.  Create a `.env` file with the following environment variables:


```
DOCKER_INFLUXDB_INIT_MODE=setup 
DOCKER_INFLUXDB_INIT_USERNAME=
DOCKER_INFLUXDB_INIT_PASSWORD= 
INFLUXDB_URL=http://influxdb:8086 
DOCKER_INFLUXDB_INIT_ADMIN_TOKEN=
DOCKER_INFLUXDB_INIT_ORG=hua 
DOCKER_INFLUXDB_INIT_BUCKET=android 
DOCKER_INFLUXDB_INIT_PORT=8086 
DOCKER_INFLUXDB_INIT_HOST=influxdb 
JWT_SECRET=secretkeygoeshere 
DB_USER=admin 
DB_PASSWORD=admin 
DB_NAME=falconapidb
```

3.  Create a `data.json` file in the `init-mongodb/data` directory with the initial data for the MongoDB user collection for the system. Below is an example:


```[     {         
    "first_name":"Christos",         
    "sur_name":"Zalachoris",         
    "email":"christoszal@gmail.com",         
    "username":"admin",         
    "password":"$2a$12$/DPkjwFkOLI2dFQrJdnmju38mu4pfYa9a1uSd.vd8inbf8blxqMG",         
    "roles":["admin"]     
    } ]
 ```

### Deployment

Run the following command to start the containers:

```docker-compose up```

The API should now be running on [http://localhost:8081](http://localhost:8081).

### Endpoints
---------

Below is a list of the available endpoints in the API:

### Use Cases

Here add some use cases and diagrams.

### Contributing

Contributions are always welcome! Please read the contribution guidelines before submitting a pull request.

### License

This project is licensed under the MIT License - see the LICENSE.md file for details.

[FalconREST.icon]: https://img.shields.io/badge/Falcon_REST-000000?style=for-the-badge&logo=falcon&logoColor=white
[FalconREST-url]: https://falconframework.org/
[MongoDB.icon]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[InfluxDB.icon]: https://img.shields.io/badge/InfluxDB-22ADF6?style=for-the-badge&logo=influxdb&logoColor=white
[InfluxDB-url]: https://www.influxdata.com/
[Docker.icon]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[React.icon]: https://img.shields.io/badge/React-2496ED?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://react.dev/
[Next.icon]: https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white
[Next-url]: https://nextjs.org/