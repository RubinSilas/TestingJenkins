package com.example.demo.entity;

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

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

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
@Table(name = "Ingredient")
public class IngredientBO {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long ingredientId;
	
	String ingredientName;
	
	@ManyToMany(mappedBy = "ingredients",fetch = FetchType.LAZY)
	@LazyCollection(LazyCollectionOption.FALSE)
	@JsonIgnore
	List<ItemBO> items;
	
	LocalDate createdDate;
	LocalDate modifiedDate;
	
	int isDeleted;

	public IngredientBO(String ingredientName, LocalDate createdDate, LocalDate modifiedDate, int isDeleted) {
		super();
		this.ingredientName = ingredientName;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.isDeleted = isDeleted;
	}

	
	
	
	
}
