import { View, Text } from 'react-native';
import { Button } from './button';
import { CloudUploadIcon } from 'lucide-nativewind';
import { Control, useFieldArray } from 'react-hook-form';
import React from 'react';
import * as DocumentPicker from 'expo-document-picker';

interface UpLoadFileProps {
  testID?: string;
  control: Control<any>;
  name: string;
};

const UpLoadFile: React.FC<UpLoadFileProps> = ({
  testID = 'upload-file',
  control,
  name
}) => {
  const { fields, append, remove } = useFieldArray({ control, name });

  const handleUpload = React.useCallback(() => {
    DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
      multiple: true
    }).then((result) => {
      console.log('Picked documents:', result);
    }).catch(error => {
      console.error('Error picking document:', error);
    });
  }, []);

  return (
    <View>
      <Button className='!bg-lavender' onPress={handleUpload}>
        <CloudUploadIcon className='text-primary' size={22} />
        <Text className='text-primary'>
          {'Tải tệp đính kèm'}
        </Text>
      </Button>
    </View>
  );
};

export default UpLoadFile;