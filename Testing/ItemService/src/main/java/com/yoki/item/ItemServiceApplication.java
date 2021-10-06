package com.yoki.item;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.yoki.item.entity.IngredientBO;
import com.yoki.item.entity.ItemBO;
import com.yoki.item.entity.NutritionBO;
import com.yoki.item.entity.RestaurantBO;
import com.yoki.item.repository.IngredientRepo;
import com.yoki.item.repository.ItemRepo;
import com.yoki.item.repository.NutritionRepo;
import com.yoki.item.repository.RestaurantRepo;

@SpringBootApplication
public class ItemServiceApplication implements CommandLineRunner {
	
//	@Autowired
//	RestaurantRepo restaurantRepo;
//	
//	@Autowired
//	ItemRepo itemRepo;
//	
//	@Autowired
//	NutritionRepo nutritionRepo;
//	
//	@Autowired
//	IngredientRepo ingredientRepo;

	public static void main(String[] args) {
		SpringApplication.run(ItemServiceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
//		NutritionBO nutrition1 = new NutritionBO("Protien", null, null, 0);
//		NutritionBO nutrition2 = new NutritionBO("vitamin A",null, null,0);
//		
//		List<NutritionBO> nutritions = new ArrayList<>();
//		nutritions.add(nutrition1);
//		nutritions.add(nutrition2);
//		
//		IngredientBO ingredient1 = new IngredientBO("sausage-regular",null, null,0);
//		IngredientBO ingredient2 = new IngredientBO("bacon-regular",null, null, 0);
//		
//		List<IngredientBO> ingredients = new ArrayList<>();
//		ingredients.add(ingredient1);
//		ingredients.add(ingredient2);
//		
//		ItemBO item1 = new ItemBO("Grill", 15.0, "Starter", "Spicy", 2.0, null, null, 0, null, null, 0, 1, 0, 0, null, null, 0);
//		item1.setNutritions(nutritions);
//		item1.setIngredients(ingredients);
//		
//		ItemBO item2 = new ItemBO("Soup", 15.0, "Starter", "Spicy", 2.0, null, null, 0, null, null, 0, 1, 0, 0, null, null, 0);
//		item2.setNutritions(nutritions);
//		item2.setIngredients(ingredients);
//		
//		List<ItemBO> items = new ArrayList<>();
//		items.add(item1);
//		items.add(item2);
//		
//		RestaurantBO restaurant = new RestaurantBO("LunchBunch","NewYork","Restaurant","Restaurant",null,null,"open",null,null,0);
//		
//		restaurantRepo.save(restaurant);
		
//		System.out.println(this.restaurantRepo.findById(14l).get());
	}

}
