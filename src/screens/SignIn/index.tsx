import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Apple from '../../assets/apple.svg';
import Google from '../../assets/google.svg';
import Logo from '../../assets/logo.svg';

import { AuthContext } from '../../AuthContext'

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
    const data = useContext(AuthContext);
    console.log(data)

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
                />

                <SignInSocialButton 
                title='Entrar com Apple'
                svg={Apple}
                />


                </FooterWrapper>
            </Footer>

        </Container>
    )
}