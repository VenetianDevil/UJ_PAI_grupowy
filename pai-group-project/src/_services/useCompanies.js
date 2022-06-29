import useServerService from './useServerService';

function useCompanies() {
  const [request] = useServerService();
  
  function getBestCompanies() {
    return request('GET', `/best-companies`);
  }

  function getAllCompanies() {
    return request('GET', `/companies`);
  }

  function getCompany(companyID) {
    return request('GET', `/companies/${companyID}`); // to samo co getUser() ?
  }
  
  function getCompanyOffers(companyID){
    return request('GET', `/companies/${companyID}/offers`);
  }
  
  function getCompanyRecruitments(companyID){
    return request('GET', `/companies/${companyID}/recruitments`); //szukanie po companyID
  }

  return { getBestCompanies, getAllCompanies, getCompany, getCompanyOffers, getCompanyRecruitments };
}

export default useCompanies;
