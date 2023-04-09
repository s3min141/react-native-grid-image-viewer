import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  ScrollView,
  Platform,
  NativeModules,
  BackHandler,
  ActivityIndicator
} from 'react-native';
import Cross from './Cross';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GridImageView = ({
  data,
  headers = null,
  renderGridImage = null,
  renderModalImage = null,
  transparent = 0.8,
  customOnPress = null,
  heightOfGridImage = Dimensions.get('window').height / 5.5,
}) => {
  const [modal, setModal] = useState({ visible: false, data: 0 });
  const [isLoadingRow1, setIsLoadingRow1] = useState(false);
  const [isLoadingRow2, setIsLoadingRow2] = useState(false);
  const [isLoadingRow3, setIsLoadingRow3] = useState(false);
  const ref = useRef();
  var key = 0;

  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT - 20;
  const [height, setHeight] = useState(STATUSBAR_HEIGHT);

  const onCloseModal = () => {
    setModal({ visible: false, data: 0 });
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((statusBarHeight) => {
        setHeight(statusBarHeight.height);
      });
    }
    BackHandler.addEventListener('hardwareBackPress', onCloseModal);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onCloseModal);
    };
  }, []);

  const Component = ({ style = { flex: 1 } }) => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        ref={ref}
        style={{ ...style }}
        snapToInterval={Dimensions.get('window').width}
        decelerationRate="fast"
        pagingEnabled
        horizontal>
        {data.map((item, key) => (
          <View key={key}>
            {renderModalImage !== null ? (
              renderModalImage(item, {
                ...styles.img_modal,
                backgroundColor: `rgba(0, 0, 0, ${transparent})`,
              })
            ) : (
              <>
                <ActivityIndicator size='large' style={{ position: 'absolute', left: wp(45), top: hp(45) }} color="rgb(111, 144, 58)" />
                <Image
                  style={{
                    ...styles.img_modal,
                    backgroundColor: `rgba(0, 0, 0, ${transparent})`,
                  }}
                  source={{
                    uri: item,
                    ...(headers == null || headers == undefined || headers == {}
                      ? {}
                      : { method: 'POST', headers }), cache: "reload"
                  }}
                />
              </>
            )}
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.background}>
      <Modal
        // propagateSwipe={true}
        animationType="slide"
        transparent={true}
        visible={modal.visible}
        onRequestClose={onCloseModal}>
        <Component />

        <View style={{ ...styles.cross, top: height + 5 }}>
          <TouchableOpacity
            onPress={() => {
              setModal({ visible: false, data: 0 });
            }}>
            <Cross />
          </TouchableOpacity>
        </View>
      </Modal>

      <FlatList
        contentContainerStyle={{ paddingBottom: 40 }}
        data={data}
        renderItem={({ index }) => {
          if (data.length <= index * 3) {
            return null;
          }

          return (
            <View style={styles.unit}>
              <View style={[styles.unit_item, { height: heightOfGridImage }]}>
                {(isLoadingRow1 && data[index * 3] !== undefined) && (<ActivityIndicator size='large' style={{ padding: 10 }} color="rgb(111, 144, 58)" />)}
                {data.length > index * 3 ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (customOnPress === null) {
                        setModal({ visible: true, data: index * 3 });
                        setTimeout(() => {
                          ref.current.scrollTo({
                            x: Dimensions.get('window').width * index * 3,
                            y: 0,
                            animated: false,
                          });
                        }, 1);
                      }
                      else {
                        customOnPress(index * 3);
                      }
                    }}
                    style={[styles.unit_item, { height: heightOfGridImage }]}>
                    {renderGridImage !== null ? (
                      renderGridImage(data[index * 3], styles.img)
                    ) : (
                      <Image
                        style={styles.img}
                        onLoadStart={() => { setIsLoadingRow1(true); }}
                        onLoadEnd={() => { setIsLoadingRow1(false); }}
                        source={{
                          uri: data[index * 3],
                          ...(headers == null ||
                            headers == undefined ||
                            headers == {}
                            ? {}
                            : { method: 'POST', headers }), cache: "reload"
                        }}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={[styles.unit_item, { height: heightOfGridImage }]}>
                {(isLoadingRow2 && data[index * 3 + 1] !== undefined) && (<ActivityIndicator size='large' style={{ padding: 10 }} color="rgb(111, 144, 58)" />)}
                {data.length > index * 3 + 1 ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (customOnPress === null) {
                        setModal({ visible: true, data: index * 3 + 1 });

                        setTimeout(() => {
                          ref.current.scrollTo({
                            x: Dimensions.get('window').width * (index * 3 + 1),
                            y: 0,
                            animated: false,
                          });
                        }, 1);
                      }
                      else {
                        customOnPress(index * 3 + 1);
                      }
                    }}
                    style={[styles.unit_item, { height: heightOfGridImage }]}>
                    {renderGridImage !== null ? (
                      renderGridImage(data[index * 3 + 1], styles.img)
                    ) : (
                      <Image
                        style={styles.img}
                        onLoadStart={() => { setIsLoadingRow2(true); }}
                        onLoadEnd={() => { setIsLoadingRow2(false); }}
                        source={{
                          uri: data[index * 3 + 1],
                          ...(headers == null ||
                            headers == undefined ||
                            headers == {}
                            ? {}
                            : { method: 'POST', headers }), cache: "reload"
                        }}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={[styles.unit_item, { height: heightOfGridImage }]}>
                {(isLoadingRow3 && data[index * 3 + 2] !== undefined) && (<ActivityIndicator size='large' style={{ padding: 10 }} color="rgb(111, 144, 58)" />)}
                {data.length > index * 3 + 2 ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (customOnPress === null) {
                        setModal({ visible: true, data: index * 3 + 2 });

                        setTimeout(() => {
                          ref.current.scrollTo({
                            x: Dimensions.get('window').width * (index * 3 + 2),
                            y: 0,
                            animated: false,
                          });
                        }, 1);
                      }
                      else {
                        customOnPress(index * 3 + 2);
                      }
                    }}
                    style={[styles.unit_item, { height: heightOfGridImage }]}>
                    {renderGridImage !== null ? (
                      renderGridImage(data[index * 3 + 2], styles.img)
                    ) : (
                      <Image
                        style={styles.img}
                        onLoadStart={() => { setIsLoadingRow3(true); }}
                        onLoadEnd={() => { setIsLoadingRow3(false); }}
                        source={{
                          uri: data[index * 3 + 2],
                          ...(headers == null ||
                            headers == undefined ||
                            headers == {}
                            ? {}
                            : { method: 'POST', headers }), cache: "reload"
                        }}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => {
          key++;
          return key.toString();
        }}
        style={styles.flatlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
  },
  unit: {
    flexDirection: 'row',
  },
  unit_item: {
    margin: 1.5,
    flex: 1
  },
  img: {
    flex: 1,
  },
  img_modal: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
  cross: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
  },
});

export default GridImageView;
