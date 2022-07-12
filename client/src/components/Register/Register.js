import { useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../API/api";
import { userRegister } from "../../services/userService";

export const Register = ({ setUser, setErrorMessage }) => {

    let navigate = useNavigate();

    const registerHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const { email, password, rePassword } = Object.fromEntries(formData);

        userRegister({ email, password, rePassword })
            .then(res => {
                console.log(res);
                if (res.token) {
                    setSession(res.email, res.token, res.id);
                    navigate('/recipe/browse');
                    return setUser(previous => getSession());
                } else {
                    setErrorMessage({ error: res.message });
                    throw new Error(res.message);
                }
            });
    }

    return (
        <div className="register-form">
            <h3 className="already-reg">Регистрация</h3>
            <form method="POST" onSubmit={registerHandler}>
                <label className="already-reg" htmlFor="email">e-mail</label>
                <input type="text" className="email" name="email" placeholder="e-mail..." required />

                <label className="already-reg" htmlFor="password">парола</label>
                <input type="password" className="password" name="password" placeholder="парола..." required />

                <label className="already-reg" htmlFor="rePassword">повторете паролата</label>
                <input type="password" className="rePassword" name="rePassword" placeholder="повторете паролата..." required />

                <input className="already-reg" type="submit" value="Регистриране" />
            </form>
            <h3 className="already-reg">Вече сте регистрирани?<a href="/auth/login">Влезте от тук!</a></h3>
        </div>);
}