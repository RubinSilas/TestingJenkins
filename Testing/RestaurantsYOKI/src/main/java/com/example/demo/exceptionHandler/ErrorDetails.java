package com.example.demo.exceptionHandler;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ErrorDetails {

	LocalDateTime time;
	String message;
	String method;
	String path;
	@Override
	public String toString() {
		return "ErrorDetails [time=" + time + ", message=" + message + ", method=" + method + ", path=" + path
				+ "]";
	}
}
