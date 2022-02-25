package com.revision.rentapp.dao;

import com.revision.rentapp.entity.FloorPlan;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import javax.persistence.EntityManager;
import java.util.List;

public class FloorPlanDAOImpl implements FloorPlanDAO {
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public List<FloorPlan> getAllFloorPlans() {
		
		Session session = entityManager.unwrap(Session.class);
		Query<FloorPlan> query = session.createQuery("from FloorPlan", FloorPlan.class);
		List<FloorPlan> allFloorPlans = query.getResultList();
		
		return allFloorPlans;
	}

}
