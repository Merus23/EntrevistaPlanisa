package com.example.entrevistaPlanisa.controllers;

import com.example.entrevistaPlanisa.dtos.Requisicao.CreateBenchmarkDTO;
import com.example.entrevistaPlanisa.models.Benchmark;
import com.example.entrevistaPlanisa.services.BenchmarkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/benchmarks")
@CrossOrigin(origins = "http://localhost:5173")
public class BenchmarkController {

    private final BenchmarkService benchmarkService;

    public BenchmarkController(BenchmarkService benchmarkService) {
        this.benchmarkService = benchmarkService;
    }

    @PostMapping("/")
    public ResponseEntity<Benchmark> criaBenchmark(@RequestBody CreateBenchmarkDTO benchmark) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.benchmarkService.criar(benchmark));
    }

    @GetMapping("/")
    public ResponseEntity<List<Benchmark>> listar() {
        return ResponseEntity.ok(this.benchmarkService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Benchmark> listarPorId(@PathVariable Long id) {
        Optional<Benchmark> benchmark = this.benchmarkService.listarPorId(id);

        if (benchmark.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Benchmark não encontrado");
        }

        return ResponseEntity.ok(benchmark.get());
    }

}
