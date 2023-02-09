package com.dalcho.adme;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Controller
@Slf4j
public class HtmlController {

    // 로그인 & 회원가입 페이지
    @GetMapping("/user/login")
    public String login(){
        return "login";
    }

    // 기본 페이지
    @GetMapping("/adme")
    public String home() {
        return "adme";
    }

    // 10s 페이지
    @GetMapping("/tenseconds")
    public String tenSeconds() {
        return "tenseconds";
    }

    // 로그인 없이 이용가능한 페이지
    @GetMapping("/")
    public String mainPage() {
        return "index";
    }

    @GetMapping("/taste") // 로그인 없이 이용가능한 페이지
    public String taste() {
        return "blur";
    }

    // 채팅 리스트 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        return "chat-list";
    }

    // 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "chat-room";
    }


}
