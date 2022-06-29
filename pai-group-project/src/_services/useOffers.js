import useServerService from './useServerService';

function useOffers() {
  const [request] = useServerService();

  function getBestOffers() {
    return request('GET', `/best-offers`);
  }

  function getAllOffer() {
    return request('GET', `/bulk-offer`);
  }

  function getOffer(offerID) {
    return request('GET', `/bulk-offer/${offerID}`);
  }

  function applyForAJob(userID, offerID) {
    return request('POST', `/job-apply`, { userID, offerID });
  }
  
  function addOffer(offer) {
    return request('POST', `/create-offer`, offer);

  }

  return { getBestOffers, getAllOffer, getOffer, applyForAJob, addOffer };
}

export default useOffers;
