import useServerService from './useServerService';

function useOffers() {
  const [request] = useServerService();
  const workModes = {
    1: "pełen",
    2: "1/2",
    3: "3/4",
    4: "staż"
  }
  const remoteStates = {
    1: "praca zdalna",
    2: "praca stacjonarna",
    3: "praca hubrydowa",

  }

  function getBestOffers() {
    return request('GET', `/offers/best-offers`);
  }

  function getAllOffer() {
    return request('GET', `/offers/bulk-offer`);
  }

  function getOffer(offerID) {
    return request('GET', `/offers/bulk-offer/${offerID}`);
  }

  function applyForAJob(userID, offerID) {
    return request('POST', `/recruitmets/job-apply`, { userID, offerID });
  }
  
  function addOffer(offer) {
    return request('POST', `/offers/create-offer`, offer);

  }

  return { getBestOffers, getAllOffer, getOffer, applyForAJob, addOffer, workModes, remoteStates };
}

export default useOffers;
