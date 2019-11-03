package pl.igorkol.services;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class ReportService {

    public ByteArrayInputStream getTestReport() {

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            addMetaData(document);

            Paragraph paragraph = new Paragraph("This is test document");
            paragraph.setAlignment(Element.ALIGN_CENTER);
            document.add(paragraph);

        } catch (DocumentException exc) {
            System.out.println(exc.getMessage());
        } finally {
            document.close();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    private static void addMetaData(Document document) {
        document.addTitle("Test document");
        document.addSubject("Using iText");
        document.addKeywords("Java, PDF, iText");
        document.addAuthor("MyTimePro");
        document.addCreator("System");
    }

}
