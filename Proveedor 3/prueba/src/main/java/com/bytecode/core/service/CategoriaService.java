package com.bytecode.core.service;

import java.util.List;

import com.bytecode.core.model.Categoria;

public interface CategoriaService {
    List < Categoria > obtenerCategorias();
    void guardarCategoria(Categoria categoria);
    Categoria obtenerCategoriaId(int id);
    void borrarCategoriaId(int id);
}