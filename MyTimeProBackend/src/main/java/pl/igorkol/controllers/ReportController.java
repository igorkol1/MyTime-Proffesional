package pl.igorkol.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.igorkol.services.ReportService;

import java.io.ByteArrayInputStream;
import java.security.Principal;
import java.time.LocalDate;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/report")
public class ReportController {

    private ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/user/{month}/{year}")
    public ResponseEntity<InputStreamResource> getUserMonthlyReport(Principal principal,
                                                                    @PathVariable int month,
                                                                    @PathVariable int year){
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = LocalDate.of(year,month,startDate.lengthOfMonth());
        ByteArrayInputStream userReport = reportService.getUserMonthlyReport(principal.getName(),startDate,endDate);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=testReport.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(userReport));
    }

    @GetMapping("/manager/{month}/{year}")
    public ResponseEntity<InputStreamResource> getManagerMonthlyReport(Principal principal,
                                                                       @PathVariable int month,
                                                                       @PathVariable int year){
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = LocalDate.of(year,month,startDate.lengthOfMonth());
        ByteArrayInputStream userReport = reportService.getManagerMonthlyReport(principal.getName(),startDate,endDate);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=testReport.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(userReport));
    }

}
