import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  ActivityIndicator,
  Dimensions,
  Text,
  PermissionsAndroid,
  Alert,
  Pressable,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import RNFetchBlob from 'rn-fetch-blob';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import DatePicker from 'react-native-date-picker';
import {Button, FAB, IconButton} from 'react-native-paper';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import moment from 'moment';

import {UserContext} from '../context/UserProvider';
import AppText from '../components/AppText';
import Constraints from '../utils/Constraints';
import colors from '../colors';
import OrderCard from '../components/OrderCard';
import PaymentCard from '../components/PaymentCard';

const ViewOrders = ({route}) => {
  const {displayName} = useContext(UserContext);

  const {width} = Dimensions.get('screen');

  const [Orders, setOrders] = useState([]);
  const [Items, setItems] = useState([]);
  const [OrderItems, setOrderItems] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [IsVisible, setIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisiblepdf, setIsModalVisiblepdf] = useState(false);
  const [Message, setMessage] = useState('');
  const [filePath, setFilePath] = useState('');

  const [Payments, setPayments] = useState([]);

  const [StartDate, setStartDate] = useState(
    moment(new Date())
      .subtract(moment().get('date') - 1, 'days')
      .toDate(),
  );
  const [EndDate, setEndDate] = useState(new Date());
  const [Endopen, setEndOpen] = useState(false);
  const [Startopen, setStartOpen] = useState(false);
  // const [Ordertr, setOrdertr] = useState('');
  // const [Paymenttr, setPaymenttr] = useState('');

  var Ordertr = '';
  var Paymenttr = '';

  useEffect(() => {
    if (route.params != undefined) {
      setLoading(true);
      getOrders();
      getPayments();
    }
  }, [route.params]);

  useEffect(() => {
    getdata();
  }, [Orders]);

  const getOrders = () => {
    firestore()
      .collection('Users')
      .doc(displayName)
      .collection('Orders')
      .where('CustomerId', '==', route.params.key)
      .where('Date', '<=', moment(EndDate).format('YYYYMMDDHHmmss'))
      .where('Date', '>=', moment(StartDate).format('YYYYMMDDHHmmss'))
      .get()
      .then(querySnapshot => {
        const orders = [];
        querySnapshot.forEach(documentsnapshot => {
          // console.log('documentsnapshot', documentsnapshot);
          // console.log('documentsnapshot.data()', documentsnapshot.data());

          orders.push({
            ...documentsnapshot.data(),
            OrderId: documentsnapshot.id,
          });
        });

        setLoading(false);
        const filteredOrders = orders.filter(
          data => data.Haste !== 'Previes Month Due',
        );
        setOrders(filteredOrders);
        // console.log('get orders data ', filteredOrders);
      });
  };
  
  // console.log('orders array data', Orders);
  const getPayments = () => {
    firestore()
      .collection('Users')
      .doc(displayName)
      .collection('Payment')
      .where('CustomerId', '==', route.params.key)
      .where(
        'Date',
        '<=',
        moment(EndDate)
          .set({hour: 23, minute: 59, second: 59})
          .format('YYYYMMDDHHmmss'),
      )
      .where(
        'Date',
        '>=',
        moment(StartDate)
          .set({hour: 0, minute: 0, second: 0})
          .format('YYYYMMDDHHmmss'),
      )
      .get()
      .then(querySnapshot => {
        const payments = [];
        querySnapshot.forEach(documentsnapshot => {
          console.log('documentsnapshot', documentsnapshot);
          console.log('documentsnapshot.data()', documentsnapshot.data());

          payments.push({
            ...documentsnapshot.data(),
            PaymentId: documentsnapshot.id,
          });
        });

        setPayments(payments);
        setLoading(false);
      });
  };

  const getOrdertr = () => {
    if (Orders != undefined) {
      const ordertr = Orders.map(item => {
        return (
          '<div class="order-table"><div style="flex: auto;"><h1 class="haste">Haste:</h1><p>' +
          item.Haste +
          '</p>' +
          '<div class="field-container"><div class="flex"><p class="field">Date:</p><p>' +
          item.OrderDate +
          '</p>' +
          '</div><div class="flex"><p class="field">Total:</p><p>' +
          item.Ammount +
          '</p></div></div></div>' +
          '<div class="itemtable"><h1 class="items">Items</h1><table><tr class="th"><th>Name</th><th>Quantity</th><th>Price</th><th>Total</th></tr>' +
          item.Items.map(orderitem => {
            const Total =
              parseInt(orderitem.price) * parseInt(orderitem.quantity);
            return (
              '<tr class="tdr"><td>' +
              orderitem.value +
              '</td><td>' +
              orderitem.quantity +
              '</td><td>' +
              orderitem.price +
              '</td><td>' +
              Total +
              '</td></tr>'
            );
          }) +
          '</table></div></div>'
        );
      });
      Ordertr = (Ordertr + ordertr).replaceAll(',', '');
      // setOrdertr(orderTr.replaceAll(',', ''));
    }
  };

  const getPaymenttr = () => {
    if (Payments != undefined) {
      const tr = Payments.map((item, index) => {
        return (
          '<div class="payment-table"><h1 class="haste">Haste:</h1><p>' +
          item.Haste +
          '</p><div class="field-container"><div class="flex"><p class="field">Date:</p><p>' +
          item.PaymentDate +
          '</p></div><div class="flex"><p class="field">Ammount:</p><p>' +
          item.Ammount +
          '</p></div></div></div>'
        );
      });
      Paymenttr = (Paymenttr + tr).replaceAll(',', '');
    }
  };

  const handleModal = () => {
    setIsVisible(!IsVisible);
  };

  const getdata = () => {
    const items = [];
    Orders.forEach(order => {
      order.Items.forEach(iteminfo => {
        items.push({
          ...iteminfo,
          OrderId: order.OrderId,
        });
      });
    });
    setItems(items);
  };

  const handleStartDatePress = () => {
    setStartOpen(true);
  };
  const handleEndDatePress = () => {
    setEndOpen(true);
  };
  const handleDownloadPress = () => {
    if (Orders.length > 0 || Payments.length > 0) {
      getOrdertr();
      getPaymenttr();
      createPDF();
    } else
      Alert.alert(Constraints.ALERT, Constraints.ALERT_NO_ORDERS_OR_PAYMENTS, [
        {
          text: Constraints.OK,
        },
      ]);
  };
  const handleFilterPress = () => {
    getOrders();
    getPayments();
  };

  const handleEyePress = OrderId => {
    const orderitem = Items.filter(data => data.OrderId === OrderId);
    setOrderItems(orderitem);

    setIsVisible(!IsVisible);
  };

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async () => {
    var d = Date();
    const filename =
      `${Orders[0].CustomerName}_${moment(StartDate).format(
        'YYYYMMDDHHMMSS',
      )}_${moment(EndDate).format('YYYYMMDDHHMMSS')}_` +
      d.replaceAll(' ', '').replaceAll('+', '').replaceAll(':', '');
    console.log('filename', filename);
    if (await isPermitted()) {
      let options = {
        //Content to print
        html: `
        <html>
            <style>
            td,
            th {
                text-align: left;
                padding: 8px;
            }
        
            table {
                width: 100%;
            }
        
            .haste {
                font-size: 18px;
                font-weight: bold;
                background: #d6e9fc;
                padding: 8px;
            }
        
            .field {
                font-size: 14px;
                background: #d6e9fc;
                margin-right: 10px;
                padding: 8px;
            }
        
            .flex {
                flex: 1;
            }
        
            .itemtable {
                margin-left: 10px;
            }
        
            .tdr {
                background-color: #f7fbff;
            }
        
            .th {
                background-color: #4b74fda9;
            }
        
            .order-table {
                display: flex;
                flex-direction: row;
                border-bottom: 1px solid #939191dd;
                page-break-after: auto;
                margin-bottom: 1rem;
            }
        
            .payment-table {
                border-bottom: 1px solid #939191dd;
            }
        
            .items {
                font-size: 18px;
                font-weight: bold;
                background: #d6e9fc;
                padding: 8px;
            }
        
            .field-container {
                display: flex;
                flex-direction: row;
            }
        </style>
        <div>
            <div>
                <h1 style="font-size: 18px;font-weight: bold;background: #5ee9f1;padding: 8px;">
                    Order Table</h1>
                
                  ${Ordertr}
                
            </div>
            <div>
                <div>
                    <h1 style="font-size: 18px;font-weight: bold;background: #5ee9f1;padding: 8px;">
                        Payments Table</h1>
                
                    ${Paymenttr}
                
                </div>
            </div>
        </div>
       </html> 
       `,
        //File Name
        fileName: filename,
        //File directory
        directory: 'docs',
        base64: true,
      };
      let file = await RNHTMLtoPDF.convert(options);

      let filePath = RNFetchBlob.fs.dirs.DownloadDir + '/' + filename + `.pdf`;
      console.log(RNFetchBlob.fs.dirs.DownloadDir);
      console.log('RNFetchBlob.fs.dirs.DownloadDir', filePath);
      RNFetchBlob.fs
        .writeFile(filePath, file.base64, 'base64')
        .then(response => {
          console.log('success', response);
        })
        .catch(error => {
          console.log(('error', error));
        });

      console.log('filepath', file.filePath);
      // alert(`PDF Created At:   ${filePath}`);
      if (filePath) {
        setIsModalVisible(!isModalVisible);
        setMessage(`PDF Created At: ${filePath}`);
      }
      setFilePath(filePath);
    }
  };

  const onShare = async () => {
    await Share.open({
      url: `file://${filePath}`,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const onView = () => {
    setIsModalVisiblepdf(!isModalVisiblepdf);
  };
  const handleModalView = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <>
      <View style={styles.container}>
        <FAB
          icon="download"
          customSize={70}
          style={{position: 'absolute', zIndex: 1, bottom: 20, right: 20}}
          onPress={handleDownloadPress}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button
            testID="Startdate_testId"
            buttonColor={colors.light}
            style={{width: width / 2.5, marginBottom: 10, marginRight: 10}}
            mode="contained-tonal"
            icon="calendar"
            onPress={handleStartDatePress}>
            {StartDate.toLocaleDateString()}
          </Button>
          <Text>Start Date</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button
              testID="Enddate_testId"
              buttonColor={colors.light}
              style={{width: width / 2.5, marginRight: 10}}
              mode="contained-tonal"
              icon="calendar"
              onPress={handleEndDatePress}>
              {EndDate.toLocaleDateString()}
            </Button>
            <Text>End Date</Text>
          </View>

          <Button
            testID="Filter_Button_TestId"
            icon="filter"
            buttonColor={colors.lightskyblue}
            mode="contained-tonal"
            onPress={handleFilterPress}>
            {Constraints.FILTER}
          </Button>
        </View>
        <DatePicker
          date={StartDate}
          modal
          mode="date"
          open={Startopen}
          onConfirm={date => {
            setStartOpen(false);
            setStartDate(date);
          }}
          onCancel={() => {
            setStartOpen(false);
          }}
        />
        <DatePicker
          date={EndDate}
          modal
          mode="date"
          open={Endopen}
          onConfirm={date => {
            setEndOpen(false);
            setEndDate(date);
          }}
          onCancel={() => {
            setEndOpen(false);
          }}
        />
        {Loading && <ActivityIndicator style={{zIndex: 1}} size="large" />}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[0, 1]}
          keyExtractor={(date, index) => index.toString()}
          renderItem={info => {
            if (info.index === 1) {
              return (
                <>
                  <View style={styles.Heading}>
                    <AppText>{Constraints.PAYMENTS_TABLE}</AppText>
                  </View>

                  {Payments.length > 0 ? (
                    <FlatList
                      data={Payments}
                      keyExtractor={(data, index) => index + data.PaymentId}
                      renderItem={info => {
                        return (
                          <PaymentCard
                            testId={'PaymentCard_TestId' + info.index}
                            Ammount={info.item.Ammount}
                            Haste={info.item.Haste}
                            Date={info.item.PaymentDate}
                          />
                        );
                      }}
                    />
                  ) : (
                    <>
                      {Payments.length == 0 && (
                        <AppText style={styles.noData}>
                          {Constraints.ALERT_NO_PAYMENTS}
                        </AppText>
                      )}
                    </>
                  )}
                </>
              );
            } else {
              return (
                <>
                  <View style={styles.Heading}>
                    <AppText>{Constraints.ORDERS_TABLE}</AppText>
                  </View>
                  {Orders.length > 0 ? (
                    <FlatList
                      data={Orders}
                      keyExtractor={(order, index) => index + order.OrderId}
                      renderItem={info => {
                        // console.log('info index ',info.index)
                        return (
                          <OrderCard
                            testId={'OrderCard_TestId' + info.index}
                            Haste={info.item.Haste}
                            Total={info.item.Ammount}
                            OrderDate={info.item.OrderDate}
                            onPress={() => {
                              handleEyePress(info.item.OrderId);
                            }}
                          />
                        );
                      }}
                    />
                  ) : (
                    <>
                      {Orders.length == 0 && (
                        <AppText style={styles.noData}>
                          {Constraints.ALERT_NO_ORDERS}
                        </AppText>
                      )}
                    </>
                  )}
                </>
              );
            }
          }}
        />
      </View>
      <Modal visible={IsVisible} transparent>
        <Pressable
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
          onPress={handleModal}></Pressable>
        <View style={styles.modalview}>
          <IconButton
            style={styles.modalCloseicon}
            icon="close"
            size={30}
            iconColor={colors.dark}
            onPress={handleModal}
          />
          <View style={styles.modalTableContainer}>
            {OrderItems.length > 0 ? (
              <>
                <View style={styles.tableHeader}>
                  <AppText style={styles.apptext}>{Constraints.ITEMS}</AppText>
                  <AppText style={styles.apptext}>{Constraints.PRICE}</AppText>
                  <AppText style={styles.apptext}>
                    {Constraints.QUANTITY}
                  </AppText>
                  <AppText style={styles.apptext}>{Constraints.TOTAL}</AppText>
                </View>

                <FlatList
                  style={{height: '80%'}}
                  data={OrderItems}
                  keyExtractor={(data, index) => index.toString()}
                  renderItem={info => {
                    return (
                      <View style={styles.tableFlatlistView}>
                        <AppText style={styles.apptext}>
                          {info.item.value}
                        </AppText>
                        <AppText style={styles.apptext}>
                          {info.item.price}
                        </AppText>
                        <AppText style={styles.apptext}>
                          {info.item.quantity}
                        </AppText>
                        <AppText style={styles.apptext}>
                          {info.item.quantity * info.item.price}
                        </AppText>
                      </View>
                    );
                  }}
                />
              </>
            ) : (
              <AppText>hi</AppText>
            )}
          </View>
        </View>
      </Modal>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <Pressable
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
          onPress={handleModalView}></Pressable>
        <View
          style={{
            paddingHorizontal: 15,
            backgroundColor: colors.light,
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            borderWidthL: 1,
            marginTop: 'auto',
            elevation: 7,
          }}>
          <IconButton
            style={{flexShrink: 1, marginLeft: 'auto', marginTop: 10}}
            icon="close"
            size={30}
            iconColor={colors.black}
            onPress={handleModalView}
          />
          <AppText style={{marginBottom: 20, flexShrink: 1}}>{Message}</AppText>
          <View style={{flexDirection: 'row', flexShrink: 1, marginBottom: 10}}>
            <Button
              style={{flex: 1}}
              onPress={onShare}
              mode="contained"
              buttonColor={colors.primary}>
              {Constraints.SHARE}
            </Button>
            <Button
              style={{flex: 1, marginLeft: 10}}
              onPress={onView}
              mode="contained"
              buttonColor={colors.primary}>
              {Constraints.VIEW}
            </Button>
          </View>
        </View>
      </Modal>
      <Modal visible={isModalVisiblepdf} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Pdf
            // enablePaging
            source={{uri: `file:${filePath}`, cache: true}}
            style={{
              flex: 1,
              backgroundColor: colors.light,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
          />
          <Button
            style={{
              flexShrink: 1,
              marginHorizontal: 10,
              marginBottom: 10,
              width: '90%',
            }}
            onPress={onView}
            mode="contained"
            buttonColor={colors.primary}>
            {Constraints.GO_BACK}
          </Button>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  apptext: {
    flexGrow: 1,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  Heading: {
    backgroundColor: colors.cyan,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  modalview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.light,
    flex: 1,
    borderRadius: 30,
    position: 'absolute',
    top: '25%',
    left: 1,
    right: 1,
    bottom: '25%',
    padding: 20,
    margin: 10,
    elevation: 10,
    paddingTop: 60,
  },
  modalCloseicon: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 5,
  },
  modalTableContainer: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: colors.light,
  },
  noData: {
    marginVertical: 20,
    color: colors.red,
  },
  tableContainer: {
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: colors.light,
  },
  tableHeader: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightblue,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    paddingVertical: 10,
  },
  tableFlatlistView: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 6,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  tableButton: {
    width: '100%',
    height: '100%',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  text: {
    flex: 1,
    marginHorizontal: 20,
    fontSize: 12,
    color: colors.dark,
    fontWeight: '400',
  },
});
export default ViewOrders;
