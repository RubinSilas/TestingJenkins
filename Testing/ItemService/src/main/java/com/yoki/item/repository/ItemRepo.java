package com.yoki.item.repository;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.yoki.item.entity.ItemBO;

public interface ItemRepo extends JpaRepository<ItemBO, Long> {

	@Modifying
	@Transactional
	@Query("UPDATE ItemBO n SET n.isAvailable=?2,n.modifiedDate=?3 WHERE n.itemId=?1")
	Integer updateIsAvailableById(long itemId, int status, LocalDateTime time);

	@Modifying
	@Transactional
	@Query("UPDATE ItemBO n SET n.isDeleted=?2 WHERE n.itemId=?1")
	Integer updateIsDeletedById(long itemId, int deleteValue);

	@Query(value="SELECT n FROM ItemBO n WHERE n.itemName=?1 AND n.restaurant.restaurantId=?2 AND n.isDeleted=0")
	ItemBO findByItemNameAndRestaurantId(String itemName, long id);

	@Query(value="SELECT n.itemName FROM ItemBO n WHERE n.isDeleted=0 AND isConvenience=1")
	List<String> findByIsConvenience();

}
