import { Link } from "react-router-dom"

export const Profile = () => {
    return (
        //TODO: Title should hold the profile name
        <>
            <title>Profile - Martin Bogdanov {/* should be profile name of the user */}</title>

            <div  className="profile"><Link className="maia-button maia-button-primary" to="#/">Edit Profile</Link>
                <h1 className="already-reg">Martin Bogdanov</h1>
                <div>
                    <a classname="meal-image-link" style={{ "display": "inline-block", "line-height": 1 }} href=" https://avatars.githubusercontent.com/u/85784810?s=400&u=575287644400378b5bfb641dd8484aa03d2fe063&v=4" target={"_blank"} rel="noreferrer">
                        <img classname="meal-image-link" src="https://avatars.githubusercontent.com/u/85784810?s=400&u=575287644400378b5bfb641dd8484aa03d2fe063&v=4" id="profile-photo" alt="#" /></a>
                    <div>
                        <div className="contents-after-sidebar"><h2>My posts</h2>
                            <div className="sidebar-item"><span dir="ltr"><a href="http://mbcookinglife.blogspot.com/" target={"_blank"} rel="noreferrer">Martin's cooking life</a></span></div>
                            <div className="section-divider"></div>

                            <table className="about-me-table">
                                <caption className="about-me-table">General information:</caption>
                                <tbody><tr><th className="item-key">Gender</th>
                                    <td>MALE</td></tr>
                                    <tr><th className="item-key">Industry</th>
                                        <td><span className="role">Tourism</span></td></tr>
                                    <tr><th className="item-key">Occupation</th>
                                        <td><span className="role">Cook/Chef</span></td></tr>
                                    <tr><th className="item-key">Location</th>
                                        <td><span className="locality">Varna,</span>
                                            <span className="country-name">Bulgaria</span></td></tr>
                                    <tr><th className="item-key">Introduction</th>
                                        <td>My name is Martin, I am a professional chef, and I would like to share some of my favorite dishes with you.</td></tr>
                                    <tr><th className="item-key">Interests</th>
                                        <td><span className="favorites">Cooking, Sports, Movies, PC Games, Music</span></td></tr>
                                </tbody></table>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

