package com.example.entrevistaPlanisa.services;

import com.example.entrevistaPlanisa.models.Resultado;
import com.example.entrevistaPlanisa.repositories.ResultadoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResultadoService {

    private final ResultadoRepository resultadoRepository;

    public ResultadoService(ResultadoRepository resultadoRepository) {
        this.resultadoRepository = resultadoRepository;
    }

    public List<Resultado> listar() {
        return this.resultadoRepository.findAll();
    }

    public Optional<Resultado> listarPorId(Long id) {
        return this.resultadoRepository.findById(id);
    }

    public Resultado salvar(Resultado resultado) {
        return this.resultadoRepository.save(resultado);
    }

}


