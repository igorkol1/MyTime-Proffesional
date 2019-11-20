package pl.igorkol.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;
import pl.igorkol.entities.Activity;
import pl.igorkol.entities.Project;
import pl.igorkol.entities.User;
import pl.igorkol.repositories.ActivityRepository;
import pl.igorkol.repositories.ProjectRepository;
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
    private ProjectRepository projectRepository;

    public ReportService(ActivityRepository activityRepository,
                         UserRepository userRepository,
                         ProjectRepository projectRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
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

                    String description = activity.getDescription();

                    if (description == null) {
                        description = "-";
                    }

                    cell = new PdfPCell(new Phrase(description));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
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

    public ByteArrayInputStream getManagerMonthlyReport(String userEmail, LocalDate startDate, LocalDate endDate) {

        Optional<User> optionalUser = userRepository.findByEmail(userEmail);

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            List<Project> projects = projectRepository.findAllByIsActiveIsTrue();

            int hoursSum = 0;

            try {
                PdfWriter.getInstance(document, out);
                document.open();

                addMetaData(document);

                Paragraph userIdentity = new Paragraph("Report for manager: " + user.getEmail());
                document.add(userIdentity);
                document.add(Chunk.NEWLINE);

                Paragraph reportStartTime = new Paragraph("Start from: " + startDate);
                document.add(reportStartTime);
                document.add(Chunk.NEWLINE);

                Paragraph reportFinishTime = new Paragraph("Finish at: " + endDate);
                document.add(reportFinishTime);
                document.add(Chunk.NEWLINE);

                PdfPTable table = new PdfPTable(3);
                table.setPaddingTop(5);

                Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

                PdfPCell hcell;
                hcell = new PdfPCell(new Phrase("Id", headFont));
                hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(hcell);

                hcell = new PdfPCell(new Phrase("Project Name", headFont));
                hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(hcell);

                hcell = new PdfPCell(new Phrase("Hours", headFont));
                hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(hcell);

                for (Project project : projects) {

                    PdfPCell cell;

                    cell = new PdfPCell(new Phrase(project.getId().toString()));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(cell);

                    cell = new PdfPCell(new Phrase(project.getName()));
                    cell.setPaddingLeft(5);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                    table.addCell(cell);

                    int hours = countAllHours(project, startDate, endDate);

                    cell = new PdfPCell(new Phrase(String.valueOf(hours)));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cell.setPaddingRight(5);
                    table.addCell(cell);

                    hoursSum += hours;

                }

                document.add(table);

                document.add(Chunk.NEWLINE);

                Paragraph summary = new Paragraph("All hours: " + hoursSum);
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

    private int countAllHours(Project project, LocalDate startDate, LocalDate endDate) {
        List<Activity> activityList = activityRepository.findAllByProjectIdAndStartBetween(
                project.getId(),
                startDate,
                endDate);
        return countAllHours(activityList);
    }

}
