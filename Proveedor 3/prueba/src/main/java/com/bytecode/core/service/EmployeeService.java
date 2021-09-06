package com.bytecode.core.service;

import java.util.List;

import com.bytecode.core.model.Employee;

public interface EmployeeService {
    List < Employee > getAllEmployees();
    void saveEmployee(Employee employee);
    Employee getEmployeeById(int id);
    void deleteEmployeeById(int id);
}