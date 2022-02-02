import React, { useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionsCardProps } from "../../components/TransactionCard";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const [data, setData] = useState<DataListProps[]>([]);

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : []

        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

        const date = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).format(new Date(item.date));

        return {
            id: item.id,
            name: item.name,
            amount,
            type: item.type,
            category: item.category,
            date
        }

    });

    setData(transactionsFormatted);

    }

    useEffect(() => {
        loadTransactions();
    }, [])

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

