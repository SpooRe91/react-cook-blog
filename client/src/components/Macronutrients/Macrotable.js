export const Macrotable = ({ name, water, protein, fat, carb, calories, value }) => {

    if (value === 0) value = 1

    return (
        <>
            {
                <tr>
                    <td className='row-name' name={name}>{name}</td>
                    <td className="row-values">{(water * value).toFixed(2)}</td>
                    <td className="row-values">{(protein * value).toFixed(2)}</td>
                    <td className="row-values">{(fat * value).toFixed(2)}</td>
                    <td className="row-values">{(carb * value).toFixed(2)}</td>
                    <td className='row-values'>{(calories * value).toFixed(2)}</td>
                </tr>

            }
        </>
    )

}