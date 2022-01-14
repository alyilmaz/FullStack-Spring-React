package com.common.demo.service;

import com.common.demo.model.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GCSService {

    ResponseEntity<Person> getOne(Integer id);

    ResponseEntity<String> delete(Integer id);

    Page<Person> getAllPersonsByPaged(Pageable pageable, String criteriaForFirstName, String criteriaForLastName);

    ResponseEntity<String> update(Person person);

    List<Person> getPostData();
}
