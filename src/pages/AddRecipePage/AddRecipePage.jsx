import { React, useState, useEffect } from 'react';
import { PathInfo } from 'components/PathInfo/PathInfo';
import Container from "components/Container/Container";
import Loader from '../../components/Loader/Loader';
import MainTitle from "components/MainTitle/MainTitle";
import Subtitle from "components/Subtitle/Subtitle";
import AddRecipeForm from "components/AddRecipeForm/AddRecipeForm";
import Footer from 'components/Footer/Footer';

import s from './AddRecipePage.module.scss';

const AddRecipePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        })();
    }, []);

    return (
        <Container>
            <div>
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <>
                        <PathInfo currentPageName="ADD RECIPE" />
                        <div className={s.add_title_container}>
                            <MainTitle>Add Recipe</MainTitle>
                            <Subtitle>Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.</Subtitle>
                        </div>
                        <AddRecipeForm />
                    </>
                )}
        </div>
        <Footer />
        </Container>
    );
};

AddRecipePage.prototype = {};

export default AddRecipePage;
