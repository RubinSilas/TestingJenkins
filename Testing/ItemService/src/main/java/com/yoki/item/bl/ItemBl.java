package com.yoki.item.bl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yoki.item.dl.ItemDl;
import com.yoki.item.entity.IngredientBO;
import com.yoki.item.entity.ItemBO;

@Component
public class ItemBl {
	
	@Autowired
	ItemDl objItemDl;

	public List<ItemBO> getItems(int pageIndex, long restaurantId, String searchText) {
		
		return this.objItemDl.getItems(pageIndex, restaurantId, searchText);
	}

	public int getTotalItemCount(long restaurantId, String searchText) {
		
		return this.objItemDl.getTotalItemCount(restaurantId,searchText);
	}

	public boolean updateItemStatus(long itemId, int status) {
		
		return this.objItemDl.updateItemStatus(itemId,status);
	}

	public boolean deleteItem(long itemId) {
		
		return this.objItemDl.deleteItem(itemId);
	}

	public ItemBO getItem(long itemId) {
		
		return this.objItemDl.getItem(itemId);
	}

	public Map<Long, String> getNutrition() {
		
		return this.objItemDl.getNutrition();
	}

	public List<IngredientBO> getIngredients(String searchText) {
		
		return this.objItemDl.getIngredients(searchText);
	}

	public boolean addNewItem(ItemBO item,long restaurantId) {
		
		return this.objItemDl.addNewItem(item,restaurantId);
	}

	public boolean editItem(ItemBO item,long restaurantId) {
		
		return this.objItemDl.editItem(item,restaurantId);
	}

	public Map<Long, String> getItemsByIsChefSpecial(long restaurantId, String searchText) {
		
		return this.objItemDl.getItemsByIsChefSpecial(restaurantId, searchText);
	}

	public List<String> getAllConvenienceItems() {
		
		return this.objItemDl.getAllConvenienceItems();
	}

}
