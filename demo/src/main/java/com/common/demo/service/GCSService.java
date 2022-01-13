package com.common.demo.service;

import com.common.demo.model.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GCSService {

    List<Person> getPostData();

    Page<Person> getAllPersonsByPaged(Pageable pageable, String criteriaForFirstName, String criteriaForLastName);
}
