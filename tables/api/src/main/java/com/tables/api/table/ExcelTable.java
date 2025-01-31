package com.tables.api.table;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

// class Exel tables
public class ExcelTable implements Table  {

    private XSSFSheet sheet;
    private XSSFWorkbook workbook;

    public ExcelTable(XSSFSheet sheet, XSSFWorkbook workbook) {
        this.sheet = sheet;
        this.workbook = workbook;
    }

    @Override
    public void addRow(String fontName, int size, String... cells) throws Exception {
        // create new Row
        Row row = sheet.createRow(sheet.getLastRowNum() + 1);
        for (int i = 0; i < cells.length; i++) {
            this.createCeil(fontName, size, i, row.getRowNum(), cells[i]);
        }
    }

    @Override
    public void createCeil(String fontName, int size, int x, int y, String value) throws Exception {
        // get row
        Row row = sheet.getRow(y);
        // create cell
        Cell cell = row.createCell(x);
        // create styles
        XSSFCellStyle cellStyle = workbook.createCellStyle();
        // create font
        XSSFFont font = workbook.createFont();
        // set font fields
        font.setFontName(fontName);
        font.setFontHeight(size);
        // apply font
        cellStyle.setFont(font);
        // apply styles
        cell.setCellStyle(cellStyle);
        // set value
        cell.setCellValue(value);
    }


}
