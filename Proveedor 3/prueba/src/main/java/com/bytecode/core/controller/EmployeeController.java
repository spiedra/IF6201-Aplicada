package com.bytecode.core.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.bytecode.core.service.FileService;
import com.bytecode.core.model.Administrador;
import com.bytecode.core.model.Categoria;
import com.bytecode.core.model.Employee;
import com.bytecode.core.service.CategoriaService;
import com.bytecode.core.service.EmployeeService;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@Controller
public class EmployeeController {
		
	private final static String url = "jdbc:postgresql://163.178.107.7/IF6201_Proveedor3_Proyecto";
	private final static String user = "laboratorios";
	private final static String password = "saucr.120";

    private static final String QUERY = "Select nombre_usuario from tb_administrador where tb_administrador.nombre_usuario=? and tb_administrador.contrasennia=?;";
	    
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private CategoriaService categoriaService;
    @Autowired
    FileService fileService;
    
    // display list of employees
    @GetMapping("/")
    public String viewHomePage(Model model) {
    	Administrador administrador = new Administrador();
        model.addAttribute("administrador", administrador);
      
        return "index";
    }
    
    @PostMapping("/inicioS")
    public String inicioS(@ModelAttribute("administrador") Administrador administrador, Model model) {
        String nombreU="";
    	 // Step 1: Establishing a Connection
        try (Connection connection = DriverManager.getConnection(url, user, password);
            // Step 2:Create a statement using connection object
            PreparedStatement preparedStatement = connection.prepareStatement(QUERY);) {
            preparedStatement.setString(1, administrador.getNombre_usuario());
            preparedStatement.setString(2, administrador.getContrasennia());
            System.out.println(preparedStatement);
            // Step 3: Execute the query or update query
            ResultSet rs = preparedStatement.executeQuery();

            // Step 4: Process the ResultSet object.
            while (rs.next()) {
                nombreU = rs.getString("nombre_usuario");
            }
        } catch (SQLException e) {
        	  System.out.println("error");
        }
    	///
        if(!nombreU.equalsIgnoreCase("")) {
        	model.addAttribute("listEmployees", employeeService.getAllEmployees());
            return "productosView";
        }
        
    	Administrador administradorD = new Administrador();
        model.addAttribute("administrador", administradorD);
      
        return "index";
        
    }
    
    @GetMapping("/productosView")
    public String viewProductos(Model model) {
        model.addAttribute("listEmployees", employeeService.getAllEmployees());
      
        return "productosView";
    }

    @GetMapping("/showNewEmployeeForm")
    public String showNewEmployeeForm(Model model) {
        // create model attribute to bind form data
        Employee employee = new Employee();
        model.addAttribute("employee", employee);
        model.addAttribute("listaCategorias", categoriaService.obtenerCategorias());
        return "new_employee";
    }

    @GetMapping("/showNewC")
    public String showNewC(Model model) {
        // create model attribute to bind form data
        Categoria categoria = new Categoria();
        model.addAttribute("categoria", categoria);
        
        return "addC";
    }
    
    @PostMapping("/saveEmployee")
    public String saveEmployee(@ModelAttribute("employee") Employee employee, Model model) {
        // save employee to database
        employeeService.saveEmployee(employee);
        
        model.addAttribute("listEmployees", employeeService.getAllEmployees());
        return "productosView";
    }
    
    @PostMapping("/guardarC")
    public String guardarC(@ModelAttribute("categoria") Categoria categoria, Model model) {
        // save employee to database
        categoriaService.guardarCategoria(categoria);
        
        model.addAttribute("listEmployees", employeeService.getAllEmployees());
        return "productosView";
    }
    
    /*
    @PostMapping("/uploadFile")
    public String uploadFile(@RequestParam("file") MultipartFile files,  RedirectAttributes redirectAttributes) {

        fileService.uploadFile(file);

        redirectAttributes.addFlashAttribute("message",
            "You successfully uploaded " + file.getOriginalFilename() + "!");

        return "redirect:/";
    }
    */
    
    @GetMapping("/showFormForUpdate/{id}")
    public String showFormForUpdate(@PathVariable(value = "id") int id, Model model) {

        // get employee from the service
        Employee employee = employeeService.getEmployeeById(id);

        // set employee as a model attribute to pre-populate the form
        model.addAttribute("employee", employee);
        return "update_employee";
    }

    @GetMapping("/deleteEmployee/{id}")
    public String deleteEmployee(@PathVariable(value = "id") int id, Model model) {

        // call delete employee method 
        this.employeeService.deleteEmployeeById(id);
        
        model.addAttribute("listEmployees", employeeService.getAllEmployees());
        return "productosView";
    }
    
}
