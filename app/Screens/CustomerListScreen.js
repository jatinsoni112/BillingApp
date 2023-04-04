import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Alert,
  PermissionsAndroid,
  Modal,
  View,
  Dimensions,
  Pressable,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Screen from '../Screen';
import Constraints from '../utils/Constraints';
import CustomerInfo from '../components/CustomerInfo';
import {UserContext} from '../context/UserProvider';

import {DateContext} from '../context/DateProvider';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Button, IconButton} from 'react-native-paper';
import colors from '../colors';
import AppText from '../components/AppText';

const CustomerList = ({navigation}) => {
  const {displayName} = useContext(UserContext);
  const {billdate, monthEnd, monthStart} = useContext(DateContext);

  const date = new Date().toLocaleDateString();

  const [users, setUsers] = useState([]);
  const [editmode, seteditmode] = useState(false);
  const [Orders, setOrders] = useState([]);
  const [PaymentData, setPaymentData] = useState([]);
  const [filePath, setFilePath] = useState('');
  const [Message, setMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisiblepdf, setIsModalVisiblepdf] = useState(false);

  var Billtr = '';
  var Paymenttr = '';
  var Grandtotal = 0;
  var Payment = 0;
  var Name;
  var MobileNo;

  const createbill_press = (name, mobileno, key) => {
    Name = name;
    MobileNo = mobileno;
    createbill(key);
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

  const generateTr = () => {
    if (Orders != undefined) {
      var gt = 0;
      Orders.map((item, index) => {
        gt = parseInt(item.Ammount) + parseInt(gt);
        // setGrandtotal(parseInt(gt));
        Grandtotal = parseInt(gt);
        if (item.Items == undefined) {
          return null;
        }

        const tr = item.Items.map(orderItem => {
          const Total =
            parseInt(orderItem.price) * parseInt(orderItem.quantity);

          return (
            '<tr class="item" >' +
            '<td>' +
            orderItem.value +
            '</td>' +
            '<td>' +
            orderItem.quantity +
            '</td>' +
            '<td>' +
            orderItem.price +
            '</td>' +
            '<td>' +
            item.Haste +
            '</td>' +
            '<td>' +
            item.OrderDate +
            '</td>' +
            '<td>' +
            Total +
            '</td>' +
            '</tr>'
          );
        });

        Billtr = (Billtr + tr).replaceAll(',', '');
      });
      // setBilltr(Billtr.replaceAll(',', ''));
    }

    if (PaymentData != undefined && PaymentData.length) {
      var gt = 0;
      const tr = PaymentData.map((item, index) => {
        return (
          '<tr class="item" >' +
          '<td>' +
          item.PaymentDate +
          '</td>' +
          '<td>' +
          item.Haste +
          '</td>' +
          '<td>' +
          item.Ammount +
          '</td>' +
          '</tr>'
        );
      });
      Paymenttr = (Paymenttr + tr).replaceAll(',', '');

      // setPaymenttr(Paymenttr.replaceAll(',', ''));
    }
  };

  const createPDF = async key => {
    //const billdate = moment(new Date()).format('YYYYMMDDHHMMSS');

    generateTr();

    var d = Date();
    const filename =
      `${Name}_` +
      d.replaceAll(' ', '').replaceAll('+', '').replaceAll(':', '');

    console.log('Grandtotal', Grandtotal);

    if (await isPermitted()) {
      let options = {
        //Content to print
        html: `
        <html>
       <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       
           <style>
               body {
                   font-size: 0.75rem;
                   font-family: 'Inter', sans-serif;
                   font-weight: 400;
                   color: #000000;
                   margin: 0 auto;
                   position: relative;
               }
       
               #pspdfkit-header {
                   font-size: 0.625rem;
                   text-transform: uppercase;
                   letter-spacing: 2px;
                   font-weight: 400;
                   color: #717885;
                   margin-top: 2.5rem;
                   margin-bottom: 2.5rem;
                   width: 100%;
               }
       
               .header-columns {
                   display: flex;
                   justify-content: space-between;
                   padding-left: 2.5rem;
                   padding-right: 2.5rem;
               }
       
               .logo {
                   height: 1.5rem;
                   width: 2rem;
                   margin-right: 1rem;
               }
       
               .logotype {
                   display: flex;
                   align-items: center;
                   font-weight: 700;
               }
       
               .page {
                   margin-left: 3rem;
                   margin-right: 3rem;
               }
       
               .intro-table {
                   display: flex;
                   justify-content: space-between;
                   margin-bottom: 2rem;
                   border-top: 1px solid #000000;
                   border-bottom: 1px solid #000000;
               }
       
               .intro-form {
                   display: flex;
                   flex-direction: column;
                   width: 33%;
               }
       
               .intro-table-title {
                   font-size: 0.625rem;
                   margin: 0;
               }
       
               .intro-form-item {
                   padding: 1rem 1rem 1rem 1rem;
               }
       
               .table-box table, .summary-box table {
                   width: 100%;
                   font-size: 0.625rem;
               }
       
               .table-box td:last-child, .summary-box td:last-child {
                   text-align: right;
               }
       
               .table-box table tr.heading td {
                   border-top: 1px solid #000000;
                   border-bottom: 1px solid #000000;
                   height: 1.5rem;
               }
       
               .table-box table tr.item td, .summary-box table tr.item td {
                   border-bottom: 1px solid #D7DCE4;
                   height: 1.5rem;
               }
       
               .summary-box table tr.no-border-item td {
                   border-bottom: none;
                   height: 1.5rem;
               }
       
               .summary-box table tr.total td {
                   border-top: 1px solid #000000;
                   border-bottom: 1px solid #000000;
                   height: 1.5rem;
               }
           </style>
       </head>
       
       <body>
           <div id="pspdfkit-header">
               <div class="header-columns">
                   <div class="logotype">
                       <img class="logo" src="../assets/logo.png">
                       <p>${Constraints.COMPANY}</p>
                   </div>
       
                   <div>
                       <p>[Company Info]</p>
                   </div>
               </div>
           </div>
       
           <div class="page" >
               <div class="intro-table">
                   <div class="intro-form intro-form-item">
                       <p class="intro-table-title">
                         ${Constraints.CUSTOMER}:
                       </p>
                       <p>
                         ${Name}
                       </p>
                   </div>
                   <div class="intro-form">
                       <div class="intro-form-item">
                           <p class="intro-table-title">
                             ${Constraints.DATE}:
                           </p>
                           <p>
                             ${date}
                           </p>
                       </div>
                   </div>
               </div>
           </div>
       
           <div class="page" >
           <h4>Bill Table</h4>
               <div class="table-box">
                   <table cellpadding="0" cellspacing="0">
                       <tbody>
                           <tr class="heading">
                               <td>${Constraints.ITEM_NAME}</td>
                               <td>${Constraints.QUANTITY}</td>
                               <td>${Constraints.PRICE}</td>
                               <td>${Constraints.HASTE}</td>
                               <td>${Constraints.DATE}</td>
                               <td>${Constraints.TOTAL}</td>
                           </tr>
                        
                           ${Billtr}
                        
                       </tbody>
                   </table>
               </div>
       
               <div class="summary-box">
                   <table cellpadding="0" cellspacing="0">
                       <tbody>
                           <tr class="total">
                               <td></td>
                               <td>${Constraints.TOTAL}:</td>
                               <td> ${Grandtotal}</td>
                           </tr>
                       </tbody>
                   </table>
               </div>
           </div>
           
           <div class="page" >
           <h4>Payment Table</h4>
               <div class="table-box">
                   <table cellpadding="0" cellspacing="0">
                       <tbody>
                           <tr class="heading">
                              <td>${Constraints.DATE}</td>
                              <td>${
                                Constraints.HASTE
                              }</td>                               
                              <td>${
                                Constraints.AMMOUNT
                              }</td>                               
                           </tr>
                        
                           ${Paymenttr}
                        
                       </tbody>
                   </table>
               </div>
               <div class="summary-box">
                   <table cellpadding="0" cellspacing="0">
                       <tbody>
                           <tr class="total">
                               <td></td>
                               <td>${Constraints.TOTAL}:</td>
                               <td> ${Payment}</td>
                           </tr>
                       </tbody>
                   </table>
               </div>
               
               <p>${Constraints.REMAINING_AMMOUNT_TO_PAY}: ${
          parseInt(Grandtotal) - parseInt(Payment)
        }</p>
           </div>

       </body>
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
      console.log('filepath', filePath);
      RNFetchBlob.fs
        .writeFile(filePath, file.base64, 'base64')
        .then(response => {
          console.log('success', response);
        })
        .catch(error => {
          console.log(('error move pdf ', error));
        });

      if (filePath) {
        setIsModalVisible(!isModalVisible);
        setMessage(`PDF Created At: ${filePath}`);
      }
      setFilePath(filePath);

      firestore()
        .collection('Users')
        .doc(displayName)
        .collection('Orders')
        .doc()
        .set({
          CustomerName: Name,
          CustomerId: key,
          MobileNo: MobileNo,
          Date: billdate,
          OrderDate: new Date().toLocaleDateString(),
          Ammount: parseInt(Grandtotal) - parseInt(Payment),
          Haste: 'Previes Month Due',
        });
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
        err && console.log('share error', err);
      });
  };

  const getdata = (key, previousBillDate) => {
    if (key != undefined && previousBillDate != undefined) {
      firestore()
        .collection('Users')
        .doc(displayName)
        .collection('Orders')
        .where('CustomerId', '==', key)
        .where('Date', '<=', monthEnd)
        .where('Date', '>=', monthStart)
        .get()
        .then(querySnapshot => {
          const orders = [];

          querySnapshot.forEach(documentSnapshot => {
            orders.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setOrders(orders);
        })
        .catch(er => {
          console.log('error get orders', er);
        });

      var paymentdone = 0;

      firestore()
        .collection('Users')
        .doc(displayName)
        .collection('Payment')
        .where('CustomerId', '==', key)
        .where('Date', '>=', previousBillDate)
        .get()
        .then(querySnapshot => {
          const data = [];
          querySnapshot.forEach(documentSnapshot => {
            paymentdone =
              parseInt(paymentdone) + parseInt(documentSnapshot.data().Ammount);

            data.push({
              ...documentSnapshot.data(),
            });
          });
          setPaymentData(data);
          Payment = paymentdone;
        })

        .catch(er => {
          console.log('error get payment ', er);
        });
    }
  };

  const createbill = key => {
    if (Orders[0] != undefined) {
      createPDF(key);
      firestore()
        .collection('Users')
        .doc(displayName)
        .collection('Customers')
        .doc(key)
        .update({
          PreviousBillDate: date,
          BillDate: billdate,
        })
        .then(() => {
          console.log('Info added!');
        })
        .catch(err => {
          console.log('error create bill', err);
        });
    } else {
      Alert.alert(Constraints.ALERT, Constraints.ALERT_WRONG_CUSTOMER, [
        {
          text: Constraints.OK,
        },
      ]);
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(displayName)
      .collection('Customers')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
      });

    return () => subscriber();
  }, []);

  const handleDelete = id => {
    firestore()
      .collection('Users')
      .doc(displayName)
      .collection('Customers')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!', id);
      });
  };
  const handleEdit = (id, name, mobile, billdue) => {
    navigation.navigate(Constraints.EDIT_CUSTOMER, {
      id,
      name,
      mobile,
      billdue,
      editmode,
    });
  };

  const paybill_press = (name, mobileno, billdue, key) => {
    navigation.navigate(Constraints.PAY_BILL, {name, mobileno, billdue, key});
  };
  const onView = () => {
    setIsModalVisiblepdf(!isModalVisiblepdf);
  };

  handlecreatebillmodal = () => {
    setIsModalVisible(!isModalVisible);
  };
  //new

  const handleViewOrders = key => {
    navigation.navigate(Constraints.VIEW_ORDERS, {key});
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={info => (
          <CustomerInfo
            testID={'CustomerCard_TestId' + info.index}
            name={info.item.Name}
            date={info.item.PreviousBillDate}
            phone={info.item.MobileNo}
            image={info.item.BillDue}
            onPress={() => getdata(info.item.key, info.item.BillDate)}
            onPress_Createbill={() =>
              createbill_press(
                info.item.Name,
                info.item.MobileNo,
                info.item.key,
              )
            }
            onPress_Paybill={() =>
              paybill_press(
                info.item.Name,
                info.item.MobileNo,
                info.item.BillDue,
                info.item.key,
              )
            }
            onPress_Delete={() => handleDelete(info.item.key)}
            onPress_Edit={() => {
              seteditmode(true);
              handleEdit(
                info.item.key,
                info.item.Name,
                info.item.MobileNo,
                info.item.BillDue,
              );
            }}
            onPress_ViewOrders={() => handleViewOrders(info.item.key)}
          />
        )}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={{flex: 1}}>
          <Pressable
            style={{flex: 1}}
            onPress={handlecreatebillmodal}></Pressable>
            
          <View style={styles.modal}>
            <IconButton
              style={{
                flexShrink: 1,
                marginLeft: 'auto',
                marginTop: 1,
                marginRight: 1,
              }}
              icon="close"
              size={30}
              color={colors.black}
              onPress={handlecreatebillmodal}
            />
            <AppText style={{marginBottom: 20}}>{Message}</AppText>
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <Button
                mode="elevated"
                buttonColor={colors.primary}
                textColor={colors.white}
                style={{flex: 1}}
                onPress={onShare}>
                {Constraints.SHARE}
              </Button>
              <Button
                style={{flex: 1, marginLeft: 10}}
                mode="elevated"
                buttonColor={colors.primary}
                textColor={colors.white}
                onPress={onView}>
                {Constraints.VIEW}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={isModalVisiblepdf} animationType="slide">
        <View style={{flex: 1}}>
          <View style={styles.pdfcontainer}>
            <Pdf
              source={{uri: `file:${filePath}`, cache: true}}
              style={styles.pdf}
            />
            <Button
              onPress={onView}
              mode="elevated"
              style={{width: '90%'}}
              buttonColor={colors.primary}
              textColor={colors.white}>
              {Constraints.GO_BACK}
            </Button>
          </View>
        </View>
      </Modal>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  modal: {
    paddingHorizontal: 15,
    backgroundColor: colors.light,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderWidthL: 1,
    marginTop: 'auto',
    elevation: 7,
  },
  pdfcontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    backgroundColor: colors.white,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default CustomerList;
