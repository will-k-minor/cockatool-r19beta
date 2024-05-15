"use client";
import React from 'react';
import { RecipeType } from './CocktailTypes';
import './RecipeCard.css';

interface RecipeCardProps {
    recipe: RecipeType;
    key: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, key }) => {
    return (
        <div className="card" key={key}>
            <h2 className="recipe-name">{recipe.name.toUpperCase()}</h2>
            <ul>
                {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
        </div>
    );
};

export default RecipeCard;
