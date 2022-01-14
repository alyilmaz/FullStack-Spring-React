package com.common.demo.controller;

import com.common.demo.controller.doc.GCSControllerDoc;
import com.common.demo.dto.PageableList;
import com.common.demo.model.Person;
import com.common.demo.model.StatusEnum;
import com.common.demo.service.GCSService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/gcs")
public class GCSController implements GCSControllerDoc {

    private final GCSService gcsService;

    @GetMapping("/{id}")
    public ResponseEntity<Person> getOne(@PathVariable("id") Integer id) {
        return gcsService.getOne(id);
    }

    @GetMapping(value = "/getPeople")
    public ResponseEntity<PageableList<Person>> getAllPeople(@RequestParam(defaultValue = "0") String pageNo,
                                                                    @RequestParam(defaultValue = "5") String pageSize,
                                                                    @RequestParam(defaultValue = "name")
                                                                            String sortBy,
                                                                    @RequestParam(defaultValue = "asc")
                                                                            String sortDirection,
                                                                    @RequestParam(defaultValue = "")
                                                                            String name,
                                                                    @RequestParam(defaultValue = "")
                                                                        StatusEnum status){
        Pageable pageable = PageRequest.of(Integer.parseInt(pageNo), Integer.parseInt(pageSize),
                "asc".equalsIgnoreCase(sortDirection) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Page<Person> list =
                gcsService.getAllPersonsByPaged(pageable, name, status==null?"":status.toString());


        return new ResponseEntity<>(new PageableList<>(list), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<String> update(@RequestBody  Person person) {
        return gcsService.update(person);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String>  delete(@PathVariable("id") Integer id){
        return gcsService.delete(id);
    }
}
