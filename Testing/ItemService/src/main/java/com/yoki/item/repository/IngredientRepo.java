package com.yoki.item.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.yoki.item.entity.IngredientBO;

public interface IngredientRepo extends JpaRepository<IngredientBO, Long> {
	
	@Query("SELECT n FROM IngredientBO n WHERE lower(n.ingredientName) LIKE %?#{[0].toLowerCase()}%")
	List<IngredientBO> findByIngredientNameContains(String searchText);

	IngredientBO findByIngredientName(String ingredientName);

}
