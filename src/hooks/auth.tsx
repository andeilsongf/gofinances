import React, {
    createContext,
    ReactNode,
    useContext,
    useState
} from 'react';

import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>
    signInWithApple(): Promise<void>
}


const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);

    async function signInWithGoogle() {
        try {

        const result = await Google.logInAsync({
            iosClientId: '538761943284-8tntkc2tjrs6amcpkllmfd2oiep35nfm.apps.googleusercontent.com',
            androidClientId: '538761943284-n5tv3rbofl9l38no1q8u599nbkud238q.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        });
        
        if(result.type === 'success') {
            const userLogged = {
                id: String(result.user.id),
                email: result.user.email!,
                name: result.user.name!,
                photo: result.user.photoUrl!
            };

            setUser(userLogged);
            await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));

            }

        } catch(error) {
            throw new Error(error);
        }
    }

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            if(credential) {
                const userLogged = {
                id: String(credential.user),
                email: credential.email!,
                name: credential.fullName!.givenName!,
                photo: undefined
                };

                setUser(userLogged);
                await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    return(
    <AuthContext.Provider value={{
        user,
        signInWithGoogle,
        signInWithApple
    }}>
        {children}
    </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }