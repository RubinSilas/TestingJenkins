package com.example.demo.restaurantBL;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import com.example.demo.entity.RestaurantBO;
import com.example.demo.restaurantDL.RestaurantDL;
@Configuration
@Component
public class RestaurantBL {

	@Autowired
	RestaurantDL restaurantDL;
	
	public Integer getRestaurantCount() {
		return this.restaurantDL.getRestaurantCount();
	}

	public List<RestaurantBO> getAllRestaurants(int pageIndex) {
		return this.restaurantDL.getAllRestaurants(pageIndex);
	}

	public Integer getSearchCount(String searchText) {
		return this.restaurantDL.getSearchCount(searchText);
	}

	public List<RestaurantBO> searchRestaurant(String searchText, int pageIndex) {
		return this.restaurantDL.searchRestaurant(searchText,pageIndex);
	}

	public Boolean updateRestaurantStatus(Long restaurantId, String restaurantStatus) {
		 return this.restaurantDL.updateRestaurantStatus(restaurantId,restaurantStatus);
		 
	}

	public Boolean deleteRestaurant(Long restaurantId) {
		return this.restaurantDL.deleteRestaurant(restaurantId);
	}

	public RestaurantBO getRestaurant(Long restaurantId) {
		return this.restaurantDL.getRestaurant(restaurantId);
	}

	public Boolean addNewRestaurant(RestaurantBO restaurantBO) {
		String restaurantName=restaurantBO.getRestaurantName();
		RestaurantBO returnedValue= this.restaurantDL.findByRestaurantName(restaurantName);
		if(returnedValue==null)
		{
			RestaurantBO response= this.restaurantDL.addNewRestaurant(restaurantBO);
			if(response!=null)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}

	public Boolean updateRestaurant(RestaurantBO restaurantBO,String chefSpecial) {
		return this.restaurantDL.updateRestaurant(restaurantBO,chefSpecial);
	}

	public List<Object[]> getRestaurantList() {
		return this.restaurantDL.getRestaurantList();
	}
	
	public Map<Long, String> getRestaurants() {
	       
        return this.restaurantDL.getRestaurants();
    }

}
