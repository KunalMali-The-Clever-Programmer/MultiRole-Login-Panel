package com.Multi_Role.Login_Panel_SpringBoot_React.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeoLocationService {

    public Map<String, String> getLocation(String ip) {
        Map<String, String> map = new HashMap<>();
        try {
            RestTemplate rest = new RestTemplate();
            Map<String, Object> res = rest.getForObject("http://ip-api.com/json/" + ip, Map.class);

            if (res != null && "success".equals(res.get("status"))) {
                map.put("city", res.get("city") != null ? res.get("city").toString() : "Unknown");
                map.put("state", res.get("regionName") != null ? res.get("regionName").toString() : "Unknown");
                map.put("country", res.get("country") != null ? res.get("country").toString() : "Unknown");
                map.put("lat", res.get("lat") != null ? res.get("lat").toString() : "0.0");
                map.put("lon", res.get("lon") != null ? res.get("lon").toString() : "0.0");
            } else {
                map.put("city", "Unknown");
                map.put("state", "Unknown");
                map.put("country", "Unknown");
                map.put("lat", "0.0");
                map.put("lon", "0.0");
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("city", "Unknown");
            map.put("state", "Unknown");
            map.put("country", "Unknown");
            map.put("lat", "0.0");
            map.put("lon", "0.0");
        }
        return map;
    }
}