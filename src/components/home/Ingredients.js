import React from 'react';
import { motion } from 'framer-motion';
import { ingredients } from '../../utility/data';

const IngredientCard = ({ title, description, image, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
        >
            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl"
            >
                <div 
                    className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            </motion.div>
            
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                    {title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

const Ingredients = () => {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-black py-20 px-4 md:px-8">
            <div className="container mx-auto max-w-6xl">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl font-bold text-center text-white mb-16"
                >
                    {ingredients.title}
                </motion.h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {ingredients.items.map((ingredient, index) => (
                        <IngredientCard 
                            key={index}
                            {...ingredient}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Ingredients;