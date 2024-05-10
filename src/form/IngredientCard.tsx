"use client";
import React from 'react';
import './IngredientCard.css';

interface IngredientCardProps {
    ingredient: string;
    setIngredient: (ingredient: string) => void; // A function that updates the ingredient
    removeIngredient: () => void; // A function to remove the ingredient
    key: string;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, setIngredient, removeIngredient }) => {
    return (
        <button className="ingredient-card">
            <div className="card-header">
                <button className="x-button" onClick={removeIngredient}>-</button>
            </div>
            <img src="src/assets/bottle.png" alt="bottle" className="icon-image"/>
            <input 
                type="text"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
            />
        </button>
    );
};

export default IngredientCard;