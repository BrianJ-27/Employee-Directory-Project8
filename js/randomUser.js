 class RandomUserAPI{
 
  // Fetch Random User JSON object from API
  async getRandomUser(url){
    const response = await fetch (url);
    const responseData = await response.json();
    return responseData;
  }
}