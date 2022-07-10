export const Profile = () => {
    return (
        <div className="already-reg"><a className="maia-button maia-button-primary" href="#/">Edit Profile</a>
            <h1 className="already-reg">Martin Bogdanov</h1>
            <div><a><img className="already-reg" src="https://avatars.githubusercontent.com/u/85784810?s=400&u=575287644400378b5bfb641dd8484aa03d2fe063&v=4" id="profile-photo" alt="#" /></a>
                <p><a href="https://avatars.githubusercontent.com/u/85784810?s=400&u=575287644400378b5bfb641dd8484aa03d2fe063&v=4">View Full Size</a></p>
                <div>
                    <div className="contents-after-sidebar"><h2>My blogs</h2>
                        <ul><li className="sidebar-item"><span dir="ltr"><a href="http://mbcookinglife.blogspot.com/" target="null" rel="contributor-to nofollow">Martin's cooking life</a></span></li></ul>
                        <div className="section-divider"></div>

                        <h2>About me</h2><table>
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
        </div>
    )
}

