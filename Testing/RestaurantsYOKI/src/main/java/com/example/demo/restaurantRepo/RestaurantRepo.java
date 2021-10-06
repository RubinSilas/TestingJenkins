package com.example.demo.restaurantRepo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.RestaurantBO;

public interface RestaurantRepo extends JpaRepository<RestaurantBO,Long> {

	@Query(value="SELECT count(n) FROM RestaurantBO n WHERE n.isDeleted=0")
	public Integer getRestaurantCount();

	@Query(value="SELECT n FROM RestaurantBO n WHERE n.isDeleted=0 ORDER BY modifiedDate DESC")
	public List<RestaurantBO> getAllRestaurants(Pageable pageable);

	@Query("SELECT count(n) FROM RestaurantBO n WHERE n.isDeleted=0 AND lower(n.restaurantName) LIKE %?#{[0].toLowerCase()}%")
	public Integer getSearchCount(String searchText);

	@Query("SELECT n FROM RestaurantBO n WHERE n.isDeleted=0 AND lower(n.restaurantName) LIKE %?#{[0].toLowerCase()}% ORDER BY modifiedDate DESC")
	public List<RestaurantBO> searchRestaurant(String searchText, int pageIndex);

	@Modifying
	@Transactional
	@Query("UPDATE RestaurantBO n SET n.restaurantStatus=?2,n.modifiedDate=?3 WHERE n.restaurantId=?1")
	public Integer updateRestaurantStatus(Long restaurantId, String restaurantStatus, LocalDateTime time);

	@Modifying
	@Transactional
	@Query("UPDATE ItemBO n SET n.isDeleted=1 WHERE n.restaurant.restaurantId=?1")
	public Integer deleteRestaurant(Long restaurantId);

	@Query("SELECT n FROM RestaurantBO n WHERE n.restaurantId= ?1")
	public RestaurantBO getRestaurant(Long restaurantId);

	@Query("SELECT n FROM RestaurantBO n WHERE n.isDeleted=0 AND n.restaurantName= ?1")
	public RestaurantBO findByRestaurantName(String restaurantName);
	
	@Query("SELECT n.restaurantName,n.restaurantId FROM RestaurantBO n WHERE n.isDeleted=0")
	public List<Object[]> getRestaurantNames();

	@Query("SELECT n FROM RestaurantBO n WHERE n.isDeleted=?1")
    public List<RestaurantBO> findByIsDeleted(int i);

	public RestaurantBO getRestaurantByRestaurantId(Long restaurantId);

	@Modifying
	@Transactional
	@Query("UPDATE ItemBO n SET n.isChefSpecial=0 WHERE n.restaurant.restaurantId=?1 AND isDeleted=0")
	public int setAllItemsAsZero(long restId);

	
	@Modifying
	@Transactional
	@Query("UPDATE ItemBO n SET n.isChefSpecial=1 WHERE n.restaurant.restaurantId=?2 AND n.itemName=?1")
	public int setChefSpecialItems(String string, long restId);

	@Query("SELECT count(n) FROM ItemBO n WHERE n.restaurant.restaurantId=?1 AND n.isDeleted=0 AND n.isConvenience=0")
	public int getRestuarantItemsCount(long restId);
	
	
	

}
