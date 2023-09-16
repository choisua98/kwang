export const handleCloseModal = (setModalVisible, navigate) => {
  setModalVisible(false);
  navigate(-1);
};

export const handleCloseDeleteModal = (setDeleteModalVisible, navigate) => {
  setDeleteModalVisible(false);
  navigate(-1);
};
