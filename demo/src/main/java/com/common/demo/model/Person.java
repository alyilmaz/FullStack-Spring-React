package com.common.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
