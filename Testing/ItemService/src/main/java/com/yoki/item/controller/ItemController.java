package com.yoki.item.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yoki.item.bl.ItemBl;
import com.yoki.item.entity.IngredientBO;
import com.yoki.item.entity.ItemBO;
import com.yoki.item.entity.NutritionBO;
import com.yoki.item.entity.RestaurantBO;
import com.yoki.item.exceptionhandler.GlobalExceptionHandler;
import com.yoki.item.repository.IngredientRepo;
import com.yoki.item.repository.ItemRepo;
import com.yoki.item.repository.NutritionRepo;
import com.yoki.item.repository.RestaurantRepo;

@RestController
@RequestMapping(path = "/items")
public class ItemController {

	@Autowired
	ItemBl objItemBl;

	@Autowired
	RestaurantRepo restRepo;

	@Autowired
	ItemRepo itemRepo;

	@Autowired
	IngredientRepo ingRepo;

	@Autowired
	NutritionRepo nutRepo;

	@Autowired
	private GlobalExceptionHandler globalExceptionHandler;

	// Working
	// To get item count
	@GetMapping(path = "/itemCount/{restaurantId}/{searchText}")
	public ResponseEntity<Integer> getTotalItemCount(@PathVariable("restaurantId") long restaurantId,
			@PathVariable("searchText") String searchText, HttpServletRequest request) throws IOException {
		try {
			int itemCount = this.objItemBl.getTotalItemCount(restaurantId, searchText);
			return ResponseEntity.status(HttpStatus.OK).body(itemCount);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// Working
	// To get items
	@GetMapping(path = "/getItems/{pageIndex}/{restaurantId}/{searchText}")
	public ResponseEntity<List<ItemBO>> getItems(@PathVariable("pageIndex") int pageIndex,
			@PathVariable("restaurantId") long restaurantId, @PathVariable("searchText") String searchText,
			HttpServletRequest request) throws IOException {

		try {
			List<ItemBO> items = this.objItemBl.getItems(pageIndex, restaurantId, searchText);
			return ResponseEntity.status(HttpStatus.OK).body(items);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// Working
	// To update Status of item
	@PutMapping(path = "/updateStatus/{itemId}/{status}")
	public ResponseEntity<Boolean> updateItemStatus(@PathVariable("itemId") long itemId,
			@PathVariable("status") int status, HttpServletRequest request) throws IOException {

		try {
			boolean updateFlag = this.objItemBl.updateItemStatus(itemId, status);
			return ResponseEntity.status(HttpStatus.OK).body(updateFlag);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// Working
	// To delete item
	@PutMapping(path = "/deleteItem/{itemId}")
	public ResponseEntity<Boolean> deleteItem(@PathVariable("itemId") long itemId, HttpServletRequest request)
			throws IOException {

		try {
			boolean deleteFlag = this.objItemBl.deleteItem(itemId);
			return ResponseEntity.status(HttpStatus.OK).body(deleteFlag);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// Working
	// To get Item by item id
	@GetMapping(path = "/getItem/{itemId}")
	public ResponseEntity<ItemBO> getItem(@PathVariable("itemId") long itemId, HttpServletRequest request)
			throws IOException {

		try {
			ItemBO item = this.objItemBl.getItem(itemId);
			return ResponseEntity.status(HttpStatus.OK).body(item);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// Working
	// To get nutrions
	@GetMapping(path = "/getNutritions")
	public ResponseEntity<Map<Long, String>> getNutrition(HttpServletRequest request) throws IOException {

		try {
			Map<Long, String> nutritionMap = this.objItemBl.getNutrition();
			return ResponseEntity.status(HttpStatus.OK).body(nutritionMap);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// Working
	// To get ingredients by searchText
	@GetMapping(path = "/getIngredients/{searchText}")
	public ResponseEntity<List<IngredientBO>> getIngredients(@PathVariable("searchText") String searchText,
			HttpServletRequest request) throws IOException {

		try {
			List<IngredientBO> ingredients = this.objItemBl.getIngredients(searchText);
			return ResponseEntity.status(HttpStatus.OK).body(ingredients);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// Working
	// To add new item
	@PostMapping(path = "/addItem/{restaurantId}")
	public ResponseEntity<Boolean> addNewItem(@RequestBody ItemBO item, @PathVariable("restaurantId") long restaurantId,
			HttpServletRequest request) throws IOException {

		try {
			boolean saveFlag = this.objItemBl.addNewItem(item, restaurantId);
			return ResponseEntity.status(HttpStatus.OK).body(saveFlag);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// Working
	// To edit the item
	@PutMapping("/editItem/{restaurantId}")
	public ResponseEntity<Boolean> editItem(@RequestBody ItemBO item, @PathVariable("restaurantId") long restaurantId,
			HttpServletRequest request) throws IOException {

		try {
			boolean editFlag = this.objItemBl.editItem(item, restaurantId);
			return ResponseEntity.status(HttpStatus.OK).body(editFlag);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// Working
	// To get items By isChecfSpecial
	@GetMapping("/chefSpecial/{restaurantId}/{searchText}")
	public ResponseEntity<Map<Long, String>> getItemsByIsChefSpecial(@PathVariable("restaurantId") long restaurantId,
			@PathVariable("searchText") String searchText, HttpServletRequest request) throws IOException {

		try {
			Map<Long, String> chefSpecialMap = this.objItemBl.getItemsByIsChefSpecial(restaurantId, searchText);
			return ResponseEntity.status(HttpStatus.OK).body(chefSpecialMap);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// Working
	// To get convenience items
	@GetMapping("/convenience")
	public ResponseEntity<List<String>> getAllConvenienceItems(HttpServletRequest request) throws IOException {

		try {
			List<String> convenienceItems = this.objItemBl.getAllConvenienceItems();
			return ResponseEntity.status(HttpStatus.OK).body(convenienceItems);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// Working
	// To handle js exception
	@PutMapping(path = "/jsExceptions/{jsException}/{methodAndFileName}")
	public void handleJsException(@PathVariable("jsException") Exception jsException,
			@PathVariable("methodAndFileName") String methodAndFileName, HttpServletRequest request)
			throws IOException {

		globalExceptionHandler.writeJsExceptionFile(jsException, methodAndFileName, request);
	}

}
//----------------------------------------------------------------------------------------------------------------------------------------------

