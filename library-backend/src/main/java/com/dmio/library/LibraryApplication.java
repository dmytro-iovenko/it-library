package com.dmio.library;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.dmio.library.dao.ReviewRepository;
import com.dmio.library.entity.Review;

import lombok.AllArgsConstructor;

@SpringBootApplication
@AllArgsConstructor
public class LibraryApplication implements CommandLineRunner {
	ReviewRepository reviewRepository;

	public static void main(String[] args) {
		SpringApplication.run(LibraryApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Review[] reviews = new Review[] {
				// Review(String isbn, String userEmail, double rating, String
				// reviewDescription)
				new Review("1001643027241", "michael.scott@example.com", 2.0,
						"Disappointing read. The content lacks coherence, and explanations are convoluted. Too much jargon without sufficient context. Felt more like a disjointed compilation of facts rather than a cohesive guide for someone trying to grasp IT fundamentals."),
				new Review("9781718501089", "meredith.grey@example.com", 4.5,
						"An indispensable guide for aspiring IT professionals! This book seamlessly blends theory with real-world examples, providing a solid foundation for understanding complex concepts. A must-read for anyone entering the dynamic field of information technology."),
				new Review("1001643027241", "teresa.lisbon@example.com", 5.0,
						"Exceptional! This IT book stands out with its engaging writing style and hands-on approach. It not only demystifies intricate technical topics but also instills problem-solving skills. A reliable companion for anyone seeking to navigate the ever-evolving landscape of IT."),
		};
		for (int i = 0; i < reviews.length; i++) {
			reviewRepository.save(reviews[i]);
		}
	}

}
