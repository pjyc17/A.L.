package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "community")
public class Community extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    private LocalDateTime updatedDate;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();

    // 0328 김병완 save용 builder 추가
    @Builder
    public Community(Long id, String title, String content, LocalDateTime createdDate, LocalDateTime updatedDate, User user) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        // 이게 맞아?
        //this.user = user;
    }
}
