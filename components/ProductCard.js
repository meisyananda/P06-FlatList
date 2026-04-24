// components/ProductCard.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProductCard = ({ item, isGrid }) => {
  return (
    <View style={[styles.card, isGrid ? styles.gridCard : styles.listCard]}>
      <Text style={styles.image}>{item.image}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.category}>{item.category.toUpperCase()}</Text>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, margin: 8, padding: 12, elevation: 3 },
  gridCard: { width: (width / 2) - 24 },
  listCard: { flexDirection: 'row', alignItems: 'center' },
  image: { fontSize: 40, marginRight: 10 },
  infoContainer: { flex: 1 },
  category: { fontSize: 10, color: '#888', fontWeight: 'bold' },
  name: { fontSize: 16, fontWeight: '600', color: '#333' },
  price: { fontSize: 14, color: '#007AFF', fontWeight: '700' },
  rating: { fontSize: 12, color: '#444', marginTop: 4 },
});

export default ProductCard;