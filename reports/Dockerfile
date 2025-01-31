FROM python
LABEL authors="IsJ01"

WORKDIR /code

COPY . /code/

EXPOSE 8002

RUN pip install -r requirements.txt
RUN python manage.py makemigrations api
RUN python manage.py migrate
CMD waitress-serve --port=8002 api.wsgi:application
