package com.common.demo.helper;


import com.common.demo.model.Person;
import com.common.demo.model.StatusEnum;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

public class GCSDataHelper {

    public List<Person> getData(){
        List<Person> people = new ArrayList<>();
        people.add(new Person(1, StatusEnum.CANCELED,1000L,"Alice", "blaaa", 1));
        people.add(new Person(2, StatusEnum.ERROR,2000L,"Bob", "blaaa", 22));
        people.add(new Person(3, StatusEnum.COMPLETED,3000L,"Charlie", "blaaa", 53));
        people.add(new Person(4, StatusEnum.ERROR,2000L,"Mic", "blaaa", 42));
        people.add(new Person(5, StatusEnum.COMPLETED,3000L,"Alex", "blaaa", 18));
        return people;
    }

    public Pageable getPageable(Integer pageNo, Integer pageSize, String sortDirection, String sortBy) {
        Pageable pageable = PageRequest.of(pageNo, pageSize,
                "asc".equalsIgnoreCase(sortDirection) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        return pageable;
    }
}
