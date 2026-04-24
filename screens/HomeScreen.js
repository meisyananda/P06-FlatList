// screens/HomeScreen.js
import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, Text, View, FlatList, TextInput, 
  TouchableOpacity, SafeAreaView, RefreshControl 
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { DATA_PRODUK, CATEGORIES } from '../data/products';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isGrid, setIsGrid] = useState(false);

  const filteredData = useMemo(() => {
    return DATA_PRODUK.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'Semua' || item.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyTitle}>Produk Tidak Ditemukan</Text>
      <Text style={styles.emptySubtitle}>Coba cari dengan kata kunci lain.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>GadgetShop</Text>
          <Text style={styles.productCount}>{filteredData.length} Produk ditampilkan</Text>
        </View>
        <TouchableOpacity onPress={() => setIsGrid(!isGrid)}>
          <Text style={styles.toggleText}>{isGrid ? "📱 List" : "⊞ Grid"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrapper}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Cari produk..."
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.categoryChip, category === item && styles.activeChip]}
              onPress={() => setCategory(item)}
            >
              <Text style={[styles.categoryText, category === item && styles.activeCategoryText]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        key={isGrid ? 'grid' : 'list'}
        numColumns={isGrid ? 2 : 1}
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} isGrid={isGrid} />}
        ListEmptyComponent={renderEmpty}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  appTitle: { fontSize: 22, fontWeight: 'bold', color: '#007AFF' },
  productCount: { fontSize: 12, color: '#666' },
  searchWrapper: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: '#DDD' },
  searchInput: { flex: 1, height: 40 },
  clearText: { fontSize: 18, color: '#888' },
  categoryList: { paddingHorizontal: 15, paddingVertical: 10 },
  categoryChip: { paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20, backgroundColor: '#EEE', marginRight: 8 },
  activeChip: { backgroundColor: '#007AFF' },
  categoryText: { fontSize: 13, color: '#444' },
  activeCategoryText: { color: '#FFF', fontWeight: 'bold' },
  toggleText: { color: '#007AFF', fontWeight: 'bold' },
  listContent: { paddingHorizontal: 10, paddingBottom: 20 },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyIcon: { fontSize: 50 },
  emptyTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  emptySubtitle: { color: '#888' }
});