package com.bytecode.core.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bytecode.core.model.Categoria;
import com.bytecode.core.repository.CategoriaRepository;


@Service
public class CategoriaServiceImpl implements CategoriaService {

	@Autowired
	private CategoriaRepository categoriaRepository;
	  
	@Override
	public List<Categoria> obtenerCategorias() {
		  return categoriaRepository.findAll();
	}

	@Override
	public void guardarCategoria(Categoria categoria) {
	    this.categoriaRepository.save(categoria);
	}

	@Override
	public Categoria obtenerCategoriaId(int id) {
     Optional < Categoria > optional = categoriaRepository.findById(id);
	 Categoria categoria = null;
	 if (optional.isPresent()) {
	     categoria = optional.get();
	 } else {
	     throw new RuntimeException(" Categoria no encontrada :: " + id);
	 }
	 return categoria;
	}

	@Override
	public void borrarCategoriaId(int id) {
     this.categoriaRepository.deleteById(id);
	}
	
}

