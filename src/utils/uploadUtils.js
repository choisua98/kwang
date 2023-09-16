import { updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { message } from 'antd';

export const uploadImagesAndUpdateFirestore = async (
  uploadedImages,
  BlockId,
  docRef,
  storage,
  storageLocation,
) => {
  const imageUrls = [];

  // 이미지 업로드 및 URL 저장
  for (const imageFile of uploadedImages) {
    if (typeof imageFile === 'string') {
      imageUrls.push(imageFile);
    } else {
      // 이미지 압축
      const compressedFile = await compressedImage(imageFile);

      if (compressedFile) {
        const imageRef = ref(
          storage,
          `${storageLocation}/${BlockId}/${imageFile.name}`,
        );
        await uploadBytes(imageRef, compressedFile);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }
    }
  }

  // 이미지 URL들을 Firestore 문서에 업데이트
  await updateDoc(docRef, {
    images: imageUrls,
  });
};

// 이미지 압축 설정 옵션
const options = {
  maxSizeMB: 2,
  maxWidthOrHeight: 1000,
  useWebWorker: true,
};

// 이미지 압축 함수
const compressedImage = async (imageFile) => {
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    message.error('이미지 압축 실패', error);
    return null;
  }
};
