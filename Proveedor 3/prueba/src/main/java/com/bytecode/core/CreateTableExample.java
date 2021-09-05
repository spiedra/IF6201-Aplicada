package com.bytecode.core;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CreateTableExample {
	
	    private final String url = "jdbc:postgresql://163.178.107.7/IF6201_Proveedor3_Proyecto";
	    private final String user = "laboratorios";
	    private final String password = "saucr.120";

	    private static final String INSERT_USERS_SQL = "INSERT INTO users" +
	        "  (id, name, email, country, password) VALUES " +
	        " (?, ?, ?, ?, ?);";

	    public static void main(String[] argv) throws SQLException {
	    	CreateTableExample createTableExample = new CreateTableExample();
	        createTableExample.insertRecord();
	    }

	    public void insertRecord() throws SQLException {
	        System.out.println(INSERT_USERS_SQL);
	        // Step 1: Establishing a Connection
	        try (Connection connection = DriverManager.getConnection(url, user, password);

	            // Step 2:Create a statement using connection object
	            PreparedStatement preparedStatement = connection.prepareStatement(INSERT_USERS_SQL)) {
	            preparedStatement.setInt(1, 1);
	            preparedStatement.setString(2, "Tony");
	            preparedStatement.setString(3, "tony@gmail.com");
	            preparedStatement.setString(4, "US");
	            preparedStatement.setString(5, "secret");

	            System.out.println(preparedStatement);
	            // Step 3: Execute the query or update query
	            preparedStatement.executeUpdate();
	        } catch (SQLException e) {

	            // print SQL exception information
	            printSQLException(e);
	        }

	        // Step 4: try-with-resource statement will auto close the connection.
	    }

	    public static void printSQLException(SQLException ex) {
	        for (Throwable e: ex) {
	            if (e instanceof SQLException) {
	                e.printStackTrace(System.err);
	                System.err.println("SQLState: " + ((SQLException) e).getSQLState());
	                System.err.println("Error Code: " + ((SQLException) e).getErrorCode());
	                System.err.println("Message: " + e.getMessage());
	                Throwable t = ex.getCause();
	                while (t != null) {
	                    System.out.println("Cause: " + t);
	                    t = t.getCause();
	                }
	            }
	        }
	    }
	    
}
