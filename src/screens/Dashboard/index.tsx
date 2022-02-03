import React, {
    useCallback,
    useEffect,
    useState
} from "react";

import { ActivityIndicator } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components'

import { HighlightCard } from "../../components/HighlightCard";

import {
    TransactionCard,
    TransactionsCardProps
} from "../../components/TransactionCard";



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
     LogoutButton,
     LoadContainer
 } from './styles';

 export interface DataListProps extends TransactionsCardProps {
     id: string;
 }

 interface HighlightProps {
     amount: string;
 }

 interface HighlightData {
     entries: HighlightProps,
     expensives: HighlightProps
     total: HighlightProps
 }

export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : []

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

            if (item.type === 'positive') {
                entriesTotal += Number(item.amount)
            } else {
                expensiveTotal += Number(item.amount)  
            }

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

    setTransactions(transactionsFormatted);
    const total = entriesTotal - expensiveTotal;

    setHighlightData({
        entries: {
            amount: entriesTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        },
        expensives: {
            amount: expensiveTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        },
        total: {
            amount: total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}
        });

        setIsLoading(false);
    }

    useEffect(() => {
        loadTransactions();

    }, [])

    useFocusEffect(useCallback(() => {
        loadTransactions ();
    },[]));

    return (
        <Container>
            {
                isLoading ?
                <LoadContainer>
                    <ActivityIndicator
                    color={theme.colors.primary}
                    size="large"
                    />
                </LoadContainer> : 
            <>
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
                        <HighlightCard type="up"
                        title="Entrada"
                        amount={highlightData.entries.amount}
                        lastTransaction="Última entrada dia 13 de abril"
                        />

                        <HighlightCard
                        type="down"
                        title="Saídas"
                        amount={highlightData.expensives.amount}
                        lastTransaction="Última saída dia 03 de abril"
                        />

                        <HighlightCard type="total"
                        title="Total"
                        amount={highlightData.total.amount}
                        lastTransaction="01 à 16 de abril"
                        />
                        
                </HighlightCards>
 
                <Transactions>
                    <Title>Listagem</Title>

                    <TransactionList
                    
                        data={transactions}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <TransactionCard data={item} />}
                    
                    />

                </Transactions>

                </>
            }

        </Container>
    );
}

