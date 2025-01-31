package com.tables.api.http.rest;

import org.springframework.web.bind.annotation.RestController;

import com.tables.api.dto.TableDto;
import com.tables.api.table.ExcelTable;
import com.tables.api.table.PDFTable;
import com.tables.api.table.Table;

import lombok.extern.slf4j.Slf4j;

import java.io.ByteArrayOutputStream;
import java.util.Base64;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@CrossOrigin(originPatterns = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RequestMapping("/api/v1/tables")
@Slf4j
public class TableController {

    @PostMapping("/excel")
    public ResponseEntity<?> getExelTable(@Validated @RequestBody TableDto tableDto) throws Exception {
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet();
        Table table = new ExcelTable(sheet, workbook);
        table.addRow("Times New Roman", 15, tableDto.getHeaders_());
        for (String[] row: tableDto.getRows()) {
            table.addRow("Times New Roman", 15, row);
        }
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        workbook.write(stream);
        workbook.close();
        stream.close();
        byte[] bytes = stream.toByteArray();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment");
        return new ResponseEntity<>(Base64.getEncoder().encodeToString(bytes), headers, HttpStatus.OK);
    }

    @PostMapping("/pdf")
    public ResponseEntity<?> getPdfTable(@Validated @RequestBody TableDto tableDto) throws Exception {
        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);
        PDFTable table = new PDFTable(page, document, 0, 0);
        table.addRow("TIMES_BOLD", 15, tableDto.getHeaders_());
        for (String[] row: tableDto.getRows()) {
            table.addRow("TIMES_ROMAN", 15, row);
        }
        table.write();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        document.save(stream);
        stream.close();
        byte[] bytes = stream.toByteArray();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment");
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        return new ResponseEntity<>(Base64.getEncoder().encodeToString(bytes), headers, HttpStatus.OK);
    }

}
