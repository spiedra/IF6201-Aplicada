package com.bytecode.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bytecode.core.model.Administrador;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Integer>{

}
