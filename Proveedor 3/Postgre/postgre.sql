-- Database: IF6201_Proveedor3_Proyecto

-- DROP DATABASE "IF6201_Proveedor3_Proyecto";


CREATE TABLE tb_CATEGORIA 
(	
	ID_CATEGORIA INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
	NOMBRE_CATEGORIA VARCHAR(24) NOT NULL
)
CREATE TABLE tb_PRODUCTO 
(	
	ID_PRODUCTO INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
	NOMBRE VARCHAR(68) NOT NULL,
	PRECIO FLOAT NOT NULL,
	RUTA_IMAGEN VARCHAR(68) NOT NULL,
	STOCK INT NOT NULL,
	ID_CATEGORIA INT NOT NULL,
	FOREIGN KEY(ID_CATEGORIA) REFERENCES PROVEEDOR3.tb_CATEGORIA(ID_CATEGORIA)
	
)
CREATE TABLE tb_ADMINISTRADOR 
(	
	ID_ADMIN INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
	NOMBRE VARCHAR(300) NOT NULL,
	APELLIDOS VARCHAR(300) NOT NULL,
	NOMBRE_USUARIO VARCHAR(48) NOT NULL,
	CONTRASENNIA VARCHAR(48) NOT NULL
)
