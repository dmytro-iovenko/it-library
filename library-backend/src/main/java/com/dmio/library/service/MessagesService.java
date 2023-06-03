package com.dmio.library.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dmio.library.dao.MessageRepository;
import com.dmio.library.entity.Message;
import com.dmio.library.model.AdminMessage;

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

    public void putMessage(AdminMessage adminMessage, String userEmail) throws Exception {
        Optional<Message> message = messageRepository.findById(adminMessage.getId());
        if (!message.isPresent()) {
            throw new Exception("Message not found");
        }
        message.get().setAdminEmail(userEmail);
        message.get().setResponse(adminMessage.getResponse());
        message.get().setClosed(true);
        messageRepository.save(message.get());
    }

}
