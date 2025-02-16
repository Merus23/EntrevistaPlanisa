# Entrevista Planisa

## Tabela de conteúdo
1. Disclaimer
2. Definição do projeto
3. Execução do projeto (como executá-lo)
4. Fluxo do usuário (com explicações das decisões)

## Disclaimer
* Normalmente faço meus projetos em inglês, tanto código quando versionamento. No entanto, para facilitar a compreensão, irei escrever tudo em português.
* Também para facilitar a visualição, escreverei todo o código em um único repositório.
* Normalmente, crio novas branches para cada funcionalidade ou cada página. Neste caso, por uma questão de agilidade, commitei tudo na `main`.

## Definição do projeto
* Backend: Spring Boot (Java 17);
  - Flyaway: para realizar migrations;
* Frontend: React (com typescript);
   -  Tailwindcss: para fazer estilizações mais rápido e padronizadas;
   -  Axios: para realizar requisições;
* Banco de Dados:  MySQL;

## Execução do projeto (como executá-lo)
Dentro da pasta de frontend (`EntrevistaPlanisa/FrontEnd/entrevistaPlanisa`)
```base
npm install
npm run dev
```

Dentro da psta de backend (`EntrevistaPlanisa/BackEnd/entrevistaPlanisa`)
```bash
mvn spring-boot:run
```
   
## Fluxo do usuário (com explicações das decisões)

### Home
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


### Histórico
Nesta tela o usuário consegue verificar os benchmarks já realizados. Diferentemente da outra tela, esta contém diversas funcionalidade.

1. Ao entrar na tela, o usuário visualiza uma tabela com todas as informações previamente cadastradas.

Visualização Desktop
![image](https://github.com/user-attachments/assets/218c8fee-9fa4-46d5-9ee0-1d009ccbe8ad)
Visualização mobile
![image](https://github.com/user-attachments/assets/2b32f110-583e-4e4d-a7be-546a7a99821c)

2. Ao clicar em qualquer uma das linhas da tabela que tenha conteúdo, um modal para edição ou remoção do item é aberto.

Visualização Desktop
![image](https://github.com/user-attachments/assets/29072fdd-a48e-4195-8e8e-5d3281ac0f7d)
Visualização mobile
![image](https://github.com/user-attachments/assets/593a4b8f-b9f3-4aa5-9251-8af2b51a45ab)

3. O usuário pode deletar o benchmark ou atualizá-lo. Considerando que os dados que vem da api são confiável, eu preferi não deixar o usuário atualizar as outras informações. Caso ele queira algo do tipo, ele pode adicionar um novo benchmark.

4. Nesta tabela também foi implementado páginação. Como estou enviando todos os benchmarks para o frontend, a página é feita no próprio frontend. Isso pode ser modificado posteriormente implementando página no backend

Exemplo de páginação (feita no próprio frontend) na visualização do Desktop
![image](https://github.com/user-attachments/assets/ec54332d-927c-452b-bc05-31b6cfba0aa9)


5. O usuário pode pesquisar por um tempo em específico (título, nome de país, tipo de comparação). Mais uma vez, a implementação disso foi feita no frontend porque estou recebendo todos os dados. Caso houvesse uma páginação no backend e a tabela só apresentasse uma parte dos itens, seria necessário implementar uma rota no backend para realizar a pesquisa.

Exemplo de pesquisa com o termo "deaths" que retorna todas as entidades que possuem esse termo na visualização do Desktop.
![image](https://github.com/user-attachments/assets/57887ca0-4126-4c28-86e2-32e0c742f1dc)

