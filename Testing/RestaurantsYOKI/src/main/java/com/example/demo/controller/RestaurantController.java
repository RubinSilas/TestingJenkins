package com.example.demo.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.RestaurantBO;
import com.example.demo.exceptionHandler.GlobalExceptionHandler;
import com.example.demo.restaurantBL.RestaurantBL;

@RestController
@RequestMapping(path = "/restaurant")
public class RestaurantController {

	@Autowired
	RestaurantBL restaurantBL;

	@Autowired
	private GlobalExceptionHandler globalExceptionHandler;
	
	// TO solve cors policy error

    @RequestMapping(method = RequestMethod.OPTIONS, value = "/**")
	public void corsHeadrers(HttpServletRequest REQUEST, HttpServletResponse RESPONSE) {
    	var REQORIGIN = REQUEST.getScheme() + "://" +   // "HTTP" + "://
                REQUEST.getServerName() +       // "MYHOST"
                ":" + REQUEST.getServerPort();
	    RESPONSE.addHeader("ACCESS-CONTROL-ALLOW-ORIGIN",REQORIGIN );
	    RESPONSE.addHeader("ACCESS-CONTROL-ALLOW-METHODS", "GET, POST, PUT, DELETE, OPTIONS");
	    RESPONSE.addHeader("ACCESS-CONTROL-ALLOW-HEADERS", "ORIGIN, CONTENT-TYPE, ACCEPT, X-REQUESTED-WITH");
	    RESPONSE.addHeader("ACCESS-CONTROL-MAX-AGE", "3600");
	    RESPONSE.addHeader("ACCESS-CONTROL-ALLOW-CREDENTIALS", "TRUE");
	}
    
    // To get count of All restaurants

	@GetMapping(path = "/getCount")
	public ResponseEntity<Integer> getRestaurantCount(HttpServletRequest request) throws IOException {
		try {
			int restaurantCount = this.restaurantBL.getRestaurantCount();
			return ResponseEntity.status(HttpStatus.OK).body(restaurantCount);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}
	
	// To get list of restaurats

	@GetMapping(path = "/getAllRestaurant/{pageIndex}")
	public ResponseEntity<List<RestaurantBO>> getAllrestaurants(@PathVariable("pageIndex") int pageIndex,
			HttpServletRequest request) throws IOException {
		try {
			List<RestaurantBO> restaurantBO = this.restaurantBL.getAllRestaurants(pageIndex);
			return ResponseEntity.status(HttpStatus.OK).body(restaurantBO);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// To get Search Count
	
	@GetMapping(path = "/searchCount/{searchText}")
	public ResponseEntity<Integer> getSearchCount(@PathVariable("searchText") String searchText,
			HttpServletRequest request) throws IOException {
		try {
			int searchCount = this.restaurantBL.getSearchCount(searchText);
			return ResponseEntity.status(HttpStatus.OK).body(searchCount);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}
	
	// To get list of restaurants based on search results

	@GetMapping(path = "/searchRestaurant/{searchText}/{pageIndex}")
	public ResponseEntity<List<RestaurantBO>> searchRestaurant(@PathVariable("searchText") String searchText,
			@PathVariable("pageIndex") int pageIndex, HttpServletRequest request) throws IOException {
		try {
			List<RestaurantBO> searchResults = this.restaurantBL.searchRestaurant(searchText, pageIndex);
			return ResponseEntity.status(HttpStatus.OK).body(searchResults);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	//To update the status of a restaurant
	
	@PutMapping(path = "/changeStatus/{restaurantId}/{restaurantStatus}")
	public ResponseEntity<Boolean> updateRestaurantStatus(@PathVariable("restaurantId") Long restaurantId,
			@PathVariable("restaurantStatus") String restaurantStatus, HttpServletRequest request) throws IOException {
		try {
			boolean updated = this.restaurantBL.updateRestaurantStatus(restaurantId, restaurantStatus);
			return ResponseEntity.status(HttpStatus.OK).body(updated);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// To delete a restaurant
	
	@PutMapping(path = "/deleteRestaurant/{restaurantId}")
	public ResponseEntity<Boolean> deleteRestaurant(@PathVariable("restaurantId") Long restaurantId,
			HttpServletRequest request) throws IOException {
		try {
			boolean deleted = this.restaurantBL.deleteRestaurant(restaurantId);
			return ResponseEntity.status(HttpStatus.OK).body(deleted);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// To get a particular restaurant Details
	
	@GetMapping(path = "/getRestaurant/{restaurantId}")
	public ResponseEntity<RestaurantBO> getRestaurant(@PathVariable("restaurantId") Long restaurantId,
			HttpServletRequest request) throws IOException {
		try {
			RestaurantBO restaurantBO = this.restaurantBL.getRestaurant(restaurantId);
			return ResponseEntity.status(HttpStatus.OK).body(restaurantBO);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}
	
// To add new Restaurant	

	@PostMapping(path = "/addRestaurant")
	public ResponseEntity<Boolean> addNewRestaurant(@RequestBody RestaurantBO restaurantBO, HttpServletRequest request)
			throws IOException {
		try {
			boolean response = this.restaurantBL.addNewRestaurant(restaurantBO);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	// To update a restaurant
	
	@PutMapping(path = "/editRestaurant/{chefSpecial}")
	public ResponseEntity<Boolean> updateRestaurant(@RequestBody RestaurantBO restaurantBO,
			@PathVariable("chefSpecial") String chefSpecial, HttpServletRequest request) throws IOException {
		try {
			boolean response = this.restaurantBL.updateRestaurant(restaurantBO, chefSpecial);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

	
	@GetMapping(path = "/getRestaurantList")
	public List<Object[]> getRestaurantList(HttpServletRequest request) throws IOException {
		try {
			return this.restaurantBL.getRestaurantList();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;
	}

// To get a map of restaurant names
	
	@GetMapping(path = "/getRestaurants")
	public ResponseEntity<Map<Long, String>> getRestaurants(HttpServletRequest request) throws IOException {
		try {
			Map<Long, String> restaurantMap = this.restaurantBL.getRestaurants();
			return ResponseEntity.status(HttpStatus.OK).body(restaurantMap);
		} catch (Exception e) {
			globalExceptionHandler.writeToExceptionFile(e, request);
			e.printStackTrace();
		}
		return null;

	}

	// To handle js exception

	@PutMapping(path = "/jsExceptions/{jsException}/{methodAndFileName}")
	public void handleJsException(@PathVariable("jsException") Exception jsException,
			@PathVariable("methodAndFileName") String methodAndFileName, HttpServletRequest request)
			throws IOException {

		globalExceptionHandler.writeJsExceptionFile(jsException, methodAndFileName, request);
	}
}
