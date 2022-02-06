<p align="center">
  <a href="#">
    <img src="../assets/images/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Dev.to Clone</h2>

  <p align="center">
    A Django backend for dev to clone
  </p>  
</p>

### Steps to start the server

#### Prerequisites

Make sure you have Python and django installed on your machine.

> **_NOTE:_**
>
>_The project was made with python version 3.9._ and requires pipenv

### Install pipenv globally
```bash
pip install pipenv
```

1. Create a virtual environment using pipenv where all the required python packages will be installed

```bash
# Use this on Windows
py -m pipenv shell
# Use this on Linux and Mac
python -m pipenv shell
```
2. Install pipenv

```bash
# Windows
pip install pipenv
# Linux and Mac
pip install pipenv
```

3. Install all the project Requirements
```bash
pipenv install 
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

