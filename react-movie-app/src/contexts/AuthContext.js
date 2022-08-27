import { createContext, useContext } from "react";
import UserPool from "../components/auth/UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const AuthContext = createContext();
function AuthProvider(props) {
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();

            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(session);
                    }
                });
            }
        });
    };

    const logOut = () => {
        const user = UserPool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    };

    const getRole = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();

            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject(err);
                    } else {
                        user.getUserAttributes((err, attributes) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(attributes[2].Value);
                            }
                        });
                    }
                });
            }
        });
    };

    const authicate = async (usName, pass) => {
        return await new Promise((resolve, reject) => {
            console.log(usName);
            const user = new CognitoUser({
                Username: usName,
                Pool: UserPool,
            });

            const authDetail = new AuthenticationDetails({
                Username: usName,
                Password: pass,
            });

            user.authenticateUser(authDetail, {
                onSuccess: (data) => {
                    console.log(data);
                    resolve(data);
                },
                onFailure: (err) => {
                    console.log(err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("New Password Required: " + data);
                    resolve(data);
                },
            });
        });
    };
    const value = { getSession, logOut, authicate, getRole };
    return (
        <AuthContext.Provider value={value} {...props}></AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (typeof context === "undefined")
        throw new Error("useAuth must be use in AuthProvider");
    return context;
}

export { useAuth, AuthProvider };
