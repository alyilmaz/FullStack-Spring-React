package com.common.demo.controller.doc;

import com.common.demo.dto.PageableList;
import com.common.demo.model.Person;
import com.common.demo.model.StatusEnum;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;


@Tag(name = "King API Service", description = "this API provides to CRUD operation on cache data")
public interface GCSControllerDoc {

    @Operation(description = "get one data by id")
    ResponseEntity<Person> getOne(Integer id);

    @Operation(description = "get all data by pagination")
    ResponseEntity<PageableList<Person>> getAllPeople(@RequestParam(defaultValue = "0") String pageNo,
                                                                @RequestParam(defaultValue = "5") String pageSize,
                                                                @RequestParam(defaultValue = "name")
                                                                        String sortBy,
                                                                @RequestParam(defaultValue = "asc")
                                                                        String sortDirection,
                                                                @RequestParam(defaultValue = "")
                                                                        String name,
                                                                @RequestParam(defaultValue = "")
                                                                 StatusEnum status);

    @Operation(description = "update the data by id")
    ResponseEntity<String> update(Person person);

    @Operation(description = "delete data by id")
    ResponseEntity<String> delete(Integer id);
}
