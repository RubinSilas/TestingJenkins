package com.example.demo.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "Item")
public class ItemBO {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long itemId;
    String itemName;
    String restaurantName;
    double itemPrice;
    String itemCategory;
    String itemLabels;
    double itemTax;
    String itemDescription;
    String itemImageUrl;
    int isAlchoholic;
    String allergensName;
    String allergensDescription;
    double totalCalories;
    int isAvailable;
    int isChefSpecial;
    int isConvenience;
    
	LocalDateTime createdDate;
	LocalDateTime modifiedDate;
    
    int isDeleted;
   
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "ItemIngredientMap", joinColumns = @JoinColumn(name = "itemId"), inverseJoinColumns = @JoinColumn(name = "ingredientId"))
    List<IngredientBO> ingredients;
   
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "ItemNutritionMap", joinColumns = @JoinColumn(name = "itemId"), inverseJoinColumns = @JoinColumn(name = "nutritionId"))
    List<NutritionBO> nutritions;
   
   
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "restaurantId", nullable = false)
    @JsonIgnore
    RestaurantBO restaurant;


	public ItemBO(String itemName, double itemPrice, String itemCategory, String itemLabels, double itemTax,
			String itemDescription, String itemImageUrl, int isAlchoholic, String allergensName,
			String allergensDescription, double totalCalories, int isAvailable, int isChefSpecial, int isConvenience,
			LocalDateTime createdDate, LocalDateTime modifiedDate, int isDeleted) {
		super();
		this.itemName = itemName;
		this.itemPrice = itemPrice;
		this.itemCategory = itemCategory;
		this.itemLabels = itemLabels;
		this.itemTax = itemTax;
		this.itemDescription = itemDescription;
		this.itemImageUrl = itemImageUrl;
		this.isAlchoholic = isAlchoholic;
		this.allergensName = allergensName;
		this.allergensDescription = allergensDescription;
		this.totalCalories = totalCalories;
		this.isAvailable = isAvailable;
		this.isChefSpecial = isChefSpecial;
		this.isConvenience = isConvenience;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.isDeleted = isDeleted;
	}


	

	
    
    
}
