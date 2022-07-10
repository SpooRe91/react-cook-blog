export const About = () => {
    return (
        <div className="already-reg">
            <h1 className="already-reg">Cook-blog by Martin Bogdanov about page</h1>
            <p className="about-text">
                "Cook-blog" is a basic SPA, created with React-app.
                It allows for CRUD operations by making AJAX requests to a custom REST Api. It was written by myself using with Express.js.
                The back-end is running on Node.js.
            </p>
            <p className="about-text">
                Please enjoy the SPA and don't hesitate to <strong>contact</strong> me for further
                suggestions at < span > <strong>m.bogdanov9110@gmail.com</strong></span >, or at:
                <a href="/about">Martin Bogdanov</a>
            </p>
        </div >);
}