package com.dmio.library.utils;

import java.util.Map;

import com.nimbusds.jwt.JWTParser;

public class ExtractJWT {
    public static String jwtExtraction(String token, String extraction) {
        token = token.replace("Bearer ", "");
        try {
            var jwt = JWTParser.parse(token);
            var claimsSet = jwt.getJWTClaimsSet();
            Map<String, Object> claims = claimsSet.getClaims();
            return (String) claims.get(extraction);
        } catch (Exception e) {
            return null;
        }
    }
}
