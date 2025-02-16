# Entrevista Planisa

## Disclaimer
* Normalmente faço meus projetos em inglês, tanto código quando versionamento. No entanto, para facilitar a compreensão, irei escrever tudo em português.
* Também para facilitar a visualição, escreverei todo o código em um único repositório.

## Definição do projeto
* Backend: Spring Boot (Java 17);
  - Flyaway: para realizar migrations;
* Frontend: React (com typescript);
   -  Tailwindcss: para fazer estilizações mais rápido e padronizadas;
   -  Axios: para realizar requisições;
* Banco de Dados:  MySQL;
   
## Fluxo do usuário

### Tela para cadastrar um novo benchmark (home)
Nesta tela o usuário pode comparar dois países. 
1. Ao preencher todos os campos, o usuário faz uma requisição que chama a api do [api-ninjas](https://api-ninjas.com/api/covid19).
2. A api api-ninjas retorna a quantidade de mortos/casos para aquele país. Informar a data via Query Params não retornava uma data específica. Para contornar isso e coletar os dados entre as duas datas tive que escrever o código a seguir:
```typescript
    if (type === "cases") {
      totalMortesOuCasos =
        response.data[0].cases[dataTermino].total -
        response.data[0].cases[dataInicio].total;
    }

    if (type === "deaths") {
      totalMortesOuCasos =
        response.data[0].deaths[dataTermino].total -
        response.data[0].deaths[dataInicio].total;
    }
```


Visualização Desktop
![image](https://github.com/user-attachments/assets/847ec981-a740-49c9-8e61-bb68d717da8f)
Visualição mobile
![image](https://github.com/user-attachments/assets/a28b118d-2337-423b-930b-d7b041192c23)

3. Quando a requisição é completada, um modal é aberto e mostra a comparação para o usuário:

Visualização Desktop
![image](https://github.com/user-attachments/assets/fa540000-c1db-477d-9070-d6f491cc1c9c)
Visualização mobile
![image](https://github.com/user-attachments/assets/7f781c9e-4b6d-45ee-837d-b2046728144d)

5. Quando a requisição para do frontend é completada, os dados são salvos na base de dados. Assim o usuário consegue ver os dados e eu consigo salvá-los (praticamente) ao mesmo tempo.


### 
