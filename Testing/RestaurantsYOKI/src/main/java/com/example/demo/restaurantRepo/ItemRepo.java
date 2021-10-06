package com.example.demo.restaurantRepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ItemBO;

public interface ItemRepo extends JpaRepository<ItemBO,Long> {

}
