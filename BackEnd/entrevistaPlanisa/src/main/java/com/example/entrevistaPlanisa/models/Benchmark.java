package com.example.entrevistaPlanisa.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "benchmark")
public class Benchmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "pais1", nullable = false)
    private String pais1;

    @Column(name = "quantidade_pessoas_pais1", nullable = false)
    private Integer quantidadePessoasPais1;

    @Column(name = "pais2", nullable = false)
    private String pais2;

    @Column(name = "quantidade_pessoas_pais2", nullable = false)
    private Integer quantidadePessoasPais2;

    @Column(name = "tipo_comparacao", nullable = false)
    private String tipoComparacao;

    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "data_termino", nullable = false)
    private LocalDate dataTermino;

    @OneToMany(mappedBy = "benchmark", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Resultado> resultados = new ArrayList<>();

    public Benchmark() {
    }

    public Benchmark(String titulo, String pais1, Integer quantidadePessoasPais1, String pais2, Integer quantidadePessoasPais2, String tipoComparacao, LocalDate dataInicio, LocalDate dataTermino) {
        this.titulo = titulo;
        this.pais1 = pais1;
        this.quantidadePessoasPais1 = quantidadePessoasPais1;
        this.pais2 = pais2;
        this.quantidadePessoasPais2 = quantidadePessoasPais2;
        this.tipoComparacao = tipoComparacao;
        this.dataInicio = dataInicio;
        this.dataTermino = dataTermino;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getPais1() {
        return pais1;
    }

    public void setPais1(String pais1) {
        this.pais1 = pais1;
    }

    public Integer getQuantidadePessoasPais1() {
        return quantidadePessoasPais1;
    }

    public void setQuantidadePessoasPais1(Integer quantidadePessoasPais1) {
        this.quantidadePessoasPais1 = quantidadePessoasPais1;
    }

    public String getPais2() {
        return pais2;
    }

    public void setPais2(String pais2) {
        this.pais2 = pais2;
    }

    public Integer getQuantidadePessoasPais2() {
        return quantidadePessoasPais2;
    }

    public void setQuantidadePessoasPais2(Integer quantidadePessoasPais2) {
        this.quantidadePessoasPais2 = quantidadePessoasPais2;
    }

    public String getTipoComparacao() {
        return tipoComparacao;
    }

    public void setTipoComparacao(String tipoComparacao) {
        this.tipoComparacao = tipoComparacao;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataTermino() {
        return dataTermino;
    }

    public void setDataTermino(LocalDate dataTermino) {
        this.dataTermino = dataTermino;
    }


    public List<Resultado> getResultados() {
        return resultados;
    }

    public void setResultados(List<Resultado> resultados) {
        this.resultados = resultados;
    }

    public void adicionarResultado(Resultado resultado) {
        resultados.add(resultado);
        resultado.setBenchmark(this);
    }

    public void removerResultado(Resultado resultado) {
        resultados.remove(resultado);
        resultado.setBenchmark(null);
    }

}
