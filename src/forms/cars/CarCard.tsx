import React from 'react';
import './CarCard.css';

type Car = {
    make: string;
    model: string;
    year: number;
    city_mpg: number;
    class: string;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    transmission: string;
};

interface CarCardProps {
    car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    return (
        <div className='car-card'>
            <p>Year: {car.year}</p>
            <p>Make: {car.make}</p>
            <p>Model: {car.model}</p>
            <p>Class: {car.class}</p>
            <p>Cylinders: {car.cylinders}</p>
            <p>Displacement: {car.displacement}</p>
            <p>Drive: {car.drive}</p>
            <p>Fuel Type: {car.fuel_type}</p>
            <p>City MPG: {car.city_mpg}</p>
        </div>
    );
};

export default CarCard;