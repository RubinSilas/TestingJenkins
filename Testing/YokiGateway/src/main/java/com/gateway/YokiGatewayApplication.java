package com.gateway;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

import com.google.common.net.HttpHeaders;

@SpringBootApplication
public class YokiGatewayApplication implements WebFluxConfigurer {

	 private static ApplicationContext applicationContext;
	 
	public static void main(String[] args) {
		applicationContext = SpringApplication.run(YokiGatewayApplication.class, args);
//		String[] allBeanNames = applicationContext.getBeanDefinitionNames();
//        for(String beanName : allBeanNames) {
//            System.out.println(beanName);
//        }
	}
	
//	@Override
//	public void addCorsMappings(CorsRegistry registry) {
//
//		registry.addMapping("/**").allowedHeaders("*").allowedMethods("*").allowedOrigins("*").exposedHeaders(HttpHeaders.SET_COOKIE);
//	}
	
//	@Bean
//	public CorsWebFilter corsWebFilter() {
//		System.out.println("khghj");
//		CorsConfiguration corsConfiguration = new CorsConfiguration();
//        corsConfiguration.addAllowedHeader("*");
//        corsConfiguration.addAllowedOrigin("*");
//        corsConfiguration.addAllowedMethod("*");
////        corsConfiguration.setAllowedMethods(Arrays.asList("GET","PUT","POST"));
////        corsConfiguration.applyPermitDefaultValues();
//        corsConfiguration.addExposedHeader(HttpHeaders.SET_COOKIE);
//        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
//        corsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
//        System.out.println(corsConfiguration.getAllowedMethods());
//        return new CorsWebFilter(corsConfigurationSource);
//	}
	
	@Bean
	public RouteLocator configureRoutes(RouteLocatorBuilder builder)
	{
		return builder.routes()
				.route(p -> p.path("/items/**")     
						.uri("lb://ITEM-SERVICE"))
				.route(p -> p.path("/file/**")
						.uri("lb://FILEUPLOAD-SERVICE"))
				.route(p -> p.path("/restaurant/**")
						.uri("lb://RESTAURANT-SERVICE"))
				.build();
	}

}
