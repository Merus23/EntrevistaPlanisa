package com.example.entrevistaPlanisa.repositories;

import com.example.entrevistaPlanisa.models.Resultado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultadoRepository extends JpaRepository<Resultado, Long> {
}