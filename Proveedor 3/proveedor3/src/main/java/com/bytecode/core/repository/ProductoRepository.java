package com.bytecode.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bytecode.core.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer>{

}