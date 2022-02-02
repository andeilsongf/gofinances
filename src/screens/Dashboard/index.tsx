import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionsCardProps } from "../../components/TransactionCard";

import {
     Container,
     Header,
     UserWrapper,
     UserInfo,
     Photo,
     User,
     UserGrettings,
     UserName,
     Icon,
     HighlightCards,
     Transactions,
     Title,
     TransactionList,
     LogoutButton
 } from './styles';

 export interface DataListProps extends TransactionsCardProps {
     id: string;
 }

export function Dashboard(){

    const data: DataListProps[] = [
        {
        id: '1',
        type: 'positive',
        title:"Desenvolvimento de site",
        amount:"R$ 12.000,00",
        category:{
            name: "Vendas",
            icon: "dollar-sign",
        },
        date:"13/04/2020"
    },
    {
        id: '2',
        type: 'negative',
        title:"Hamburgueria Pizzy",
        amount:"R$ 59,00",
        category:{
            name: "Alimentação",
            icon: "coffee",
        },
        date:"10/04/2020"
    },
    {
        id: '3',
        type: 'negative',
        title:"Aluguel do apartamento",
        amount:"R$ 1.200,00",
        category:{
            name: "Casa",
            icon: "shopping-bag",
        },
        date:"13/04/2020"
    }
];

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri: 'https://scontent-gig2-1.cdninstagram.com/v/t51.2885-19/s150x150/121459497_1507648172760318_6704849184951364979_n.jpg?_nc_ht=scontent-gig2-1.cdninstagram.com&_nc_cat=106&_nc_ohc=ZVzfkXnXKN0AX-BX-un&tn=dkMcBp4QB3Pu3Lx3&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT9ijsF-jLk1xPzWbPEVls7hZY3acqaq1odAP-TDsFaJrQ&oe=6201BEA5&_nc_sid=7bff83'}}/>
                        <User>
                            <UserGrettings>Olá,</UserGrettings>
                            <UserName>Andeilson</UserName>
                        </User>
                    </UserInfo>
                    
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power" />
                    </LogoutButton>

                </UserWrapper>
            </Header>
       
         <HighlightCards>
                <HighlightCard type="up" title="Entrada" amount="R$ 17.400,00" lastTransaction="Última entrada dia 13 de abril"/>
                <HighlightCard type="down" title="Saídas" amount="R$ 1.259,00" lastTransaction="Última saída dia 03 de abril" />
                <HighlightCard type="total"  title="Total" amount="R$ 16.141,00" lastTransaction="01 à 16 de abril" />
         </HighlightCards>
 
        <Transactions>
            <Title>Listagem</Title>

            <TransactionList
            
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
            
            />

        </Transactions>
        

        </Container>
    );
}

