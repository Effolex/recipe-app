import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import CategoriesButtons from '../components/CategoriesButtons';

const Drinks = () => {
  const { drinks, handleDrinks, isIngredient } = useContext(RecipeContext);
  const [categories, setCategories] = useState([]);
  const [wasClicked, setWasClicked] = useState({});

  const CARD_LIMT = 12;

  const fetchCategories = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const { drinks: categoriesArr } = await response.json();
    const BUTTONS_QUANTITY = 5;
    setCategories(categoriesArr.slice(0, BUTTONS_QUANTITY));
  };

  const handleButton = (category) => {
    if (wasClicked[category] || category === 'All') {
      handleDrinks('NAME');
    } else {
      handleDrinks('CATEGORY', category);
    }
    setWasClicked({ [category]: !wasClicked[category] });
  };

  useEffect(() => {
    if (!isIngredient) {
      handleDrinks('NAME');
      fetchCategories();
    }
  }, []);

  if (drinks === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <>
      <Header />
      <CategoriesButtons categories={ categories } callback={ handleButton } />
      { !!drinks && drinks.slice(0, CARD_LIMT).map((drink, i) => (
        <RecipeCard
          key={ i }
          index={ i }
          name={ drink.strDrink }
          img={ drink.strDrinkThumb }
          idMeal={ drink.idDrink }
          type="bebidas"
        />
      )) }
      <Footer />
    </>
  );
};

export default Drinks;
