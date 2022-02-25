package com.revision.rentapp.entity;

import javax.persistence.*;

//+-------+--------------+------+-----+---------+----------------+
//| Field | Type         | Null | Key | Default | Extra          |
//+-------+--------------+------+-----+---------+----------------+
//| id    | int          | NO   | PRI | NULL    | auto_increment |
//| type  | varchar(10)  | YES  |     | NULL    |                |
//| bed   | int          | YES  |     | NULL    |                |
//| bath  | decimal(2,1) | YES  |     | NULL    |                |
//| sqft  | int          | YES  |     | NULL    |                |
//| rent  | decimal(6,2) | YES  |     | NULL    |                |
//+-------+--------------+------+-----+---------+----------------+


@Entity
@Table(name="floorplans")
public class FloorPlan {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;

	@Column(name="type")
	private String type;
	
	@Column(name="bed")
	private int bed;

	@Column(name="bath")
	private double bath;

	@Column(name="sqft")
	private int sqft;
	
	@Column(name="rent")
	private double rent;
}
