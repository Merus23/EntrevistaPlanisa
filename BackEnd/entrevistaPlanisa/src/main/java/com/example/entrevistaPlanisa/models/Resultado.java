package com.example.entrevistaPlanisa.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "resultado")
public class Resultado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "benchmark_id", nullable = false)
    private Benchmark benchmark;

    @Column(name = "diferenca", nullable = false)
    private Double diferenca;

    @Column(name = "criado_em", nullable = false)
    private LocalDate criadoEm;
    public Resultado() {
    }

    public Resultado(Benchmark benchmark, Double diferenca) {
        this.benchmark = benchmark;
        this.diferenca = diferenca;
        this.criadoEm = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Benchmark getBenchmark() {
        return benchmark;
    }

    public void setBenchmark(Benchmark benchmark) {
        this.benchmark = benchmark;
    }

    public Double getDiferenca() {
        return diferenca;
    }

    public void setDiferenca(Double diferenca) {
        this.diferenca = diferenca;
    }

    public LocalDate getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDate criadoEm) {
        this.criadoEm = criadoEm;
    }
}

