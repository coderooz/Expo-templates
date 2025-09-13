import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const saveAndShare = async (uri) => {
  try {
    await Sharing.shareAsync(uri);
  } catch (e) {
    console.error(e);
  }
};
