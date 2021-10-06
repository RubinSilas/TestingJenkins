package com.yoki.item.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.yoki.item.entity.RestaurantBO;

public interface RestaurantRepo extends JpaRepository<RestaurantBO, Long> {

//	@Query("SELECT count(n) FROM Restaurant n WHERE n.id=1")
//	int getCount();



}
