package com.yoki.item.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "Nutrition")
public class NutritionBO {

	

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long nutritionId;
	String nutritionType;
	double nutritionValue;
	
	@ManyToMany(mappedBy = "nutritions",fetch = FetchType.LAZY)
	@JsonIgnore
	List<ItemBO> items;
	
	LocalDate createdDate;
	LocalDate modifiedDate;
    
    int isDeleted;

	public NutritionBO(String nutritionType, LocalDate createdDate, LocalDate modifiedDate, int isDeleted) {
		super();
		this.nutritionType = nutritionType;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.isDeleted = isDeleted;
	}

	

	
    
    
}
