package com.tabungin.tabungin.payload;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDTO {
    private Long id;
    private String name;
    private String email;
}
