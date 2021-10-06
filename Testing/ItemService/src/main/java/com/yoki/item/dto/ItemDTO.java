package com.yoki.item.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yoki.item.entity.IngredientBO;
import com.yoki.item.entity.ItemBO;
import com.yoki.item.entity.NutritionBO;
import com.yoki.item.entity.RestaurantBO;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ItemDTO {

	long itemId;
    String itemName;
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
    
	LocalDate createdDate;
	LocalDate modifiedDate;
    
    int isDeleted;
}
