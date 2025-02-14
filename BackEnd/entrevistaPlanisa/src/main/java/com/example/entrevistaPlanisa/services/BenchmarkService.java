package com.example.entrevistaPlanisa.services;

import com.example.entrevistaPlanisa.dtos.Requisicao.CreateBenchmarkDTO;
import com.example.entrevistaPlanisa.models.Benchmark;
import com.example.entrevistaPlanisa.repositories.BenchmarkRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BenchmarkService {

    private final BenchmarkRepository benchmarkRepository;

    public BenchmarkService(BenchmarkRepository benchmarkRepository) {
        this.benchmarkRepository = benchmarkRepository;
    }

    public List<Benchmark> listar() {
        return this.benchmarkRepository.findAll();
    }

    public Optional<Benchmark> listarPorId(Long id) {
        return this.benchmarkRepository.findById(id);
    }

    public Optional<List<Benchmark>> listarPorPais1(String pais1) {
        return this.benchmarkRepository.findByPais1(pais1);
    }

    public Optional<List<Benchmark>> listarPorPais2(String pais2) {
        return this.benchmarkRepository.findByPais2(pais2);
    }

    public Optional<List<Benchmark>> listarPorTitulo(String titulo) {
        return this.benchmarkRepository.findByTitulo(titulo);
    }

    public Optional<List<Benchmark>> listarPorTipoComparacao(String tipoComparacao) {
        return this.benchmarkRepository.findByTipoComparacao(tipoComparacao);
    }

    public void deletar(Long id) {
        Benchmark benchmark = this.benchmarkRepository.findById(id).orElseThrow();
        if (benchmark == null) throw new RuntimeException("Benchmark não encontrado");
        System.out.println(benchmark);
        this.benchmarkRepository.delete(benchmark);
    }

    public Benchmark atualizar(Benchmark benchmark) throws Exception {
        if (benchmark.getId() == null) throw new IllegalArgumentException("O Id do benchmark não pode ser nulo");

        Benchmark entity = this.benchmarkRepository.findById(benchmark.getId()).orElseThrow(()-> new RuntimeException("Benchmark não encontrado"));
        entity.setTitulo(benchmark.getTitulo());

        benchmarkRepository.save(entity);
        return entity;
    }


    public Benchmark criar(CreateBenchmarkDTO benchmark) {
        Benchmark entity = new Benchmark();

        entity.setTitulo(benchmark.titulo());
        entity.setPais1(benchmark.pais1());
        entity.setQuantidadePessoasPais1(benchmark.quantidadePessoasPais1());
        entity.setPais2(benchmark.pais2());
        entity.setQuantidadePessoasPais2(benchmark.quantidadePessoasPais2());
        entity.setTipoComparacao(benchmark.tipoComparacao());
        entity.setDataInicio(benchmark.dataInicio());
        entity.setDataTermino(benchmark.dataTermino());

        return this.benchmarkRepository.save(entity);
    }
}
