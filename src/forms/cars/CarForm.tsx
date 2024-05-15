"use client";
import "./CarForm.css";
import React, { useActionState, useOptimistic, useState, useTransition } from 'react';

const CarForm: React.FC = () => {
    const [response, setResponse] = useState<any[]>([]);
    const [optimisticCars, setOptimisticCars] = useOptimistic<any[]>([]);

    const optiCars: any[] = [
        {
            "city_mpg": 23,
            "class": "compact car",
            "combination_mpg": 24,
            "cylinders": 4,
            "displacement": 1.6,
            "drive": "fwd",
            "fuel_type": "gas",
            "highway_mpg": 26,
            "make": "toyota",
            "model": "corolla",
            "transmission": "a",
            "year": 1993
          },
          {
            "city_mpg": 23,
            "class": "compact car",
            "combination_mpg": 26,
            "cylinders": 4,
            "displacement": 1.6,
            "drive": "fwd",
            "fuel_type": "gas",
            "highway_mpg": 31,
            "make": "toyota",
            "model": "corolla",
            "transmission": "m",
            "year": 1993
          }
    ];

    const fetchData = async (previousState: any, formData: FormData) => {
        console.log('previous state', previousState);
        setOptimisticCars(optiCars);
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            const response = await fetch(
                `https://api.api-ninjas.com/v1/cars?limit=2&make=${formData.get('make')}`, 
                {
                    headers: { 'X-Api-Key': 'W+y19BJkxOROkRuXSumxeg==gTF60d4rnpVEv6mx' }
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResponse(data);
            return null;
        } catch (error) {
            setResponse([])
            return 'Something went Wrong!!'
        }
    };

    const [error, submitAction, isPending] = useActionState(fetchData, null);

    return (
        <>
        <form action={submitAction}>
            <label>
                Make
                <input type="text" name={'make'} disabled={isPending} />
            </label>
            <button type="submit" disabled={isPending }>Submit</button>
            {error && (<text> {error} </text>)}
        </form>
        <div>
            {isPending && (
                <text> LOADING ... </text>
            )}
            <text className="header"> Actual REPSONSE </text>
            {(response) && (
                <text>{JSON.stringify(response, null, 2)}</text>
            )}

            <text className="header"> OPTIMISTIC REPSONSE </text>
            <text> {JSON.stringify(optimisticCars) }</text>
        </div>
        </>
    );
};

export default CarForm;