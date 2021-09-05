package com.bytecode.core.model;

import  javax.persistence.Column ;
import  javax.persistence.Entity ;
import  javax.persistence.GeneratedValue ;
import  javax.persistence.GenerationType ;
import  javax.persistence.Id ;
import  javax.persistence.Table ;

@Entity
@Table(name = "tb_administrador")
public class Administrador {

	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private int id;
	 
	 @Column(name = "nombre")
	 private String nombre;
	 
	 @Column(name = "apellidos")
	 private String apellidos;
	 
	 @Column(name = "nombre_usuario")
	 private String nombre_usuario;
	 
	 @Column(name = "contrasennia")
	 private String contrasennia;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getNombre_usuario() {
		return nombre_usuario;
	}

	public void setNombre_usuario(String nombre_usuario) {
		this.nombre_usuario = nombre_usuario;
	}

	public String getContrasennia() {
		return contrasennia;
	}

	public void setContrasennia(String contrasennia) {
		this.contrasennia = contrasennia;
	}
	 
}
