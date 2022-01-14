package com.common.demo.service;

import com.common.demo.helper.GCSDataHelper;
import com.common.demo.model.Person;
import com.common.demo.model.StatusEnum;
import com.common.demo.service.impl.GCSServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.web.client.RestTemplateBuilder;

import org.springframework.cache.Cache;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;


public class GCSServiceTest {

    GCSDataHelper gcsDataHelper = new GCSDataHelper();
    RestTemplateBuilder restTemplateMock;
    Cache cacheMock;
    GCSService gcsService;

    @BeforeEach
    void setUpCommon() {
        restTemplateMock = mock(RestTemplateBuilder.class);
        cacheMock = mock(Cache.class);
        gcsService = new GCSServiceImpl(restTemplateMock, cacheMock);
    }

    @Test
    void getOneTest(){
        List<Person> people = gcsDataHelper.getData();
        when(cacheMock.get("userList", List.class)).thenReturn(people);
        ResponseEntity<Person> response = gcsService.getOne(1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(people.get(0).getId(), response.getBody().getId());
        assertEquals(people.get(0).getName(), response.getBody().getName());
        assertEquals(people.get(0).getCreatedOn(), response.getBody().getCreatedOn());
        assertEquals(people.get(0).getDelta(), response.getBody().getDelta());
        assertEquals(people.get(0).getDescription(), response.getBody().getDescription());
        assertEquals(people.get(0).getStatus(), StatusEnum.CANCELED);
    }

    @Test
    void getOneButNotFoundTest(){
        List<Person> people = gcsDataHelper.getData();
        when(cacheMock.get("userList", List.class)).thenReturn(people);
        ResponseEntity<Person> response = gcsService.getOne(10);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void getAllDataTest(){
        Pageable pageable = gcsDataHelper.getPageable(0,2,"asc","name");
        List<Person> people = gcsDataHelper.getData();
        when(cacheMock.get("userList", List.class)).thenReturn(people);
        Page<Person> data = gcsService.getAllPersonsByPaged(pageable, "ali", StatusEnum.CANCELED.toString());
        assertEquals("Alice", data.get().findFirst().get().getName());
        assertEquals(1, data.getTotalElements());
        assertEquals(1, data.getTotalPages());
    }

    @Test
    void getAllDataButNameIsNotMatchedTest(){
        Pageable pageable = gcsDataHelper.getPageable(0,2,"asc","name");
        List<Person> people = gcsDataHelper.getData();
        when(cacheMock.get("userList", List.class)).thenReturn(people);
        Page<Person> data = gcsService.getAllPersonsByPaged(pageable, "Morg", StatusEnum.CANCELED.toString());
        assertEquals(0, data.getTotalElements());
        assertEquals(0, data.getTotalPages());
    }

    @Test
    void getAllDataFilteringByOnlyStatusTest(){
        Pageable pageable = gcsDataHelper.getPageable(0,2,"asc","name");
        List<Person> people = gcsDataHelper.getData();
        when(cacheMock.get("userList", List.class)).thenReturn(people);
        Page<Person> data = gcsService.getAllPersonsByPaged(pageable, "", StatusEnum.ERROR.toString());
        assertEquals("Bob", data.get().findFirst().get().getName());
        assertEquals(2, data.getTotalElements());
        assertEquals(1, data.getTotalPages());
    }

    @Test
    void getAllDataFilteringByOnlyStatusAndSortingDirectionDescTest(){
        Pageable pageable = gcsDataHelper.getPageable(0,2,"desc","name");
        List<Person> people = gcsDataHelper.getData();
        when(cacheMock.get("userList", List.class)).thenReturn(people);
        Page<Person> data = gcsService.getAllPersonsByPaged(pageable, "", StatusEnum.ERROR.toString());
        assertEquals("Mic", data.get().findFirst().get().getName());
        assertEquals(2, data.getTotalElements());
        assertEquals(1, data.getTotalPages());
    }

    @Test
    void getAllDataSortingIDButDirectionDescTest(){
        Pageable pageable = gcsDataHelper.getPageable(0,2,"desc","id");
        List<Person> people = gcsDataHelper.getData();
        when(cacheMock.get("userList", List.class)).thenReturn(people);
        Page<Person> data = gcsService.getAllPersonsByPaged(pageable, "", "");
        assertEquals("Alex", data.get().findFirst().get().getName());
        assertEquals(5, data.getTotalElements());
        assertEquals(3, data.getTotalPages());
    }

    @Test
    void updateTest(){
        List<Person> people = gcsDataHelper.getData();
        Person updatedPerson = new Person(2, StatusEnum.COMPLETED,3000L,"Bob", "updated description", 44);
        when(cacheMock.get("userList", List.class)).thenReturn(people);
        ResponseEntity<String> response = gcsService.update(updatedPerson);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("The data has been update by id", response.getBody());
    }

    @Test
    void updateDataButTheIdDoesNotExistTest(){
        List<Person> people = gcsDataHelper.getData();
        Person updatedPerson = new Person(22, StatusEnum.COMPLETED,3000L,"Bob", "updated description", 44);
        when(cacheMock.get("userList", List.class)).thenReturn(people);
        ResponseEntity<String> response = gcsService.update(updatedPerson);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("The id is invalid!!", response.getBody());
    }

    @Test
    void deleteTest(){
        List<Person> people = gcsDataHelper.getData();
        when(cacheMock.get("userList", List.class)).thenReturn(people);
        ResponseEntity<String> response = gcsService.delete(1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("The data has been deleted", response.getBody());
    }

    @Test
    void deleteButIdDoesNotExistTest(){
        List<Person> people = gcsDataHelper.getData();
        when(cacheMock.get("userList", List.class)).thenReturn(people);
        ResponseEntity<String> response = gcsService.delete(45);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("The id is invalid!!", response.getBody());
    }

}
