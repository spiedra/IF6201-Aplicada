package com.bytecode.core.model;

import  javax.persistence.Column ;
import  javax.persistence.Entity ;
import javax.persistence.Id;

@Entity
public class ProductoCompleto {

	@Id
	@Column(name = "id")
	private int id;
	 
    @Column(name = "nombre")
	private String nombre;
    
    @Column(name = "precio")
	private int precio;
    
    @Column(name = "ruta_imagen")
   	private String ruta_imagen;
    
    @Column(name = "stock")
   	private int stock;
    
    @Column(name = "categoria")
   	private String categoria;

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

	public int getPrecio() {
		return precio;
	}

	public void setPrecio(int precio) {
		this.precio = precio;
	}

	public String getRuta_imagen() {
		return ruta_imagen;
	}

	public void setRuta_imagen(String ruta_imagen) {
		this.ruta_imagen = ruta_imagen;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

}