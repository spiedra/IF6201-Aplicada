package com.bytecode.core.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bytecode.core.model.Producto;
import com.bytecode.core.repository.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    
	@Override
	public List<Producto> obtenerProductos() {
		 return productoRepository.findAll();
		}

	@Override
	public void saveProducto(Producto producto) {
		this.productoRepository.save(producto);
		
	}

	@Override
	public Producto getProductoById(int id) {
		   Optional < Producto > optional = productoRepository.findById(id);
		   Producto producto= null;
	        if (optional.isPresent()) {
	        	producto = optional.get();
	        } else {
	            throw new RuntimeException(" Producto no encontrado por id :: " + id);
	        }
	        return producto;
	}

	@Override
	public void deleteProductoById(int id) {
		 this.productoRepository.deleteById(id);
		
	}
	
}