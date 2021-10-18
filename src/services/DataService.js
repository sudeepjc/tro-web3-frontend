const data = {
    modalData: false
};

export const dataService = {
    setModalData(boll) {
        data.modalData = boll;
    },


    getModalData() {
        return data.modalData;
    },
};
