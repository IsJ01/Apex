package com.tables.api.table;

import java.io.IOException;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;

// Class PDF tables
public class PDFTable implements Table {

    // coords
    private int x;
    private int y;
    // table height
    // current page
    private PDPage page;
    // current document
    private PDDocument document;
    private PDPageContentStream pageContentStream;
    private int dx = 0;


    // empty constructor (calls only the fill method)
    public PDFTable(PDPage page, PDDocument document, int x, int y) throws IOException {
        this.page = page;
        this.document = document;
        this.x = x;
        this.y = y;
        this.pageContentStream = new PDPageContentStream(this.document, this.page);
    }

    // Method that sets headers
    @Override
    public void addRow(String fontName, int size, String... cells) throws IOException {
        // Header search
        for (int i = 0; i < cells.length; i++) {
            // call createCeil method
            createCeil(fontName, size, this.x + this.dx, this.y, cells[i]);
            // draw rectangles
        }
        this.dx = 0;
        this.y += (int)(size * 1.3);
    }

    // A method that sets a value to a specific cell.
    @Override
    public void createCeil(String fontName, int size, int x, int y, String value) throws IOException {
        // font init
        PDType1Font font = new PDType1Font(Standard14Fonts.FontName.valueOf(fontName));
        // I decided to calculate the line width exactly like this
        int rectWidth = (int)(size * value.length() * 0.75);
        this.pageContentStream.setFont(font, size);
        // draw reactangle
        this.pageContentStream.addRect(x, 777 - y - (int)(size * 0.3), rectWidth, (int)(size * 1.3));
        // draw text
        this.pageContentStream.beginText();
        this.pageContentStream.newLineAtOffset(x, 777 - y);
        this.pageContentStream.showText(value);
        this.pageContentStream.endText();
        this.pageContentStream.stroke();
        this.dx += rectWidth;
    }

    public void write() throws IOException {
        // close the contentStream
        pageContentStream.close();
    }

}
