package com.example.demo.restaurantDL;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.example.demo.entity.ItemBO;
import com.example.demo.entity.RestaurantBO;
import com.example.demo.restaurantRepo.RestaurantRepo;

@Configuration
@Component
public class RestaurantDL {

	@Autowired
	RestaurantRepo restaurantRepo;

	public Integer getRestaurantCount() {
		return this.restaurantRepo.getRestaurantCount();
	}

	public List<RestaurantBO> getAllRestaurants(int pageIndex) {
		Pageable pageable = PageRequest.of(pageIndex, 10);
		return this.restaurantRepo.getAllRestaurants(pageable);
	}

	public Integer getSearchCount(String searchText) {
		return this.restaurantRepo.getSearchCount(searchText);
	}

	public List<RestaurantBO> searchRestaurant(String searchText, int pageIndex) {
		return this.restaurantRepo.searchRestaurant(searchText, pageIndex);
	}

	public Boolean updateRestaurantStatus(Long restaurantId, String restaurantStatus) {
		int response = this.restaurantRepo.updateRestaurantStatus(restaurantId, restaurantStatus, LocalDateTime.now());
		if (response == 1) {
			return true;
		} else {
			return false;
		}
	}

	public Boolean deleteRestaurant(Long restaurantId) {

		RestaurantBO restaurant = this.restaurantRepo.getRestaurantByRestaurantId(restaurantId);
		restaurant.setIsDeleted(1);
		RestaurantBO response1 = this.restaurantRepo.save(restaurant);

		if (response1 != null) {
			 this.restaurantRepo.deleteRestaurant(restaurantId);
			return true;
		}
		return false;
	}

	public RestaurantBO getRestaurant(Long restaurantId) {
		return this.restaurantRepo.getRestaurant(restaurantId);
	}

	public RestaurantBO findByRestaurantName(String restaurantName) {
		return this.restaurantRepo.findByRestaurantName(restaurantName);
	}

	public RestaurantBO addNewRestaurant(RestaurantBO restaurantBO) {
		restaurantBO.setCreatedDate(LocalDateTime.now());
		restaurantBO.setModifiedDate(LocalDateTime.now());
		return this.restaurantRepo.save(restaurantBO);
	}

	public Boolean updateRestaurant(RestaurantBO restaurantBO, String chefSpecial) {
		restaurantBO.setModifiedDate(LocalDateTime.now());
		RestaurantBO response1 = this.restaurantRepo.save(restaurantBO);
		if (response1 != null) {
			// return true;
			long restId = response1.getRestaurantId();
			if (this.restaurantRepo.getRestuarantItemsCount(restId) > 0) {
				int response2 = this.restaurantRepo.setAllItemsAsZero(restId);
				if (response2 != 0) {
					// return true;
					if (!chefSpecial.equals("none,")) {
						int response3 = 0;
						for (int i = 0; i < chefSpecial.split(",").length; i++) {
							response3 += this.restaurantRepo.setChefSpecialItems(chefSpecial.split(",")[i], restId);
						}
						if (response3 != 0) {
							return true;
						} else {
							return false;
						}
					} else {
						return true;
					}
				} else {
					return false;
				}
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	public List<Object[]> getRestaurantList() {
		return this.restaurantRepo.getRestaurantNames();
	}

	public Map<Long, String> getRestaurants() {

		List<RestaurantBO> restaurants = this.restaurantRepo.findByIsDeleted(0);

		Map<Long, String> restaurantMap = new HashMap<Long, String>();

		for (RestaurantBO each : restaurants) {
			restaurantMap.put(each.getRestaurantId(), each.getRestaurantName());
		}

		return restaurantMap;
	}

}
