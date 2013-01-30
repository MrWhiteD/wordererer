package se.wallenius.config;

import org.springframework.context.annotation.*;

@Configuration
@ComponentScan(basePackages = { "se.wallenius.domain" })
//@Import({ PersistenceConfig.class, SecurityConfig.class })
public class RootConfig {}