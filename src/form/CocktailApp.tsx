"use client";
import React, { useState, useEffect, useTransition } from 'react';
import { RecipeType } from './CocktailTypes';
import IngredientCard from './IngredientCard';
import RecipeCard from './RecipeCard';
import './CocktailApp.css';
import { start } from 'repl';


export const CocktailApp = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    // Equivalent to Svelte's reactive statement for logging ingredients changes
    useEffect(() => {
        console.log(ingredients);
    }, [ingredients]);

    const addIngredientField = () => {
        setIngredients(prevIngredients => [...prevIngredients, '']);
    };

    const editIngredient = (index: number, newIngredient: string) => {
        setIngredients(prevIngredients => prevIngredients.map((ingredient, i) => i === index ? newIngredient : ingredient));
    }

    const removeIngredient = (index: number) => {
        setIngredients(prevIngredients => prevIngredients.filter((_, i) => i !== index));
    };

    const fetchCocktails = async () => {
        startTransition(async() => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            try {
                const response = await fetch(
                    `https://api.api-ninjas.com/v1/cocktail?ingredients=${ingredients.join(',')}`, 
                    {
                        headers: { 'X-Api-Key': 'W+y19BJkxOROkRuXSumxeg==gTF60d4rnpVEv6mx' }
                    }
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecipes(data);
                console.log(data);
            } catch (error) {
                console.error('Fetch error:', error);
                setRecipes([]);
            }
        });
    };

    return (
        <div>
            <div className="button-options">
                <button onClick={fetchCocktails}>
                    <img src={'src/assets/cocktail.png'} alt='cocktail' className="icon-image"/>
                    Fetch cocktails
                </button>
            </div>

            <div className="grid-container">
                {ingredients.map((ingredient, i) => (
                    <IngredientCard 
                        key={`${i}`} 
                        ingredient={ingredient} removeIngredient={() => removeIngredient(i)} 
                        setIngredient={(newIngredient) => { editIngredient(i, newIngredient)} }
                    />
                ))}
                <div className="add-ingredient-card">
                    <button className="add-ingredient-button" onClick={addIngredientField}>+</button>
                </div>
            </div>
                
            {isPending ? (<p> Loading ...</p>) :
             recipes.length === 0 ? (
                <p>No recipes found</p>
                ) : (
                <p>Recipes found: {recipes.length}</p>
                )
            }
            {recipes.map((recipe, i) => (
                <RecipeCard key={`cocktail-recipe-${i}`} recipe={recipe} />
            ))}
        </div>
    );
};