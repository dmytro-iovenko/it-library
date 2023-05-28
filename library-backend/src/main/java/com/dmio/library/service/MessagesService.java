package com.dmio.library.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dmio.library.dao.MessageRepository;
import com.dmio.library.entity.Message;

@Service
@Transactional
public class MessagesService {
    @Autowired
    private MessageRepository messageRepository;

    public void postMessage(Message messageRequest, String userEmail) {
        Message message = new Message(messageRequest.getTitle(), messageRequest.getQuestion());
        message.setUserEmail(userEmail);
        messageRepository.save(message);
    }

}
