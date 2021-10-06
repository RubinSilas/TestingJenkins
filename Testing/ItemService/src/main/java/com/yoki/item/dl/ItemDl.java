package com.yoki.item.dl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.yoki.item.entity.IngredientBO;
import com.yoki.item.entity.ItemBO;
import com.yoki.item.entity.NutritionBO;
import com.yoki.item.entity.RestaurantBO;
import com.yoki.item.repository.IngredientRepo;
import com.yoki.item.repository.ItemRepo;
import com.yoki.item.repository.NutritionRepo;
import com.yoki.item.repository.RestaurantRepo;

@Component
public class ItemDl {

	@Autowired
	ItemRepo objItemRepo;

	@Autowired
	NutritionRepo objNutritionRepo;

	@Autowired
	IngredientRepo objIngredientRepo;

	@Autowired
	RestaurantRepo objRestRepo;

	@Autowired
	EntityManager em;

	@Value("${limit}")
	int limit;

	public List<ItemBO> getItems(int pageIndex, long restaurantId, String searchText) {

		Query query = this.getPredicateQuery(restaurantId, searchText);

		List<ItemBO> items = query.setFirstResult(pageIndex * limit).setMaxResults(limit).getResultList();

		return items;
	}

	public Query getPredicateQuery(long restaurantId, String searchText) {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<ItemBO> cq = cb.createQuery(ItemBO.class);
		Root<ItemBO> itemRoot = cq.from(ItemBO.class);
		List<Predicate> predicates = new ArrayList<>();

		if (restaurantId != 0) {
			predicates.add(cb.equal(itemRoot.get("restaurant"), restaurantId));
		}

		if (!searchText.equals("0")) {
			predicates.add(cb.like(cb.lower(itemRoot.get("itemName")), "%" + searchText.toLowerCase() + "%"));
		}

		predicates.add(cb.equal(itemRoot.get("isDeleted"), 0));

		Predicate[] arr = predicates.stream().toArray(Predicate[]::new);

		cq.orderBy(cb.desc(itemRoot.get("modifiedDate")));

		cq.where(arr);
		Query query = em.createQuery(cq);

		return query;
	}

	public int getTotalItemCount(long restaurantId, String searchText) {

		Query query = this.getPredicateQuery(restaurantId, searchText);
		return query.getResultList().size();
	}

	public boolean updateItemStatus(long itemId, int status) {

		int updateCount = this.objItemRepo.updateIsAvailableById(itemId, status, LocalDateTime.now());

		if (updateCount > 0) {
			return true;
		}

		return false;
	}

	public boolean deleteItem(long itemId) {

		int deleteCount = this.objItemRepo.updateIsDeletedById(itemId, 1);

		if (deleteCount > 0) {
			return true;
		}

		return false;
	}

	public ItemBO getItem(long itemId) {

		Optional<ItemBO> item = this.objItemRepo.findById(itemId);

		return item.get();
	}

	public Map<Long, String> getNutrition() {
		List<NutritionBO> nutritions = this.objNutritionRepo.findByIsDeleted(0);

		Map<Long, String> nutritionMap = new HashMap<>();
		for (NutritionBO eachNutrition : nutritions) {
			nutritionMap.put(eachNutrition.getNutritionId(), eachNutrition.getNutritionType());
		}
		return nutritionMap;

	}

	public List<IngredientBO> getIngredients(String searchText) {

		return this.objIngredientRepo.findByIngredientNameContains(searchText);
		// return null;
	}

	public boolean addNewItem(ItemBO item, long restaurantId) {

		ItemBO alreadyExist = this.objItemRepo.findByItemNameAndRestaurantId(item.getItemName(), restaurantId);

		if (alreadyExist != null) {
			return false;
		}

		RestaurantBO restaurant = this.objRestRepo.findById(restaurantId).get();
		item.setRestaurant(restaurant);
		item.setRestaurantName(restaurant.getRestaurantName());
		if (restaurant.getRestaurantType().equals("Convenience")) {
			item.setIsConvenience(1);
		}

		List<NutritionBO> nutritions = new ArrayList<>();

		for (NutritionBO each : item.getNutritions()) {

			NutritionBO nutrition = this.objNutritionRepo.findByNutritionType(each.getNutritionType());

			if (nutrition != null) {
				nutritions.add(nutrition);
			}
		}
		item.setNutritions(nutritions);

		List<IngredientBO> ingredients = new ArrayList<>();

		for (IngredientBO each : item.getIngredients()) {

			IngredientBO ingredient = this.objIngredientRepo.findByIngredientName(each.getIngredientName());

			if (ingredient != null) {
				ingredients.add(ingredient);
			}
		}
		item.setIngredients(ingredients);
		item.setCreatedDate(LocalDateTime.now());
		item.setModifiedDate(LocalDateTime.now());

		this.objItemRepo.save(item);

		return true;
	}

	public boolean editItem(ItemBO item, long restaurantId) {

		RestaurantBO restaurant = this.objRestRepo.findById(restaurantId).get();
		item.setRestaurant(restaurant);
		item.setRestaurantName(restaurant.getRestaurantName());
		List<NutritionBO> nutritions = new ArrayList<>();

		for (NutritionBO each : item.getNutritions()) {

			NutritionBO nutrition = this.objNutritionRepo.findByNutritionType(each.getNutritionType());

			if (nutrition != null) {
				nutritions.add(nutrition);
			}
		}
		item.setNutritions(nutritions);

		List<IngredientBO> ingredients = new ArrayList<>();

		for (IngredientBO each : item.getIngredients()) {

			IngredientBO ingredient = this.objIngredientRepo.findByIngredientName(each.getIngredientName());

			if (ingredient != null) {
				ingredients.add(ingredient);
			}
		}
		item.setIngredients(ingredients);
		item.setModifiedDate(LocalDateTime.now());
		this.objItemRepo.save(item);

		return true;
	}

	public Map<Long, String> getItemsByIsChefSpecial(long restaurantId, String searchText) {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<ItemBO> cq = cb.createQuery(ItemBO.class);
		Root<ItemBO> itemRoot = cq.from(ItemBO.class);
		List<Predicate> predicates = new ArrayList<>();

		if (restaurantId != 0) {
			predicates.add(cb.equal(itemRoot.get("restaurant"), restaurantId));
		}

		if (searchText != null) {
			predicates.add(cb.like(cb.lower(itemRoot.get("itemName")), "%" + searchText.toLowerCase() + "%"));
		}

		predicates.add(cb.equal(itemRoot.get("isChefSpecial"), 1));

		Predicate[] arr = predicates.stream().toArray(Predicate[]::new);

		cq.where(arr);
		Query query = em.createQuery(cq);

		List<ItemBO> chefSpecials = query.getResultList();

		Map<Long, String> chefSpecialMap = new HashMap<>();

		for (ItemBO eachItem : chefSpecials) {
			chefSpecialMap.put(eachItem.getItemId(), eachItem.getItemName());
		}

		return chefSpecialMap;
	}

	public List<String> getAllConvenienceItems() {
		List<String> items = this.objItemRepo.findByIsConvenience();

		return items;
	}

}
