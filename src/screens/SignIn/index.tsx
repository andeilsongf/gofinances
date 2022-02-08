import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Apple from '../../assets/apple.svg';
import Google from '../../assets/google.svg';
import Logo from '../../assets/logo.svg';
import { useTheme } from 'styled-components'

import { useAuth } from '../../hooks/auth'

import { SignInSocialButton } from '../../components/SignInSocialButton'

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles'

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle, signInWithApple } = useAuth();
    const theme = useTheme();
    
    async function handleSignInWithGoogle() {
        try {
        setIsLoading(true)
        return await signInWithGoogle();
    } catch (error) {
        console.log(error);
        Alert.alert('Não foi possível conectar com a conta Google');
        setIsLoading(false);
        } 

    }

    async function handleSignInWithApple() {
        try {
            setIsLoading(true)
           return await signInWithApple();
    } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar com a conta Apple');
            setIsLoading(false);
        }
    }



    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <Logo 
                    width={RFValue(120)}
                    height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de{'\n'}
                        forma simples
                    </Title>

                </TitleWrapper>

                <SignInTitle>
                    Faça seu login{'\n'}
                    com uma das contas abaixo
                </SignInTitle>

            </Header>

            <Footer>
                <FooterWrapper>
    
                <SignInSocialButton 
                    title='Entrar com Google'
                    svg={Google}
                    onPress={handleSignInWithGoogle}
                />

                {
                
                Platform.OS === 'ios' &&
                <SignInSocialButton 
                    title='Entrar com Apple'
                    svg={Apple}
                    onPress={handleSignInWithApple}
                />
                
                }

                </FooterWrapper>

            { isLoading && <ActivityIndicator
            color={theme.colors.shape}
            style={{
                marginTop: 18
            }}

            />}

            </Footer>

        </Container>
    )
}