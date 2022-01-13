package com.common.demo.component;

import com.common.demo.model.Person;
import com.common.demo.service.GCSService;
import org.springframework.cache.Cache;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.naming.NamingException;
import java.util.List;

@Component
@EnableScheduling
public class ScheduledGCSCacheBuilderComponent {

    private final Cache userListCache;
    private final GCSService gcsService;

    public ScheduledGCSCacheBuilderComponent(Cache userListCache, GCSService gcsServiceImpl) {
        this.userListCache = userListCache;
        this.gcsService = gcsServiceImpl;
    }

    @Scheduled(fixedDelay = 3600000, initialDelay = 0)
    public void buildCacheScheduled() throws NamingException {
        buildCache();
    }

    private void buildCache() throws NamingException {
        List<Person> people = gcsService.getPostData();
        userListCache.clear();
        userListCache.put("userList", people);

    }

    @PostConstruct
    public void initCache() throws NamingException {
        buildCache();
    }
}
