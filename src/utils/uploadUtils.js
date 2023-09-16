import { updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
      const imageRef = ref(
        storage,
        `${storageLocation}/${BlockId}/${imageFile.name}`,
      );
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      imageUrls.push(imageUrl);
    }
  }

  // 이미지 URL들을 Firestore 문서에 업데이트
  await updateDoc(docRef, {
    images: imageUrls,
  });
};
