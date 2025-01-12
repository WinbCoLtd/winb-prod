select * from vehicle;

=> 

SELECT * 
FROM vehicle
WHERE 
  (description LIKE '%search_term%' OR title LIKE '%search_term%') AND
  price BETWEEN x AND y AND
  model IN ('model1', 'model2', 'model3') AND
  maker IN ('maker1', 'maker2', 'maker3') AND
  vehicleType IN ('type1', 'type2', 'type3') AND
  fuel IN ('fuel1', 'fuel2', 'fuel3') AND
  drive IN ('drive1', 'drive2', 'drive3') AND
  color IN ('color1', 'color2', 'color3') AND
  condition IN ('condition1', 'condition2') AND
  manufactureYear BETWEEN start_year AND end_year AND
  milage BETWEEN min_milage AND max_milage AND
  maxPassengers = some_value;


=>

