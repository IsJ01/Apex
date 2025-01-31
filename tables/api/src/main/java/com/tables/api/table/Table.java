package com.tables.api.table;

// Table Interface
public interface Table {
    
    // Method that sets headers
    public void addRow(String fontName, int size, String... cells) throws Exception;

    // A method that sets a value to a specific cell.
    public void createCeil(String fontName, int size, int x, int y, String value) throws Exception;

}
