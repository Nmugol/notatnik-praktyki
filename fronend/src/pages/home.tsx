import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigator = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showAccount, setShowAccount] = useState(true);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigator("/project");
        }
    }, [navigator]);

    function saveUser(token: string, user_id: string) {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user_id", JSON.stringify(user_id));
        const timer = setTimeout(() => {
            navigator("/project");
        }, 1200);

        return () => clearTimeout(timer);
    }

    useEffect(() => {
        if (message) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
                setMessage("");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    function createUser() {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (password.length === 0 || name.length === 0) {
            setMessage("Nazwa i hasło nie może być puste.");
            return;
        }
        if (!regex.test(password)) {
            setMessage(
                "Hasło musi składać się z minimum 8 znaków, jednej wielkiej litery, jednego znaku specjalnego i jednej cyfry."
            );
            return;
        }
        const fetchData = async () => {
            const response = await fetch("http://127.0.0.1:5000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("User created successfully");
                saveUser(data.token, data.id);
            } else {
                setMessage(data.message);
            }
        };

        fetchData();
    }

    function loginUser() {
        const fetchData = async () => {
            const response = await fetch("http://127.0.0.1:5000/user_login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, password }),
            });
            if (response.ok) {
                const data = await response.json();
                setMessage("Login Successful");
                saveUser(data.token, data.id);
            } else {
                setMessage(
                    "Login Failed. Username or password is incorrect. Please try again."
                );
            }
        };

        fetchData();
    }

    return (
        <div className="home">
            <div
                className={
                    showAccount ? "blob blob-login" : "blob blob-register"
                }
            ></div>
            <div className="login">
                <div className={showAccount ? "active" : "inactive active"}>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="login-button" onClick={() => loginUser()}>Login</button>
                    <div className="link-container">
                        <div>Don't have an account?</div>
                        <div>
                            <button
                                onClick={() => setShowAccount(!showAccount)}
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                </div>

                <div className={showAccount ? "inactive active" : "active"}>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div>
                        <button className="login-button" onClick={() => createUser()}>
                            Create Account
                        </button>
                        <div className="link-container">
                            <div>Already have an account?</div>
                        <button onClick={() => setShowAccount(!showAccount)}>
                            Login
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={showMessage ? "message" : "inactive"}>
                {message}
            </div>
        </div>
    );
}
