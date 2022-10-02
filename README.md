# Qual o Plano API

## Descrição
Essa api foi desenvolvida para suportar o monitoramento de um projeto maior ("Qual o Plano?"). Projeto no qual tem a intenção de alimentar uma base com todas as atividades realizadas dentro da plataforma, registrando esses eventos na tabela de eventos e futuramente gerar estatiscas a partir dessa massa de dados.

## Tecnologias

- Nodejs
- Express
- Dynamodb
- lambda

### Rodando o projeto

```
mkdir -p ./docker/dynamodb
sudo chmod 777 ./docker/dynamodb
docker-compose up
```

### Create User

- Endpoint criado para criação de usuario interno

```
curl --request POST \
  --url http://localhost:8080/users \
  --header 'content-type: application/json' \
  --header 'master_key: 123456' \
  --data '{
	"username": "meuusername",
	"password": "123456",
	"name": "Meu Nome"
}'
```

### Login

- Endpoint criado se logar e conseguir acessar os endpoints restritos

```
curl --request POST \
  --url 'http://localhost:8080/login?=' \
  --header 'content-type: application/json' \
  --data '{
	"username": "meuusername",
	"password": "123456"
}'
```

### Get Users

- Endpoint criado para uso interno de visualização dos usuarios

```
curl --request GET \
  --url http://localhost:8080/users \
  --header 'x-access-token: {{TOKEN_RETORNADO_NO_LOGIN}}'
```