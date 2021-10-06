package com.yoki.upload.controllers;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(path = "/file")
public class FileUploadController {
	
	
	//To Upload file
	
	@PostMapping("/upload")
	public ResponseEntity<String> uploadFile(@RequestParam("image") MultipartFile file) {
		try {
			String fileName = Math.random()+"_"+ org.springframework.util.StringUtils.cleanPath(file.getOriginalFilename());
			Path path = Paths.get("D:\\YokiImages\\" + fileName);
			try {
				Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
			} catch (IOException e) {
				e.printStackTrace();
			}
			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
					.path("/file/download/")
					.path(fileName)
					.toUriString();
			return ResponseEntity.ok(fileDownloadUri);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	//To Upload Multiple files
	
	@PostMapping("/multi-upload")
	public ResponseEntity uploadFiles(@RequestParam("files") MultipartFile[] files) {
		try {
			List<Object> fileDownloadUrls = new ArrayList<>();
			Arrays.asList(files)
					.stream()
					.forEach(file -> fileDownloadUrls.add(uploadFile(file).getBody()));
			return ResponseEntity.ok(fileDownloadUrls);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	//To get file
	
	@GetMapping("/download/{fileName:.+}")
	public ResponseEntity<Resource> downloadFileFromLocal(@PathVariable String fileName) {
		try {
			Path path = Paths.get("D:\\YokiImages\\" + fileName);
			Resource resource = null;
			try {
				resource = new UrlResource(path.toUri());
			} catch (MalformedURLException e) {
				e.printStackTrace();
			}
			return ResponseEntity.ok()
					.contentType(MediaType.parseMediaType(MediaType.IMAGE_PNG_VALUE))
					.header(HttpHeaders.ORIGIN, "attachment; filename=\"" + resource.getFilename() + "\"")
					.body(resource);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	//To delete file
	
	@PutMapping("/delete/{fileName:.+}")
	public ResponseEntity<Boolean> deleteFile(@PathVariable String fileName){
		
		try {
			File file = new File("D:\\" + fileName);
			file.delete();
			
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
		
	}

}
