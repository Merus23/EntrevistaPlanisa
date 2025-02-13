package com.example.entrevistaPlanisa.controllers;

import com.example.entrevistaPlanisa.dtos.Requisicao.CreateBenchmarkDTO;
import com.example.entrevistaPlanisa.models.Benchmark;
import com.example.entrevistaPlanisa.services.BenchmarkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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




}
