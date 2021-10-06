package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


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
@Table(name = "Restaurant")
public class RestaurantBO {
	
	

	

	public RestaurantBO(String restaurantName, String restaurantLocation, String cuisineType, String restaurantType,
			String restaurantImage, String restaurantLogo, String restaurantStatus, Integer isDeleted,
			LocalDateTime createdDate, LocalDateTime modifiedDate, List<ItemBO> itemBO) {
		super();
		this.restaurantName = restaurantName;
		this.restaurantLocation = restaurantLocation;
		this.cuisineType = cuisineType;
		this.restaurantType = restaurantType;
		this.restaurantImage = restaurantImage;
		this.restaurantLogo = restaurantLogo;
		this.restaurantStatus = restaurantStatus;
		this.isDeleted = isDeleted;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.itemBO = itemBO;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long restaurantId;	
	
	
	private String restaurantName;
	
	private String restaurantLocation;
	
	private String cuisineType;
	
	private String restaurantType;
	
	private String restaurantImage;
	
	private String restaurantLogo;
	
	private String restaurantStatus;
	
	private String convenienceItems;

	private Integer isDeleted;
	
	private LocalDateTime createdDate;
	
	private LocalDateTime modifiedDate;
	
	@OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ItemBO> itemBO;

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
