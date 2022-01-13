package com.common.demo.controller;

import com.common.demo.dto.PageableList;
import com.common.demo.model.Person;
import com.common.demo.service.GCSService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Pageable;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/gcs")
public class GCSController {

    private final GCSService gcsService;

    @GetMapping(value = "/getPeople")
    public ResponseEntity<PageableList<Person>> getAllLDAPUsers(@RequestParam(defaultValue = "0") String pageNo,
                                                                    @RequestParam(defaultValue = "5") String pageSize,
                                                                    @RequestParam(defaultValue = "firstName")
                                                                            String sortBy,
                                                                    @RequestParam(defaultValue = "asc")
                                                                            String sortDirection,
                                                                    @RequestParam(defaultValue = "")
                                                                            String criteriaForFirstName,
                                                                    @RequestParam(defaultValue = "")
                                                                            String criteriaForLastName){
        Pageable pageable = PageRequest.of(Integer.parseInt(pageNo), Integer.parseInt(pageSize),
                "asc".equalsIgnoreCase(sortDirection) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Page<Person> list =
                gcsService.getAllPersonsByPaged(pageable, criteriaForFirstName, criteriaForLastName);


        return new ResponseEntity<>(new PageableList<>(list), HttpStatus.OK);
    }

    @GetMapping
    void getData(){
        //gcsService.getPostData();
    }
}
