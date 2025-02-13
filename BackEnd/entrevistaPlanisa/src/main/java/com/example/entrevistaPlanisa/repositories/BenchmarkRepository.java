package com.example.entrevistaPlanisa.repositories;

import com.example.entrevistaPlanisa.models.Benchmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface BenchmarkRepository extends JpaRepository<Benchmark, Long> {

    Optional<List<Benchmark>> findByPais1(String pais1);
    Optional<List<Benchmark>> findByPais2(String pais2);
    Optional<List<Benchmark>> findByTitulo(String titulo);
    Optional<List<Benchmark>> findByTipoCompracao(String tipoComparacao);

    @Query("SELECT b FROM Benchmark b WHERE b.dataInicio >= :startDate AND b.dataTermino <= :endDate")
    Optional<List<Benchmark>> findByEntreDataInicioEDataTermino(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

}
