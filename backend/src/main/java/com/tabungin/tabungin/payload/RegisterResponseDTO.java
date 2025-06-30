package com.tabungin.tabungin.payload;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterResponseDTO {
    private Long id;
    private String name;
    private String email;
}
