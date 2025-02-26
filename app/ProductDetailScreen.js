/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, {useState, useCallback, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView, Image } from 'react-native';
import CardReview from '@/components/common/CardReview';
const ActivityIndicator = React.lazy(() =>
  import('@/components/common/ActivityIndicator'),
);
import ListHeader from '@/components/ListHeader';
import { isMobileWeb } from '@/components/screens';
import responseReviews from "@/data/reviews.json"; 
import { Tab, TabView } from 'react-native-elements-light';
import Colors from '@/components/Colors';
import { getAnalyze, getCompare } from '@/api/hackton';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from '@/components/layout';
import responseProductCompare from '@/data/product-compare.json';
import Product from '@/components/Product';
const ProductDetailScreen = (props) => {
  const dispatch = useDispatch();
  const statusApiReviews = 'succeeded';
  const product = useSelector((state) => state.hackathon.productPicked)
  const productCompare = responseProductCompare.data;
  const [indexTabActived, setIndexTabActived] = useState(0);

  useEffect(() => {
    const params ={};
    getAnalyze(product.id).then((response) => {

      const data = response.data.data;
      dispatch({
        type: 'hackathon/setEffects',
        data: data.effects,
      });

      dispatch({
        type: 'hackathon/setSummary',
        data: data.summary,
      });
    })
    .catch(() => {

    })
   
    getCompare(params).then((response) => {
      const data = response.data.data;
      dispatch({
        type: 'hackathon/setCompare',
        data: data,
      });
    })
    .catch(() => {

    })
  }, [])
 


  const ListFooterComponent = () => (
    <View style={{ padding: 16 }}>
      {statusApiReviews === 'pending' && <ActivityIndicator />}
    </View>
  );
  const ListEmptyComponent = () => {
    return (
      <View>
        {statusApiReviews === 'succeeded' && (
          <Text style={styles.modalText}>
            Maaf tidak ada review yang ditemukan
          </Text>
        )}
      </View>
    );
  };

  const renderItemHandler = ({ item, index }) => (
    <View
      style={styles.cardReviewContainer}
      key={`CardReviewContainer${item._id}`}>
      <CardReview key={`CardReview${item._id}`} review={item} />
    </View>
  );

  const keyExtractorHandler = (item, index) =>
    'keyExtractor' + index + item._id;
  const getItemLayoutHandler = (data, index) => ({
    length: 215,
    offset: 215 * index,
    index,
  });

  const onMoveShouldSetResponder = useCallback((e) => {
    e.stopPropagation();
  }, []);


  return (
    <SafeAreaView style={styles.wrapper}>
      <Tab
        value={indexTabActived}
        onChange={setIndexTabActived}
        indicatorStyle={styles.indicatorStyle}
      >
        {['Bestie Review', 'Comparison'].map((title, index) => (
          <Tab.Item
            key={index}
            containerStyle={styles.tabItemContainer}
            buttonStyle={styles.tabItemButtonStyle}
            titleStyle={[
              styles.tabItemTitleStyle,
              indexTabActived === index
                ? styles.tabItemTitleActiveStyle
                : {},
            ]}
            title={title}
          />
        ))}
      </Tab>

      <TabView
        animationType="timing"
        value={indexTabActived}
        onChange={setIndexTabActived}
        keyboardShouldPersistTaps="handled"
      >
        <TabView.Item
          style={styles.tabViewItem}
          onMoveShouldSetResponder={onMoveShouldSetResponder}
        >
          <ScrollView>

            <FlatList
              data={responseReviews.data}
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={500}
              ListHeaderComponent={ListHeader}
              ListFooterComponent={ListFooterComponent}
              ListEmptyComponent={ListEmptyComponent}
              initialNumToRender={10}
              renderItem={renderItemHandler}
              keyExtractor={keyExtractorHandler}
              getItemLayout={getItemLayoutHandler}
              onEndReachedThreshold={0.9}
              noFooter={isMobileWeb}
            />

          </ScrollView>
        </TabView.Item>

        <TabView.Item
          style={[
            styles.tabViewItem,
          ]}
          onMoveShouldSetResponder={onMoveShouldSetResponder}
        >
          {indexTabActived === 1 && (
            <ScrollView>
              <View style={{marginVertical: 20, paddingHorizontal: 10, flex: 1}}>
                <Row>
                  {productCompare.map((product) =>
                    <Col xs={4} cssStyle={`margin-bottom: 12px`}>
                      <View style={{minHeight: 400}}>
                        <Product productData={product} isShowRating={true} isShowAddToBag={false} />
                      </View>
                     
                      <Row gutterWidth={0} cssStyle={`margin-bottom: 12px`}>
                        <Col xs={12} gutterWidth={0}>
                          <Text style={styles.modalText}>Kulit Kering</Text>
                          <View style={styles.box}>
                            <Text>25%</Text>
                          </View>
                        </Col>
                      </Row>

                      <Row gutterWidth={0} cssStyle={`margin-bottom: 12px`}>
                        <Col xs={12} gutterWidth={0}>
                          <Text style={styles.modalText}>Kulit Normal</Text>
                          <View style={styles.box}>
                            <Text style={styles.modalTextGreen}>85%</Text>
                          </View>
                        </Col>
                      </Row>

                      <Row gutterWidth={0} cssStyle={`margin-bottom: 12px`}>
                        <Col xs={12} gutterWidth={0}>
                          <Text style={styles.modalText}>Kulit Berminyak</Text>
                          <View style={styles.box}>
                            <Text>25%</Text>
                          </View>
                        </Col>
                      </Row>

                      <Row gutterWidth={0} cssStyle={`margin-bottom: 12px`}>
                        <Col xs={12} gutterWidth={0}>
                          <Text style={styles.modalText}>Kulit Kombinasi</Text>
                          <View style={styles.box}>
                            <Text>15%</Text>
                          </View>
                        </Col>
                      </Row>
                    </Col>
                  )}
                </Row>
              </View>
               
            </ScrollView>
          )}
        </TabView.Item>
      </TabView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FFDCE8',
    height: 32,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper :{
    flex: 1,
  },
  modalText: {
    fontFamily: 'satoshi-medium',
    fontSize: 13,
    lineHeight: 23,
    color: '#404040',
    marginBottom: 4,
  },
  modalTextGreen: {
    color: '#1F9A07'
  },
  cardReviewContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey4,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  indicatorStyle: {
    backgroundColor: '#FFDCE8',
    height: 4,
  },
  tabItemButtonStyle: {
    backgroundColor: Colors.white,
    marginHorizontal: 10,
  },
  tabItemContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 4,
    borderBottomColor: Colors.grey0,
  },
  tabItemTitleStyle: {
    fontFamily: 'satoshi-bold',
    fontSize:  12,
    color: Colors.grey6,
    lineHeight: 16,
    textTransform: 'none',
    whiteSpace: 'nowrap',
  },
  tabItemTitleActiveStyle: {
    color: '#000000',
    fontFamily: 'satoshi-black',
    fontSize: 12,
  },
  tabViewItem: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
});

export default ProductDetailScreen;
