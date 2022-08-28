import useServerService from './useServerService';

function useOffers() {
  const [request] = useServerService();
  const workModes = [
    "pełen",
    "1/2",
    "3/4",
    "staż",
  ]
  const remoteStates = [
    "praca zdalna",
    "praca stacjonarna",
    "praca hybrydowa"
  ]
  const stages = [
    "złożona",
    "zaakceptwana",
    "rozpatrywana",
    "zakończona",
  ]
  const status = [
    "przetwarzana",
    "przyjęty",
    "odrzucony",
    "anulowane",
  ]

  function getBestOffers() {
    return request('GET', `/offers/best-offers`);
  }

  function getAllOffer() {
    return request('GET', `/offers/bulk-offer`);
  }

  function getOffer(offerID) {
    return request('GET', `/offers/bulk-offer/${offerID}`);
  }

  function applyForAJob(data) {
    return request('POST', `/recruitments/job-apply`, data);
  }

  function addOffer(offer) {
    return request('POST', `/offers/create-offer`, offer);

  }

  return { getBestOffers, getAllOffer, getOffer, applyForAJob, addOffer, workModes, remoteStates, stages, status };
}

export default useOffers;
