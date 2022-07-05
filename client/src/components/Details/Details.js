import { OnwerButtons } from "./OwnerButtons"

export const Details = () => {

    const meal = {
        name: "Mandja",
        image: "https://images.everydayhealth.com/images/healthy-meal-tips-for-type-2-diabetes-00-722x406.jpg",
        fullRecipe: "This is the full recipe",
        ingredients: "These are the ingredients",
        owner: true,
        _id: '1234567890'
    };

    return (
        <div className="details">
            <h1 className="already-reg">{meal.name}</h1>
            <a className="meal" href={meal.image} target="_blank" rel="noreferrer"><img className="meal" src={meal.image}
                alt="" /></a>
            {meal.owner !== undefined && meal.owner !== null
                ? <OnwerButtons meal={meal} />
                : <a className="btn" href="/recipe/browse">Назад</a>
            }
            <article className="recipe-details">
                <label htmlFor="ingredients">Необходими съставки:</label>
                <p className="recipe" name="ingredients"><span>{meal.ingredients}</span></p>
                <label htmlFor="ingredients">Рецепта:</label>
                <p className="recipe" name="ingredients"><span>{meal.fullRecipe}</span></p>
            </article>
        </div>
    );
}