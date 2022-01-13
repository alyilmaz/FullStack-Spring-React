package com.common.demo.dto;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class PageableList<T> {
    private int totalPages;

    private Long totalElements;

    private List<T> data;

    public PageableList(Page<T> page) {
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
        this.data = page.getContent();
    }
}
