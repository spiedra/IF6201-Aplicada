USE IF6201_PV1_B97452_B80088
GO 

/*
	Valida el ingreso del administrador al sistema administrativo seg?n el Usuario y contrase?a
	* 1 SI LA CONTRASENA Y EL NOMBRE USUARIO SON CORRECTOS
	* 0 SI EL NOMBRE DE USUARIO ES INCORRECTO
	* -1 NOMBRE USUARIO CORRECTO Y CONTRASENA INCORRECTA
*/

CREATE PROCEDURE ADMIN.sp_VALIDAR_ADMINISTRADOR
	@param_NOMBRE_USUARIO VARCHAR(48),
	@param_CONTRASENA     VARCHAR(48)
AS
BEGIN
	IF NOT EXISTS (SELECT [NOMBRE_USUARIO] FROM [ADMIN].[tb_ADMNISTRADOR] WHERE [NOMBRE_USUARIO] = @param_NOMBRE_USUARIO)
		BEGIN
			SELECT 0 AS RESPUESTA
		END
	ELSE
		BEGIN
			IF EXISTS (SELECT [CONTRASENA] FROM [ADMIN].[tb_ADMNISTRADOR] WHERE [CONTRASENA] = @param_CONTRASENA)
				BEGIN
					SELECT 1 AS RESPUESTA
				END
			ELSE
				BEGIN 
					SELECT -1 AS RESPUESTA
				END
		END
END
