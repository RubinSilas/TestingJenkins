package com.example.demo.controller;



import javax.servlet.http.HttpServletRequest;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

@SpringBootTest
class RestaurantTestController {
	
	@Autowired
	RestaurantController restaurantController;

	private HttpServletRequest request;
	
	@Test
	@DisplayName("Test Restaurant Count")
	void testRestaurantCount()
	{
		try {
			assertEquals(11, restaurantController.getRestaurantCount(request).getBody());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@ParameterizedTest
	@ValueSource(ints = {0})
	@DisplayName("Test Restaurants response body")
	void testRestaurantResponseBody(int index) 
	{
		try {
			assertEquals(10, restaurantController.getAllrestaurants(index,request).getBody().size());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@ParameterizedTest
	@ValueSource(strings = {"big"})
	@DisplayName("Test search count")
	void testSearchCount(String searchText) 
	{
		try {
			assertEquals(3, restaurantController.getSearchCount(searchText,request).getBody());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@ParameterizedTest
	@ValueSource(strings = {"big"})
	@DisplayName("Test search response body")
	void testSearchResponse(String searchText)
	{
		try {
			assertEquals(3, restaurantController.searchRestaurant(searchText,0,request).getBody().size());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@ParameterizedTest
	@ValueSource(longs= {17})

	@DisplayName("Test status update")
	void testStatusUpdate(long id) 
	{
		try {
			assertEquals(true, restaurantController.updateRestaurantStatus(id,"opened",request).getBody());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@ParameterizedTest
	@ValueSource(longs= {17})
	@DisplayName("Test delete restaurant")
	void testDeleteRestaurant(long id) 
	{
		try {
			assertEquals(true, restaurantController.deleteRestaurant(id,request).getBody());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@ParameterizedTest
	@ValueSource(longs= {8})
	@DisplayName("Test get restasurant")
	void testGetRestaurant(long id) 
	{
		try {
			assertEquals(HttpStatus.OK, restaurantController.getRestaurant(id,request).getStatusCode());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	@DisplayName("Test get restasurant")
	void testGetRestaurantList() 
	{
		try {
			assertEquals(12, restaurantController.getRestaurants(request).getBody().size());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
