package com.example.entrevistaPlanisa.dtos.Requisicao;

import java.time.LocalDate;
import java.util.Date;

public record CreateBenchmarkDTO(String titulo, String pais1, String pais2, String tipoComparacao, LocalDate dataInicio, LocalDate dataTermino) {
}
