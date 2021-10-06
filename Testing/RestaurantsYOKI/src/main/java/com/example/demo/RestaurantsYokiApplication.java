package com.example.demo;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.demo.entity.ItemBO;
import com.example.demo.entity.RestaurantBO;

import com.example.demo.restaurantRepo.RestaurantRepo;

@SpringBootApplication
public class RestaurantsYokiApplication {

	
	public static void main (String[] args) {
		SpringApplication.run(RestaurantsYokiApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner runner()
	{
		return new CommandLineRunner()
				{
					@Autowired
					RestaurantRepo restaurantRepo; 
					
					
					
					
					

					@Override
					public void run(String... args) throws Exception {
						// TODO Auto-generated method stub
						
						//RestaurantBO restaurant1=new RestaurantBO("Coal Barbeque","YOKI Location","Chiinese","Italian",null,null,1,0,null);
						
					//	ItemBO item1=new ItemBO("Chicken",50.00,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
					//	restaurantRepo.save(restaurant1);
						
				//	System.out.println(restaurantRepo.findAll());	
						
						
						
						
					}
					
				};
}

}
