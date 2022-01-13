package com.common.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.criteria.CriteriaBuilder;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Person {

    private Object id;
    private Object status;
    private Object createdOn;
    private Object name;
    private Object description;
    private Object delta;
}
