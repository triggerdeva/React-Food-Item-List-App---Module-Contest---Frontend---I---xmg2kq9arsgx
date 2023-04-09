import React, { useRef, useState } from "react";
import "../styles/App.css";

function FoodList() {
	const form=useRef()
  const [foods, setFoods] = useState([]);
  const [itemName, setItemName] = useState("");
  const [foodType, setFoodType] = useState("");
  const [spicinessLevel, setSpicinessLevel] = useState("");
  const [isFirstCardEnabled, setIsFirstCardEnabled] = useState(false);
  const [isSecondCardEnabled, setIsSecondCardEnabled] = useState(false);
  const [isFormEnabled, setIsFormEnabled] = useState(false);
  const [isFoodAdd, setAdd] = useState(false);
  const addFood = () => {
    setAdd(true);
    setIsFirstCardEnabled(true);
	setIsSecondCardEnabled(true);
	setIsFormEnabled(false)
  };
  const formVisibility = (e) => {
    e.preventDefault();
	
    setIsFormEnabled(true);
	if(!isFormEnabled){
		console.log(form.current)
		form.current.style.opacity=1;
	}
	else{
		form.current.style.opacity=0.5;
	}
  };

  const saveData =()=>{
	//setIsFormEnabled(true)
	setIsFormEnabled(false)
	setIsFirstCardEnabled(false)
	setFoods([...foods,{
		itemName:itemName,
		foodType:foodType,
		spicinessLevel:spicinessLevel,
	}])
	setIsSecondCardEnabled(true)
	setAdd(false)
	
  }

  const deleteHandler =(itemname)=>{
	const newData=foods.filter((food)=>food.itemName!==itemname)
	setFoods(newData)
  }

  return (
    <>
      <div className="container">
        <h1>Food Items List</h1>
        <button onClick={addFood}>Add Food</button>

        {isFoodAdd && (
          <div className="card-container">
            <>
              <h2>Item Name:</h2>
              <input
                name="itemName"
                onChange={(e) => setItemName(e.target.value)}
                type="text"
                disabled={!isFirstCardEnabled}
              />
              <h2>Food Type:</h2>
              <input
                name="foodType"
                onChange={(e) => setFoodType(e.target.value)}
                type="text"
                disabled={!isFirstCardEnabled}
              />
              <div className={`card`}>
                <form ref={form}onClick={formVisibility} id={'form'} >
                  <h2>Spiciness Level:</h2>
                  <input
                    name="spicinessLevel"
                    onChange={(e) => setSpicinessLevel(e.target.value)}
                    type="text"
                    disabled={!isFormEnabled}
                  />
                </form>
              </div>
            </>
          </div>
        )}
        {isFoodAdd && (
          <div className={`card ${isSecondCardEnabled ? "" : "disabled"}`}>
            <button onClick={saveData}>Save</button>
          </div>
        )}

       <ul className="list">
          {foods?.map((food,index)=>
		  <li key={index}>
		  {food.itemName} ({food.foodType}) - Spiciness Level: {food.spicinessLevel}
		  <button onClick={()=>deleteHandler(food.itemName)}>Delete</button>
		</li>)}
        </ul>
      </div>
    </>
  );
}

export default FoodList;
