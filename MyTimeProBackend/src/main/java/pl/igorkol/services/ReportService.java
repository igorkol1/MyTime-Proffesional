package pl.igorkol.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;
import pl.igorkol.entities.Activity;
import pl.igorkol.entities.User;
import pl.igorkol.repositories.ActivityRepository;
import pl.igorkol.repositories.UserRepository;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    private ActivityRepository activityRepository;
    private UserRepository userRepository;

    public ReportService(ActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    @Deprecated
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

    public ByteArrayInputStream getUserMonthlyReport(String userEmail, LocalDate startDate, LocalDate endDate) {

        Optional<User> optionalUser = userRepository.findByEmail(userEmail);

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            List<Activity> activityList = activityRepository.findAllByUserIdAndStartBetween(user.getId(), startDate, endDate);

            try {
                PdfWriter.getInstance(document, out);
                document.open();

                addMetaData(document);

                Paragraph userIdentity = new Paragraph("Report for user: " + user.getEmail());
                document.add(userIdentity);
                document.add(Chunk.NEWLINE);

                Paragraph reportStartTime = new Paragraph("Start from: " + startDate);
                document.add(reportStartTime);
                document.add(Chunk.NEWLINE);

                Paragraph reportFinishTime = new Paragraph("Finish at: " + endDate);
                document.add(reportFinishTime);
                document.add(Chunk.NEWLINE);

                PdfPTable table = new PdfPTable(5);
                table.setPaddingTop(5);

                Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

                PdfPCell hcell;
                hcell = new PdfPCell(new Phrase("Id", headFont));
                hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(hcell);

                hcell = new PdfPCell(new Phrase("Project Name", headFont));
                hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(hcell);

                hcell = new PdfPCell(new Phrase("Date", headFont));
                hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(hcell);

                hcell = new PdfPCell(new Phrase("Hours", headFont));
                hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(hcell);

                hcell = new PdfPCell(new Phrase("Description", headFont));
                hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(hcell);

                for (Activity activity : activityList) {

                    PdfPCell cell;

                    cell = new PdfPCell(new Phrase(activity.getId().toString()));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(cell);

                    cell = new PdfPCell(new Phrase(activity.getProject().getName()));
                    cell.setPaddingLeft(5);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                    table.addCell(cell);

                    cell = new PdfPCell(new Phrase(String.valueOf(activity.getStart())));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cell.setPaddingRight(5);
                    table.addCell(cell);

                    cell = new PdfPCell(new Phrase(String.valueOf(activity.getDuration())));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cell.setPaddingRight(5);
                    table.addCell(cell);

                    cell = new PdfPCell(new Phrase(String.valueOf(activity.getDescription())));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cell.setPaddingRight(5);
                    table.addCell(cell);
                }

                document.add(table);

                document.add(Chunk.NEWLINE);

                Paragraph summary = new Paragraph("All hours: " + countAllHours(activityList));
                document.add(summary);

                document.add(Chunk.NEWLINE);

                Paragraph reportDateTime = new Paragraph(LocalDateTime.now().toString());
                document.add(reportDateTime);

            } catch (DocumentException exc) {
                System.out.println(exc.getMessage());
            } finally {
                document.close();
            }

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

    private int countAllHours(List<Activity> activities) {
        return activities.stream().mapToInt(Activity::getDuration).sum();
    }

}
