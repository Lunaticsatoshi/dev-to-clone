<p align="center">
  <a href="#">
    <img src="./assets/images/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Dev.to Clone</h2>

  <p align="center">
    A clone of dev.to web application made to recreate the basic functionalities of a micro blogging platform
  </p>  
</p>

## Features

* [ ] Register as a User
* [ ] Create Communities
* [ ] Create Articles
* [ ] Clap for Articles
* [ ] Comment on Articles
* [ ] Infinite Feed
* [ ] Create Tags
* [ ] Create Listings
* [ ] Manage Content

### 🏗️ Built With

<div>

[<img src="https://img.shields.io/badge/-Next-FFFFFF?style=for-the-badge&labelColor=black&logo=nextdotjs&logoColor=white">](https://nextjs.org/)

[<img src="https://img.shields.io/badge/-SCSS-cc6699?style=for-the-badge&labelColor=black&logo=sass&logoColor=cc6699">](https://sass-lang.com/)

[<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&labelColor=black&logo=tailwind-css&logoColor=white" >](https://tailwindcss.com/)

[<img src="https://img.shields.io/badge/-Python-306998?style=for-the-badge&labelColor=black&logo=python&logoColor=4b8bbe" >](https://www.python.org/)

[<img src="https://img.shields.io/badge/-Django-092e20?style=for-the-badge&labelColor=black&logo=Django&logoColor=092e20" >](https://www.djangoproject.com/)

[<img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&labelColor=black&logo=sqlite&logoColor=white" >](https://www.sqlite.org/index.html)

[<img src="https://img.shields.io/badge/-Typescript-007acc?style=for-the-badge&labelColor=black&logo=typescript&logoColor=007acc">](https://www.typescriptlang.org/)

</div>

## 🧩 Getting Started

To get a local copy up and running follow these simple steps.

### Clone the repo
1. Clone the repository using the following command

```bash
git clone https://github.com/Lunaticsatoshi/dev-to-clone.git
# After cloning, move into the directory having the project files using the change directory command
cd dev-to-clone
```

### Starting the development server with docker 🐳

#### Prerequisites

Make sure you have Docker and docker-compose installed on your machine.

#### Steps to start the server

1. Add environment file .env in server directory with the variables fiven in the .env.example file.
2. Run the following command in the project directory itself.

      ```sh
      docker-compose -f docker/docker-compose.debug.yml up --build
      ```

3. Open <http://localhost:8000> to view it in the browser.

### Starting the development server without docker 📡

#### Prerequisites

Make sure you have Python and django installed on your machine.

> **_NOTE:_**
>
>_The project was made with python version 3.9._

1. Create a virtual environment where all the required python packages will be installed

```bash
# Use this on Windows
python -m venv env
# Use this on Linux and Mac
python -m venv env
```
2. Activate the virtual environment

```bash
# Windows
.\env\Scripts\activate
# Linux and Mac
source env/bin/activate
```

3. Install all the project Requirements
```bash
pip install -r requirements.txt
```
-Apply migrations and create your superuser (follow the prompts)

```bash
# apply migrations and create your database
python manage.py migrate

# Create a user with manage.py
python manage.py createsuperuser
```


4. Run the development server

```bash
# run django development server
python manage.py runserver
```

#### Steps to start the client

1. Add environment files in frontend directory.
      `package/client/.env` file

      ```env
      NODE_ENV = "development"
      NEXT_APP_PRODUCTION_API_ENDPOINT = "production_url"
      NEXT_APP_DEVELOPMENT_API_ENDPOINT = "http://localhost:8000"
      ```

2. To install all the dependencies run the following command in root directory.

      ```sh
      yarn install
      ```

3. Run the following command in the root directory.

      ```sh
      yarn dev
      ```

5. Open <http://localhost:3000> to view it in the browser.

## 🔐 License

This project is licensed under the GPL License - see the [LICENSE.md](LICENSE.md) file for details

## Suggestions and Bug Reports
Since this is an open source project all suggestions, requests and bug reports are always welcomed. If you have any don't forget to leave them in the issues section. But we recommend creating an issue or replying in a comment to let us know what you are working on first that way we don't overwrite each other.