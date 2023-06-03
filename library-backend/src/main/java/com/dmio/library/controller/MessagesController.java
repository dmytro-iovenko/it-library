package com.dmio.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmio.library.entity.Message;
import com.dmio.library.model.AdminMessage;
import com.dmio.library.service.MessagesService;
import com.dmio.library.utils.ExtractJWT;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {
    @Autowired
    private MessagesService messagesService;

    @PostMapping("/secure/postMessage")
    public ResponseEntity<HttpStatus> postMessage(@RequestHeader(value = "Authorization") String token,
            @RequestBody Message messageRequest) {
        String userEmail = ExtractJWT.jwtExtraction(token, "sub");
        messagesService.postMessage(messageRequest, userEmail);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/secure/admin/message")
    public ResponseEntity<HttpStatus> putMessage(@RequestHeader(value = "Authorization") String token,
            @RequestBody AdminMessage adminMessage) throws Exception {
        String userEmail = ExtractJWT.jwtExtraction(token, "sub");
        String admin = ExtractJWT.jwtExtraction(token, "userType");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only.");
        }
        messagesService.putMessage(adminMessage, userEmail);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
