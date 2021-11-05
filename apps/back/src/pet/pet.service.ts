import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';

@Injectable()
export class PetService {
  api_url = 'https://meetapet-api.herokuapp.com/api/';
  async getAll(): Promise<Axios> {
    return await axios
      .get(this.api_url + 'pets', {
        params: {
          size: 100,
        },
      })
      .then((pet) => pet.data)
      .catch((err) => console.log(err));
  }
  async getPetType(): Promise<any> {
    return await axios.get(this.api_url + 'pet-types').then((pet) => pet.data);
  }
  async newPet(data) {
    const pet = data.pet;
    return await axios
      .post(`${this.api_url}pets`, {
        firstName: pet.firstName,
        lastName: pet.lastName,
        birthDate: pet.birthDate,
        type: pet.type,
        avatarPictureUrl: pet.avatarPictureUrl,
        coverPictureUrl: pet.avatarPictureUrl,
        summary: pet.summary,
      })
      .then((item) => console.log('Pet inserted'))
      .catch((err) => console.log('FDP DERREUR'));
  }
  async editPet(pet) {
    return await axios
      .put(`${this.api_url}pets/${pet.id}`, pet)
      .then((res) => console.log('Pet edited'))
      .catch((err) => console.log('ERR', err));
  }
  async deletePet(id) {
    return await axios
      .delete(`${this.api_url}pets/${id}`)
      .then((res) => console.log('Pet deleted'))
      .catch((err) => console.log('ERR', err));
  }
  async getPetById(id) {
    return await axios.get(`${this.api_url}pets/${id}`).then((pet) => pet.data);
  }
  async deleteAllPets() {
    return await axios
      .get(`${this.api_url}pets`, {
        params: {
          size: 100,
        },
      })
      .then((pet) => {
        pet.data.forEach((el) => {
          this.deletePet(el.id);
        });
      })
      .catch((err) => console.log(err));
  }
}
