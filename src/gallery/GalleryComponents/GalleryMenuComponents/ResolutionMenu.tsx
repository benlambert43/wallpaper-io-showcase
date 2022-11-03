import * as React from 'react';
import {
  Dimensions,
  PixelRatio,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Chip,
  Menu,
  Divider,
  Text,
  Button,
  Portal,
  Dialog,
  Paragraph,
  TextInput,
} from 'react-native-paper';
import { GalleryDataType } from '../../GalleryHome';

type ResolutionMenuPropType = {
  galleryData: GalleryDataType;
  changeGalleryData: (newGalleryData: GalleryDataType) => void;
};

export const ResolutionMenu = (props: ResolutionMenuPropType) => {
  const { galleryData, changeGalleryData } = props;
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [menuHeight, setMenuHeight] = React.useState(0);
  const [customWidth, setCustomWidth] = React.useState<string>();
  const [customHeight, setCustomHeight] = React.useState<string>();
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [keyboardStatus, setKeyboardStatus] = React.useState<boolean>();

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const native = {
    resWidth: PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width),
    resHeight: PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height),
  };

  const parallax = {
    resWidth: PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width) + 400,
    resHeight: PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height) + 200,
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleChangeResolution = ({
    resHeight,
    resWidth,
  }: {
    resHeight: number;
    resWidth: number;
  }) => {
    changeGalleryData({ ...galleryData, resHeight, resWidth });
    closeMenu();
  };

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => {
    if (customHeight && customWidth) {
      handleChangeResolution({
        resHeight: parseInt(customHeight),
        resWidth: parseInt(customWidth),
      });
    }

    setDialogVisible(false);
  };

  const handleChangeResolutionCustom = () => {
    closeMenu();
    showDialog();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setMenuHeight(height + 2);
      }}
    >
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Chip onPress={() => openMenu()}>
            {`Resolution: ${galleryData.resHeight} x ${galleryData.resWidth}`}
          </Chip>
        }
        style={{ paddingTop: menuHeight }}
      >
        <Menu.Item
          onPress={() => handleChangeResolution(native)}
          title={`Native (Best): ${native.resHeight} x ${native.resWidth}`}
        />
        <Menu.Item
          onPress={() => handleChangeResolution(parallax)}
          title={`Parallax: ${parallax.resHeight} x ${parallax.resWidth}`}
        />
        <Divider />
        <Menu.Item onPress={() => handleChangeResolutionCustom()} title="Custom" />
      </Menu>
      <View>
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={hideDialog}
            style={
              keyboardStatus
                ? {
                    position: 'absolute',
                    top: Dimensions.get('window').height / 20,
                    left: 0,
                    right: 0,
                  }
                : {
                    position: 'absolute',
                    top: Dimensions.get('window').height / 6,
                    left: 0,
                    right: 0,
                  }
            }
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ flex: 1 }}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  <View onStartShouldSetResponder={() => true} style={{ flex: 1 }}>
                    <Dialog.Title>Custom Resolution</Dialog.Title>
                    <Dialog.Content
                      style={{
                        paddingVertical: 5,
                      }}
                    >
                      <View style={{ paddingVertical: 5 }}>
                        <Paragraph>Height:</Paragraph>
                        <TextInput
                          mode="outlined"
                          keyboardType="number-pad"
                          label="Custom height (px)"
                          value={customHeight}
                          onChangeText={(text) => setCustomHeight(text)}
                        />
                      </View>
                      <View style={{ paddingVertical: 5 }}>
                        <Paragraph>Width:</Paragraph>
                        <TextInput
                          mode="outlined"
                          keyboardType="number-pad"
                          label="Custom width (px)"
                          value={customWidth}
                          onChangeText={(text) => setCustomWidth(text)}
                        />
                      </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                      <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
};

export default ResolutionMenu;
