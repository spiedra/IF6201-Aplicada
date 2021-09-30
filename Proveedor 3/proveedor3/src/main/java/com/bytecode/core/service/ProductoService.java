package com.bytecode.core.service;

import java.util.List;

import com.bytecode.core.model.Producto;

public interface ProductoService {
    List <Producto> obtenerProductos();
    void saveProducto(Producto producto);
    Producto getProductoById(int id);
    void deleteProductoById(int id);
}