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

import com.bytecode.core.model.Administrador;
import com.bytecode.core.model.Categoria;
import com.bytecode.core.model.Producto;
import com.bytecode.core.model.ProductoCompleto;
import com.bytecode.core.service.CategoriaService;
import com.bytecode.core.service.ProductoService;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ProductoController {
		
	private final static String url = "jdbc:postgresql://163.178.107.7/IF6201_Proveedor3_Proyecto";
	private final static String user = "laboratorios";
	private final static String password = "saucr.120";

    private static final String QUERY = "Select nombre_usuario from tb_administrador where tb_administrador.nombre_usuario=? and tb_administrador.contrasennia=?;";
	    
    @Autowired
    private ProductoService productoService;
    @Autowired
    private CategoriaService categoriaService;
    
    // 
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
                
             model.addAttribute("listProductos", obtenerPCompletos());
            
            return "productosView";
        }
        
    	Administrador administradorD = new Administrador();
        model.addAttribute("administrador", administradorD);
      
        return "index";
        
    }
    
    @GetMapping("/productosView")
    public String viewProductos(Model model) {
      
        
        model.addAttribute("listProductos", obtenerPCompletos());
        return "productosView";
    }

    @GetMapping("/showNewProductoForm")
    public String showNewEmployeeForm(Model model) {
        // create model attribute to bind form data
        Producto producto = new Producto();
        model.addAttribute("producto", producto);
        model.addAttribute("listaCategorias", categoriaService.obtenerCategorias());
        return "new_product";
    }

    @GetMapping("/showNewC")
    public String showNewC(Model model) {
        // create model attribute to bind form data
        Categoria categoria = new Categoria();
        model.addAttribute("categoria", categoria);
        
        return "new_category";
    }
    
    @PostMapping("/saveProduct")
    public String saveEmployee(@ModelAttribute("producto") Producto producto, Model model) {
        // save employee to database
        productoService.saveProducto(producto);
        
        model.addAttribute("listProductos", obtenerPCompletos());
        
        return "productosView";
    }
    
    @PostMapping("/guardarC")
    public String guardarC(@ModelAttribute("categoria") Categoria categoria, Model model) {
        // save employee to database
        categoriaService.guardarCategoria(categoria);
        
        model.addAttribute("listProductos", obtenerPCompletos());
        return "productosView";
    }
    
    @GetMapping("/showFormForUpdate/{id}")
    public String showFormForUpdate(@PathVariable(value = "id") int id, Model model) {

        // get employee from the service
    	Producto producto = productoService.getProductoById(id);

        // set employee as a model attribute to pre-populate the form
        model.addAttribute("producto", producto);
        model.addAttribute("listaCategorias", categoriaService.obtenerCategorias());
        return "update_product";
    }

    @GetMapping("/deleteEmployee/{id}")
    public String deleteEmployee(@PathVariable(value = "id") int id, Model model) {

        // call delete employee method 
        this.productoService.deleteProductoById(id);
        model.addAttribute("listProductos", obtenerPCompletos());
        return "productosView";
    }
    
    public List<ProductoCompleto> obtenerPCompletos(){
    	  List<Producto> listaP= productoService.obtenerProductos();
          List<ProductoCompleto> listaProductos= new ArrayList<ProductoCompleto>();
          List<Categoria> listaC= categoriaService.obtenerCategorias();
      
          for(int i=0; i < listaP.size(); i++) {
          
          	ProductoCompleto pC= new ProductoCompleto();
          	pC.setId(listaP.get(i).getId());
          	pC.setNombre(listaP.get(i).getNombre());
          	pC.setPrecio(listaP.get(i).getPrecio());
          	pC.setStock(listaP.get(i).getStock());
          	// buscar categorias
          	for(int j=0; j< listaC.size(); j++) {
          		if(listaC.get(j).getId()==listaP.get(i).getId_categoria()) {
          			pC.setCategoria(listaC.get(j).getNombre_categoria());
          		}// if
          	}// for
          	
          	pC.setRuta_imagen(listaP.get(i).getRuta_imagen());
          	listaProductos.add(pC);
          }// for
          
          return listaProductos;
    }// obtenerPCompletos
    
}
