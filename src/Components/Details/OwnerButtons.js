export const OnwerButtons = (props) => {
    return (
        <>
            <a className="btn" href={`/edit/${props.meal._id}`}>Промени</a>
            <a className="btn" href={`/delete/${props.meal._id}`}>Изтрии</a>
            <a className="btn" href="/recipe/browse">Назад</a>
        </>
    );
}