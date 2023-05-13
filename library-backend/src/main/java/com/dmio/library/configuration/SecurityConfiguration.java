package com.dmio.library.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

import com.okta.spring.boot.oauth.Okta;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable Cross Site Request Forgery
        http.headers(headers -> headers.frameOptions().disable()).csrf(csrf -> csrf.disable());
        // Protect endpoints at /api/books/secure
        http.authorizeRequests(requests -> requests
                .antMatchers("/h2/**").permitAll()  // New Line: allows us to access the h2 console without the
                                                    // need to authenticate. ' ** ' instead of ' * ' because
                                                    // multiple path levels will follow /h2.
                .antMatchers("/api/books/secure/**")
                .authenticated())
                .oauth2ResourceServer(server -> server.jwt());
        // Add CORS filters
        http.cors(Customizer.withDefaults());
        // http.cors();

        // Add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());
        // Force a non-empty response body for 401's to make the response friendly
        Okta.configureResourceServer401ResponseBody(http);
        return http.build();
    }

}
