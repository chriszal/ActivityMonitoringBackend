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

2.  Create a `.env` file with the example you can see under the `.env.example`:



3.  Create a `data.json` file in the `init-mongodb/data` directory with the initial data for the MongoDB user collection for the system. Below is an example:


```
[
    {
        "first_name":"First",
        "last_name":"User",
        "email":"admin@gmail.com",
        "password":"$2a$12$/DPkjwFkOLI2dFQrJdnmju38mu4pfYa9a1uSd.vd8inbf8blxq.MG",
        "roles":["admin"]
    },
    {
        "first_name":"Second",
        "last_name":"User2",
        "email":"member@gmail.com",
        "password":"$2a$12$/DPkjwFkOLI2dFQrJdnmju38mu4pfYa9a1uSd.vd8inbf8blxq.MG",
        "roles":["member"]
    }
]
 ```

 4. 

### Deployment

Run the following command to start the containers:

```
docker-compose up
```

The API should now be running on [http://localhost:8081](http://localhost:8081).

### Endpoints

Below is a list of the available endpoints in the API:
1. Login:

    `POST /api/v1/login`
    ```
    {
        "email": "example@gmail.com",
        "password": "password123"
    }
    ```
2. Register Participant

    `GET /api/v1/participant/register/{reg_code}`
3. List Users

    `GET /api/v1/users`
4. Get User By Email

    `GET /api/v1/users/{email}`
5. Update User By Email

    `PUT /api/v1/users/{email}`
    ```
    {
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "roles": ["member"]
    }
    ```
6. Get User Id By Email

    `GET /api/v1/user/id/{email}`
7. Get User Email By Id

    `GET /api/v1/user/{id}`
8. Create User

    `POST /api/v1/users/`
    ```
    {
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "password":"1234",
        "roles": ["member"]
    }
    ```
9. Delete User By Email

    `DELETE /api/v1/users/{email}`
10. List Studies

    `GET /api/v1/studies`
11. Create Study

    `POST /api/v1/studies`
    ```
    {
        "study_id":"HUA",
        "title":"Health Study",
        "authors":["John Doe"],
        "description":"A study about the effects of exercise on mood",
        "no_participants":5,
        "owners":["duig3ige3296"],
        "study_coordinators":[],
        "study_assistants":[]
    }
    ```
12. Get Study By Study Id

    `GET /api/v1/study/{study_id}`
13. Update Study By Study Id

    `PUT /api/v1/study/{study_id}`
    ```
    {
        "study_id":"HUA",
        "title":"Health Study",
        "authors":["John Doe"],
        "description":"A study about the effects of exercise on mood",
        "no_participants":5,
        "owners":["duig3ige3296"],
        "study_coordinators":[],
        "study_assistants":[]
    }
    ```
14. Get Studies By User Id 

    `GET /api/v1/studies/user/{user_id}`
15. List Participants

    `GET /api/v1/participants`
16. Get Participant By Participant Id

    `GET /api/v1/participant/{participant_id}`
17. Get Participants By Study Id

    `GET /api/v1/participants/study/{study_id}`
18. Delete Participant By Participant Id

    `DELETE /api/v1/participant/{participant_id}`
19. Update Participant By Participant Id

    `PUT /api/v1/participant/{participant_id}`
    ```
    {
        "date_of_birth":"2001-04-19",
        "gender":"Female",
        "weight":10,
        "height":300
    }
    ```
20. Get Meals By Participant Id

    `GET /api/v1/meals/participant/{participant_id}`
21. Create Meal 

    `POST /api/v1/meal`
    ```
        --form image='@test.png' 
        --form id='HUA_1' 
        --form type='dinner' 
        --form portion='small'
    ```
22. Delete Meals By Participant Id

    `DELETE /api/v1/meals/participant/{participant_id}`
23. Create Registration Token

    `/api/v1/user/register`
    ```
    {
        "email":"example@gmail.com",
        "role":"member"
        
    }
    ```
24. Get Validity Of Token

    `/api/v1/is-token-valid/{token}`
25. Register User By Token

    `/api/v1/user/register/{token}`
    ```
    {
        "first_name": "John",
        "last_name": "Doe",
        "password":"1234",
    }
    ```



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