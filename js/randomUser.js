 class RandomUserAPI{
    constructor(){
      this.url = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
    }
  // Fetch Random User JSON object from API
  async getRandomUser(){
    const response = await fetch (this.url);
    const responseData = await response.json();
    return responseData;
  }
}

export const randomUser = new RandomUserAPI();