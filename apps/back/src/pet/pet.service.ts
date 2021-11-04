import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PetService {
  api_url = 'https://meetapet-api.herokuapp.com/api/';
  getAll(): any {
    return axios.get(this.api_url + 'pets').then((pet) => pet.data);
  }
  getPetType(): any {
    return axios.get(this.api_url + 'pet-types').then((pet) => pet.data);
  }
  newPet(pet) {
    console.log('SERVICE', pet);
    return axios
      .post(this.api_url + 'pets', {
        firstName: pet.firstName,
        lastName: pet.lastName,
        birthDate: '1940-01-01T00:00:00.000Z',
        type: pet.type,
        avatarPictureUrl:
          'https://m.media-amazon.com/images/S/abs-image-upload-na/b/AmazonStores/ATVPDKIKX0DER/eca2784c2a5265feaae78e48f3a4e4a8.w800.h800.jpg',
        coverPictureUrl:
          'https://m.media-amazon.com/images/S/abs-image-upload-na/b/AmazonStores/ATVPDKIKX0DER/eca2784c2a5265feaae78e48f3a4e4a8.w800.h800.jpg',
        summary: pet.summary,
      })
      .then((item) => console.log('GG INSERT'))
      .catch((err) => console.log('FDP DERREUR'));
  }
  editPet(pet) {
    console.log('SERVICE', pet);
    return axios
      .put(this.api_url + 'pets/' + pet.id, {
        id: pet.id,
        firstName: pet.firstName,
      })
      .then((res) => console.log('GG', res))
      .catch((err) => console.log('ERR', err));
  }
}
