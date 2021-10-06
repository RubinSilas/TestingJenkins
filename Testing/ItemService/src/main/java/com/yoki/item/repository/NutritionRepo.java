package com.yoki.item.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yoki.item.entity.NutritionBO;

public interface NutritionRepo extends JpaRepository<NutritionBO, Long> {

	List<NutritionBO> findByIsDeleted(int i);

	NutritionBO findByNutritionType(String nutritionType);

}
