const getStatusLinks = require('./get-status-links').getStatusLinks;
const getValidateLinks = require('./get-validate-links')
const validateAndStateLinks = async(route) => {
  try{
    const statusLinks = await getStatusLinks(route);
    const linkValidations = await getValidateLinks(route);
    const  brokenLinks = linkValidations.filter((element) => element.state !== 'OK 200');
    const validateAndState = `${statusLinks} | broken: ${brokenLinks.length}`;
    return validateAndState;
  }catch(err){
    throw err;
  }
};
// module.exports= validateAndStateLinks;
