import React, {useCallback, useEffect, useRef, useState} from 'react';
import {api} from '../../services/Api';
import {debounce} from 'lodash';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

function UsersScreen() {
  const users = useRef([]);
  const [search, setSearch] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);

  const onFetchUsersData = async () => {
    try {
      const response = await api.get('https://randomuser.me/api/', {
        results: 500,
      });
      const results = response?.data?.results || [];
      setSearchedUsers(results);
      users.current = results;
    } catch (e) {
      console.log({...e, message: e?.message});
    }
  };

  useEffect(() => {
    onFetchUsersData();
  }, []);

  const filterSearch = term => {
    const lCaseTerm = term?.toLowerCase?.();
    if (lCaseTerm) {
      setSearchedUsers(
        users?.current?.filter(user => {
          const {name: {first = '', last = ''} = {}} = user || {};
          return (
            first?.toLowerCase?.()?.includes?.(lCaseTerm) ||
            last?.toLowerCase?.()?.includes?.(lCaseTerm)
          );
        }),
      );
    } else {
      setSearchedUsers(users.current);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(filterSearch, 400), []);

  const onChangeSearch = term => {
    setSearch(term);
    debounceSearch(term);
  };

  const keyExtractor = (item, index) => String(item?.email || index);

  const listHeaderComponent = () => {
    return (
      <View>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={onChangeSearch}
        />
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {
      email = '',
      name: {title = '', first = '', last = ''} = {},
      picture: {thumbnail = ''} = {},
    } = item || {};

    return (
      <View style={styles.item}>
        <FastImage
          style={styles.image}
          source={{uri: thumbnail}}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View>
          <Text>{`${title}. ${first} ${last}`}</Text>
          <Text>{email}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={searchedUsers}
        keyExtractor={keyExtractor}
        ListHeaderComponent={listHeaderComponent()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export default UsersScreen;
