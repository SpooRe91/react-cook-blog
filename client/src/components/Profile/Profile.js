import { Link } from "react-router-dom"

export const Profile = () => {
    return (
        <>
            <title>Profile - Martin Bogdanov {/* should be profile name of the user */}</title>

            <div className="profile">
                <h1 className="already-reg">Martin Bogdanov</h1>
                <div>
                    <a className="meal-image-link" style={{ "display": "inline-block", "lineHeight": 1 }} href=" https://avatars.githubusercontent.com/u/85784810?s=400&u=575287644400378b5bfb641dd8484aa03d2fe063&v=4" target={"_blank"} rel="noreferrer">
                        <img className="meal-image-link" src="https://avatars.githubusercontent.com/u/85784810?s=400&u=575287644400378b5bfb641dd8484aa03d2fe063&v=4" id="profile-photo" alt="#" /></a>
                    <div>
                        <div className="contents-after-sidebar"><h2>My posts</h2>
                            <div className="sidebar-item"><span dir="ltr"><a href="http://mbcookinglife.blogspot.com/" target={"_blank"} rel="noreferrer">Martin's cooking life</a></span></div>
                            <div className="section-divider"></div>

                            <article>
                                <h1 className="recipe-diff-count" style={{ "color": "white" }}><strong>General information:</strong></h1>

                                <p className="recipe-diff-count" style={{ "color": "wheat" }}><strong>Пол:</strong>
                                    <span style={{ "color": "white" }}>
                                        Male
                                    </span>
                                </p>

                                <p className="recipe-diff-count" style={{ "color": "wheat" }}><strong>Хобита:</strong>
                                    <span style={{ "color": "white" }}>
                                        Cooking, Sports, Movies, PC Games, Music
                                    </span>
                                </p>

                                <p className="recipe-diff-count" style={{ "color": "wheat" }}><strong>Длъжност/Работа:</strong>
                                    <span style={{ "color": "white" }}>
                                        Главен готвач
                                    </span>
                                </p>

                                <p className="recipe-diff-count" style={{ "color": "wheat" }}><strong>Относно:</strong>
                                    <span style={{ "color": "white" }}>
                                        Здравейте, аз съм Мартин и съм човек!
                                    </span>
                                </p>

                            </article>
                        </div>
                    </div>
                </div>
                <Link className="maia-button maia-button-primary" to="/auth/edit-profile">Edit Profile</Link>
            </div >
        </>
    )
}

