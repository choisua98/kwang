// 수정, 저장 모달 닫기 함수
export const handleCloseModal = (setModalVisible, navigate) => {
  setModalVisible(false);
  navigate(-1);
};

// 삭제 모달 닫기 함수
export const handleCloseDeleteModal = (setDeleteModalVisible, navigate) => {
  setDeleteModalVisible(false);
  navigate(-1);
};
