package com.example.entrevistaPlanisa.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

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

    @Column(name = "pais2", nullable = false)
    private String pais2;

    @Column(name = "tipo_comparacao", nullable = false)
    private String tipoComparacao;

    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "data_termino", nullable = false)
    private LocalDate dataTermino;

    public Benchmark() {
    }

    public Benchmark(String titulo, String pais1, String pais2, String tipoComparacao, LocalDate dataInicio, LocalDate dataTermino) {
        this.titulo = titulo;
        this.pais1 = pais1;
        this.pais2 = pais2;
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

    public String getPais2() {
        return pais2;
    }

    public void setPais2(String pais2) {
        this.pais2 = pais2;
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
}
