package com.example.entrevistaPlanisa.services;

import com.example.entrevistaPlanisa.dtos.CreateBenchmarkDTO;
import com.example.entrevistaPlanisa.models.Benchmark;
import com.example.entrevistaPlanisa.repositories.BenchmarkRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class BenchmarkService {

    private final BenchmarkRepository benchmarkRepository;

    public BenchmarkService(BenchmarkRepository benchmarkRepository) {
        this.benchmarkRepository = benchmarkRepository;
    }

    public Benchmark criar(CreateBenchmarkDTO benchmark) {
        Benchmark entity = new Benchmark();

        entity.setTitulo(benchmark.titulo());
        entity.setPais1(benchmark.pais1());
        entity.setPais2(benchmark.pais2());
        entity.setTipoComparacao(benchmark.tipoComparacao());
        entity.setDataInicio(benchmark.dataInicio());
        entity.setDataTermino(benchmark.dataTermino());

        return this.benchmarkRepository.save(entity);
    }
}
