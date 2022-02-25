package com.revision.rentapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.revision.rentapp.dao.FloorPlanDAO;
import com.revision.rentapp.entity.FloorPlan;

public class FloorPlanServiceImpl implements FloorPlanService {
	
	@Autowired
	private FloorPlanDAO floorplanDAO;

	@Override
	@Transactional
	public List<FloorPlan> getAllFloorPlans() {
		return floorplanDAO.getAllFloorPlans();
	}

}
