package com.common.demo.config;

import org.springframework.cache.Cache;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.caffeine.CaffeineCache;


@Configuration
public class DataConfig {

    @Bean
    Cache userListCache() {
        return new CaffeineCache("userList", Caffeine.newBuilder()
                .build());
    }
}
