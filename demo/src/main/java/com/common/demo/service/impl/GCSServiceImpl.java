package com.common.demo.service.impl;

import com.common.demo.model.Person;
import com.common.demo.service.GCSService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cache.Cache;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class GCSServiceImpl implements GCSService {

    @Value("${source_url}")
    private String url;

    private final RestTemplate restTemplate;
    private final Cache userListCache;

    public GCSServiceImpl(RestTemplateBuilder restTemplateBuilder, Cache userListCache) {
        this.restTemplate = restTemplateBuilder.build();
        this.userListCache = userListCache;
    }

    @Override
    public ResponseEntity<Person> getOne(Integer id){
        List<Person> userList = userListCache.get("userList", List.class);
        List<Person> person = userList.stream().filter(item -> item.getId().equals(id)).collect(Collectors.toList());
        if(person.size()>0){
            return new ResponseEntity<>(person.get(0), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public Page<Person> getAllPersonsByPaged(Pageable pageable, String name, String status) {


        List<Person> userList = userListCache.get("userList", List.class);
        Stream<Person> userStream = userList.stream();

        if (!StringUtils.isEmpty(name)) {
            userStream = userStream.filter(u -> u.getName().toString().toLowerCase(Locale.ROOT)
                    .contains(name.toLowerCase(Locale.ROOT)));
        }

        if (!StringUtils.isEmpty(status)) {
            userStream = userStream.filter(u -> u.getStatus().toString().toLowerCase(Locale.ROOT)
                    .contains(status.toLowerCase(Locale.ROOT)));
        }

        List<Person> filteredUserList = userStream.collect(Collectors.toList());

        /* SORT */
        final boolean isAscending = pageable.getSort().get().collect(Collectors.toList()).get(0).isAscending();
        Sort.Order order = pageable.getSort().get().collect(Collectors.toList()).get(0);
        if (order.getProperty().equals("name")) {
            filteredUserList = filteredUserList.stream().sorted(new Comparator<Person>() {
                @Override
                public int compare(Person o1, Person o2) {
                    return isAscending ? o1.getName().toString().compareTo(o2.getName().toString()) :
                            o1.getName().toString().compareTo(o2.getName().toString()) * (-1);
                }
            }).collect(Collectors.toList());
        }

        if (order.getProperty().equals("id")) {
            filteredUserList = filteredUserList.stream().sorted(new Comparator<Person>() {
                @Override
                public int compare(Person o1, Person o2) {
                    return isAscending ? o1.getId().toString().compareTo(o2.getId().toString()) :
                            o1.getId().toString().compareTo(o2.getId().toString()) * (-1);
                }
            }).collect(Collectors.toList());
        }

        if (order.getProperty().equals("createdOn")) {
            filteredUserList = filteredUserList.stream().sorted(new Comparator<Person>() {
                @Override
                public int compare(Person o1, Person o2) {
                    if(o1.getCreatedOn() == null)
                        return -1;
                    if (o2.getCreatedOn() == null)
                        return 1;

                    return isAscending ? o1.getCreatedOn().toString().compareTo(o2.getCreatedOn().toString()) :
                            o1.getCreatedOn().toString().compareTo(o2.getCreatedOn().toString()) * (-1);
                    }

            }).collect(Collectors.toList());
        }

        int toIndex = pageable.getPageNumber() * pageable.getPageSize() + pageable.getPageSize();
        int fromIndex = pageable.getPageNumber() * pageable.getPageSize();

        List<Person> subList = filteredUserList
                .subList(fromIndex, toIndex <= filteredUserList.size() - 1 ? toIndex : filteredUserList.size());


        return new PageImpl<Person>(subList, pageable, filteredUserList.size());
    }

    @Override
    public ResponseEntity<String> update(Person person) {
        List<Person> userList = userListCache.get("userList", List.class);
        int firstSize = userList.size();
        List<Person> data = userList.stream().filter(item -> !item.getId().equals(person.getId())).collect(Collectors.toList());
        if(firstSize == data.size() + 1){
            data.add(person);
            userListCache.clear();
            userListCache.put("userList", data);
            return new ResponseEntity<>("The data has been update by id", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("The id is invalid!!", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<String>delete(Integer id) {
        List<Person> userList = userListCache.get("userList", List.class);
        int firstSize = userList.size();
        List<Person> data = userList.stream().filter(item -> !item.getId().equals(id)).collect(Collectors.toList());
        userListCache.clear();
        userListCache.put("userList", data);
        if(firstSize == data.size() + 1){
            return new ResponseEntity<>("The data has been deleted", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("The id is invalid!!", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public List<Person> getPostData(){
        ResponseEntity<Object> responseEntity =
                restTemplate.getForEntity(url, Object.class);
        Object body = responseEntity.getBody();
        Object data = ((LinkedHashMap) body).get("output");
        List<Person> people = new ArrayList<>();
        ((ArrayList) data).stream().forEach(item ->{
            people.add(new Person(((LinkedHashMap)item).get("id") ,((LinkedHashMap) item).get("status"),((LinkedHashMap)item).get("createdOn"), ((LinkedHashMap)item).get("name") ,((LinkedHashMap)item).get("description") ,((LinkedHashMap)item).get("delta")));
        });
        return people;
    }
}
