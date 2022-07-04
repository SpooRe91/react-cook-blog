export const AddRecipe = (props) => {
    return (
        <div className="form">
            <h1 className="already-reg">Добави рецепта</h1>
            <form method="POST">
                <label htmlFor="name">Име</label>
                <input type="text" name="name" required value={props.name} />
                <label htmlFor="image">Снимка</label>
                <input type="text" name="image" required value={props.image} />
                <label htmlFor="fullRecipe">Пълна рецепта</label>
                <textarea type="text" name="fullRecipe" wrap="soft" required>{props.fullRecipe}</textarea>
                <label htmlFor="ingredients">Необходими продукти</label>
                <textarea type="text" name="ingredients" required>{props.ingredients}</textarea>
                <input type="submit" value="Създай" />
            </form>
        </div>
    );
}