export const Macrotable = ({ name, water, protein, fat, carb, calories, value, setErrorMessage }) => {

    return (
        <>
            {
                <tr>
                    <td name={name}>{name}</td>
                    <td>{(water * value).toFixed(2)}</td>
                    <td>{(protein * value).toFixed(2)}</td>
                    <td>{(fat * value).toFixed(2)}</td>
                    <td>{(carb * value).toFixed(2)}</td>
                    <td>{(calories * value).toFixed(2)}</td>
                </tr>

            }
        </>
    )

}