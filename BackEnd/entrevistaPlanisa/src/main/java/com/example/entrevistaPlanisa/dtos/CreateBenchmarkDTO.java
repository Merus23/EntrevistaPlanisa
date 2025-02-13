package com.example.entrevistaPlanisa.dtos;

import java.util.Date;
import java.util.Optional;

public record CreateBenchmarkDTO(String titulo, String pais1, String pais2, String tipoComparacao, Date dataInicio, Date dataTermino) {
}
