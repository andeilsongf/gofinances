import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Apple from '../../assets/apple.svg';
import Google from '../../assets/google.svg';
import Logo from '../../assets/logo.svg';

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
    const { user, signInWithGoogle, signInWithApple } = useAuth();
    
    async function handleSignInWithGoogle() {
        try {
        await signInWithGoogle();
    } catch (error) {
        console.log(error);
        Alert.alert('Não foi possível conectar com a conta Google');
        }
    }

    async function handleSignInWithApple() {
        try {
        await signInWithApple();
    } catch (error) {
        console.log(error);
        Alert.alert('Não foi possível conectar com a conta Apple');
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

                <SignInSocialButton 
                title='Entrar com Apple'
                svg={Apple}
                onPress={handleSignInWithApple}
                />


                </FooterWrapper>
            </Footer>

        </Container>
    )
}