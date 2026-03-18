import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';

type Product = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
};

const HomeScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [total, setTotal] = useState(0);

    const [pagination, setPagination] = useState({
        limit: 10,
        skip: 0,
    });

    const fetchProducts = async () => {
        if (isFetchingMore) return;

        setIsFetchingMore(true);

        try {
            const res = await fetch(
                `https://dummyjson.com/products?limit=${pagination.limit}&skip=${pagination.skip}`
            );

            if (!res.ok) throw new Error('Failed');

            const data = await res.json();

            setProducts((prev) => [...prev, ...data.products]);
            setTotal(data.total);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
        }
    };

    const loadMore = () => {
        if (isFetchingMore || products.length >= total) return;

        setPagination((prev) => ({
            ...prev,
            skip: prev.skip + prev.limit,
        }));
    };

    useEffect(() => {
        fetchProducts();
    }, [pagination]);

    if (loading) return <LoadingScreen />;

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                        <Image source={{ uri: item.thumbnail }} style={styles.image} />
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.price}>₹ {item.price}</Text>
                    </TouchableOpacity>
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetchingMore ? (
                        <View style={{ padding: 16 }}>
                            <LoadingScreen />
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 12,
    },
    card: {
        backgroundColor: '#f5f5f5',
        marginVertical: 8,
        padding: 12,
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    title: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    price: {
        marginTop: 4,
        fontSize: 14,
        color: 'green',
    },
});