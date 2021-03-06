import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FavoritesCard from '../components/FavoritesCard';
import FilterButtons from '../components/FilterButtons';

const FavoritesRecipes = () => {
  const [favorites, setFavorites] = useState([]);

  const removeFavorite = (id2) => {
    const newFavorites = favorites.filter(({ id }) => id !== id2);
    setFavorites(newFavorites);
  };

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const filterBy = ({ target: { name } }) => {
    const favoriteData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    switch (name) {
    case 'Food':
      setFavorites(favoriteData.filter(({ type }) => type === 'comida'));
      break;
    case 'Drinks':
      setFavorites(favoriteData.filter(({ type }) => type === 'bebida'));
      break;
    case 'All':
      setFavorites(favoriteData);
      break;
    default:
      break;
    }
  };

  return (
    <>
      <Header />
      <FilterButtons callback={ filterBy } />
      { favorites && favorites.map((fav, i) => (
        <div key={ i }>
          <FavoritesCard
            area={ (fav.type === 'comida') ? fav.area : fav.alcoholicOrNot }
            img={ fav.image }
            index={ i }
            name={ fav.name }
            category={ fav.category }
            type={ fav.type }
            id={ fav.id }
            callback={ removeFavorite }
          />
        </div>
      )) }
    </>
  );
};

export default FavoritesRecipes;
