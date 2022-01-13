package com.common.demo.service.impl;

import com.common.demo.model.Person;
import com.common.demo.service.GCSService;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cache.Cache;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Service
public class GCSServiceImpl implements GCSService {

    private String url = "https://storage.googleapis.com/king-airnd-recruitment-sandbox-data/data.json";
    private final RestTemplate restTemplate;
    private final Cache userListCache;

    public GCSServiceImpl(RestTemplateBuilder restTemplateBuilder, Cache userListCache) {
        this.restTemplate = restTemplateBuilder.build();
        this.userListCache = userListCache;
    }

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

    public Page<Person> getAllPersonsByPaged(Pageable pageable, String criteriaForFirstName, String criteriaForLastName) {


        /**
        List<SourceUser> userList = userListCache.get("userList", List.class);
        Stream<SourceUser> userStream = userList.stream();

        if (!StringUtils.isEmpty(criteriaForFirstName)) {
            userStream = userStream.filter(u -> u.getFirstName().toLowerCase(Locale.ROOT)
                    .contains(criteriaForFirstName.toLowerCase(Locale.ROOT)));
        }

        if (!StringUtils.isEmpty(criteriaForLastName)) {
            userStream = userStream.filter(u -> u.getLastName().toLowerCase(Locale.ROOT)
                    .contains(criteriaForLastName.toLowerCase(Locale.ROOT)));
        }

        List<SourceUser> filteredUserList = userStream.collect(Collectors.toList());

        /* SORT *
        final boolean isAscending = pageable.getSort().get().collect(Collectors.toList()).get(0).isAscending();
        Sort.Order order = pageable.getSort().get().collect(Collectors.toList()).get(0);
        if (order.getProperty().equals("firstName")) {
            filteredUserList = filteredUserList.stream().sorted(new Comparator<SourceUser>() {
                @Override
                public int compare(SourceUser o1, SourceUser o2) {
                    return isAscending ? o1.getFirstName().compareTo(o2.getFirstName()) :
                            o1.getFirstName().compareTo(o2.getFirstName()) * (-1);
                }
            }).collect(Collectors.toList());
        }

        if (order.getProperty().equals("lastName")) {
            filteredUserList = filteredUserList.stream().sorted(new Comparator<SourceUser>() {
                @Override
                public int compare(SourceUser o1, SourceUser o2) {
                    return isAscending ? o1.getLastName().compareTo(o2.getLastName()) :
                            o1.getLastName().compareTo(o2.getLastName()) * (-1);
                }
            }).collect(Collectors.toList());
        }

        if (order.getProperty().equals("userName")) {
            filteredUserList = filteredUserList.stream().sorted(new Comparator<SourceUser>() {
                @Override
                public int compare(SourceUser o1, SourceUser o2) {
                    return isAscending ? o1.getUserName().compareTo(o2.getUserName()) :
                            o1.getUserName().compareTo(o2.getUserName()) * (-1);
                }
            }).collect(Collectors.toList());
        }

        int toIndex = pageable.getPageNumber() * pageable.getPageSize() + pageable.getPageSize();
        int fromIndex = pageable.getPageNumber() * pageable.getPageSize();

        List<SourceUser> subList = filteredUserList
                .subList(fromIndex, toIndex <= filteredUserList.size() - 1 ? toIndex : filteredUserList.size());


        return new PageImpl<SourceUser>(subList, pageable, filteredUserList.size());*/
        return null;
    }
}
