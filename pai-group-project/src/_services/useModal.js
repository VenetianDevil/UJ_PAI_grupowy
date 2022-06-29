import { useState } from 'react';

function useModal(type) {
  const [modal, setModal] = useState({ type: type, show: false, data: null });

  function openModal(data) {
    setModal({ ...modal, "show": true, "data": data })


  }

  function closeModal() {
    setModal({ ...modal, "show": false, "data": null })

  }

  return [modal, openModal, closeModal];
}

export default useModal;
